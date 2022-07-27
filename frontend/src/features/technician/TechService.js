
import axios from "axios";

const API_URL = "/api/technicians/";

//Fetch Technicians

const fetchTechnicians = async () => {

    let response = await axios.get(API_URL);

    return response.data;
};

//Add Technician

const addTechnician = async (inputData) => {

    let response = await axios.post(API_URL, inputData);

    return response.data;
};

//Delete Technician

const deleteTechnician = async (id) => {

    let response = await axios.delete(API_URL + id);

    return response.data;
}

const TechService = {
    fetchTechnicians,
    addTechnician,
    deleteTechnician
};

export default TechService;