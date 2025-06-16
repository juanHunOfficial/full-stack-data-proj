import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import mysql.connector as dbconnect
# from flask_cors import CORS
# from dotenv import load_dotenv

# Load environment variables from .env file
# load_dotenv()

app = Flask(__name__)

# --- Configuration ---
# Ensure you have mysql-connector-python installed: pip install mysql-connector-python
# Or if you meant PostgreSQL, change 'mysql+mysqlconnector' to 'postgresql+psycopg2'
# and ensure you have psycopg2-binary installed: pip install psycopg2-binary
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'mysql+mysqlconnector://root:password@localhost/students_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress SQLAlchemy warning

# Initialize extensions
db = SQLAlchemy(app)
ma = Marshmallow(app)
# CORS(app) # Enable CORS for all routes (for development)

# --- Database Model ---
class Engineer(db.Model):
    __tablename__ = 'engineers' # Explicit table name
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False) # Increased length, made non-nullable
    bio = db.Column(db.String(500)) # Increased length
    professional_background = db.Column(db.String(500)) # Increased length
    interest = db.Column(db.String(500)) # Increased length
    experience = db.Column(db.String(500)) # Increased length

    def __repr__(self):
        return f'<engineer {self.name}>'

# --- Marshmallow Schema for Serialization/Deserialization ---
class EngineerSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Engineer
        load_instance = True # Allows schema.load to return a model instance
        # Fields to expose in the API
        fields = ('id', 'name', 'bio', 'professional_background', 'interest', 'experience')

engineer_schema = EngineerSchema() # For single engineer
engineers_schema = EngineerSchema(many=True) # For a list of engineers

# --- API Endpoints ---

# @app.route('/')
# def hello_world():
#     return jsonify({"message": "Hello World!"})

@app.route('/engineers', methods=['POST'])
def add_engineer():
    """
    Creates a new engineer record.
    Expects JSON body: {"name": "...", "bio": "...", ...}
    """
    try:
        # Load and validate incoming data using the schema
        engineer_data = engineer_schema.load(request.json)
        db.session.add(engineer_data)
        db.session.commit()
        return engineer_schema.jsonify(engineer_data), 201
    except Exception as e:
        db.session.rollback() # Rollback in case of an error
        return jsonify({"message": "Error creating engineer", "error": str(e)}), 400

@app.route('/engineers', methods=['GET'])
def get_engineers():
    """
    Retrieves all engineer records.
    """
    all_engineers = Engineer.query.all()
    result = engineers_schema.dump(all_engineers)
    return jsonify(result)

@app.route('/engineers/<int:id>', methods=['GET'])
def get_engineer(id):
    """
    Retrieves a single engineer record by ID.
    """
    engineer = Engineer.query.get(id)
    if engineer:
        return engineer_schema.jsonify(engineer)
    return jsonify({"message": "engineer not found"}), 404

@app.route('/engineers/<int:id>', methods=['PUT'])
def update_engineer(id):
    """
    Updates an existing engineer record by ID.
    Expects JSON body with fields to update: {"name": "...", "bio": "...", ...}
    """
    engineer = Engineer.query.get(id)
    if not engineer:
        return jsonify({"message": "Engineer not found"}), 404

    try:
        # Load the updated data into the existing engineer instance, allowing partial updates
        updated_data = engineer_schema.load(request.json, instance=engineer, partial=True)
        db.session.commit()
        return engineer_schema.jsonify(updated_data)
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating engineer", "error": str(e)}), 400

@app.route('/engineers/<int:id>', methods=['DELETE'])
def delete_engineer(id):
    """
    Deletes a engineer record by ID.
    """
    engineer = Engineer.query.get(id)
    if not engineer:
        return jsonify({"message": "Engineer not found"}), 404

    try:
        db.session.delete(engineer)
        db.session.commit()
        return jsonify({"message": "Engineer deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error deleting engineer", "error": str(e)}), 500

# --- Database Initialization (for development) ---
@app.cli.command('create_db')
def create_db_command():
    """Creates the database tables."""
    with app.app_context():
        db.create_all()
    print("Database tables created!")

@app.cli.command('drop_db')
def drop_db_command():
    """Drops the database tables."""
    with app.app_context():
        db.drop_all()
    print("Database tables dropped!")

@app.cli.command('seed_db')
def seed_db_command():
    """Seeds the database with initial data."""
    with app.app_context():
        if Engineer.query.count() == 0: # Only seed if table is empty
            engineers_data = [
                Engineer(name="Alice Wonderland", bio="Loves exploring new domains.", professional_background="Junior Web Developer", interest="Front-end, UX/UI", experience="2 years"),
                Engineer(name="Bob The Builder", bio="A practical problem-solver with a knack for infrastructure.", professional_background="DevOps Engineer", interest="Cloud, CI/CD", experience="4 years"),
                Engineer(name="Charlie Chaplin", bio="A creative mind with a flair for storytelling.", professional_background="Content Creator", interest="Digital Marketing, Video Production", experience="3 years")
            ]
            db.session.bulk_save_objects(engineers_data)
            db.session.commit()
            print("Database seeded with initial engineers!")
        else:
            print("Database already contains engineers. Skipping seed.")


if __name__ == '__main__':
    # You would typically run Flask apps with 'flask run' in production
    # For development, app.run() works, but ensure you have the DATABASE_URL set
    with app.app_context():
        # This will create tables if they don't exist when you run app.py directly
        # In a real app, use Flask-Migrate or a separate script for migrations
        db.create_all()
        # You might also want to run db seeding here for quick testing
        # seed_db_command()
    app.run(debug=True, port=5000) # Ensure Flask runs on a different port than React
