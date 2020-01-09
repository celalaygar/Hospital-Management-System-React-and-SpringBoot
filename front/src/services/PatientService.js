import ApiService from "./ApiService";


const PATIENT_API_BASE_URL = '/patient';

class PatientService {

    getPatients() {
        return ApiService.getAllDatas(PATIENT_API_BASE_URL);
    }

    getPatientById(patientId) {
        return ApiService.getOneById(PATIENT_API_BASE_URL + '/find-by-id/' + patientId);
    }

    // fetchPatientByEmail(email) {
    //     return axios.get(PATIENT_API_BASE_URL + '/find-by-email/' + email);
    // }

    deletePatient(Id) {
        return ApiService.deleteById(PATIENT_API_BASE_URL + '/' + Id);
    }

    addPatient(patient) {
        return ApiService.post(PATIENT_API_BASE_URL, patient);
    }

    editPatient(patient) {
        return ApiService.put(PATIENT_API_BASE_URL + '/' + patient.patientid, patient);
    }

}

export default new PatientService();