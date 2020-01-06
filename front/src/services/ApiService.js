import axios from 'axios';

const USER_API_BASE_URL = 'http://localhost:8182/patient';

class ApiService {

    fetchPatients() {
        return axios.get(USER_API_BASE_URL);
    }

    fetchPatientById(patientId) {
        return axios.get(USER_API_BASE_URL + '/find-by-id/' + patientId);
    }

    fetchPatientByEmail(email) {
        return axios.get(USER_API_BASE_URL + '/find-by-email/' + email);
    }

    deletePatient(Id) {
        return axios.delete(USER_API_BASE_URL + '/' + Id);
    }

    addPatient(patient) {
        return axios.post(""+USER_API_BASE_URL, patient);
    }

    editPatient(data) {
        console.log(data)
        return axios.put(USER_API_BASE_URL + '/' + data.id, data);
    }

}

export default new ApiService();