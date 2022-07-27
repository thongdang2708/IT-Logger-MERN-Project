
import axios from "axios";

const API_URL = "/api/logs/";

//Fetch Logs
const fetchLogs = async () => {

    let response = await axios.get(API_URL);

    return response.data;
};

//Delete Log

const deleteLog = async (id) => {
    
    let response = await axios.delete(API_URL + id);

    return response.data;
};

//Add Log

const addLog = async (inputData) => {

    let response = await axios.post(API_URL, inputData);

    return response.data;
}

const LogService = {
    fetchLogs,
    deleteLog,
    addLog
};

export default LogService