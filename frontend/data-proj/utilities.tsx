import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/'
})

export const getData = async (endpoint: string) => {
    try {
        const response = await api.get(endpoint)
        return response.data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}