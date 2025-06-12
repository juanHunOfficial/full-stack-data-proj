import './App.css'
import { HomePage } from './pages/HomePage'
import Navbar from './components/Navbar'

function App() {


  return (
    <div className="App" style={{ padding: '20px', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        brandName="Professional Service"
        navItems={[
          { name: 'Home', href: '#home' },
          { name: 'James', href: '#james' },
          { name: 'Juan', href: '#juan' },
          { name: 'Kenny', href: '#kenny' },
          { name: 'Contact', href: '#contact' }
        ]} />
      <HomePage />
    </div>
  )
}

export default App
