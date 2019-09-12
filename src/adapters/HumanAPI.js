// const mongoUrl = "http://localhost:8000"
const mongoUrl = "https://anatomica3d-api.herokuapp.com/systems"
const fetchBioData = () => {
    return fetch("http://127.0.0.1:5000/browse", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}

const fetchLocalSystems = () => {
    return fetch(`${mongoUrl}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
}


export default {
    fetchBioData,
    fetchLocalSystems
}