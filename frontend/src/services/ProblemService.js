import ApiService from "./ApiService";


const PROBLEM_API_BASE_URL = '/problem';
const PROBLEM_STATUS = '/status';
const FIND_ALL = '/find-all-by-patientid/';
const PROBLEM_WİTH_PROBLEMID = '/find-by-problemid/';

class ProblemService {

    getProblem(problemid) {
        return ApiService.getAll(PROBLEM_API_BASE_URL + PROBLEM_WİTH_PROBLEMID + problemid);
    }

    getAllByPatientId(patientId) {
        return ApiService.getOneById(PROBLEM_API_BASE_URL + FIND_ALL + patientId);
    }

    // fetchPatientByEmail(email) {
    //     return axios.get(PATIENT_API_BASE_URL + '/find-by-email/' + email);
    // }

    delete(Id) {
        return ApiService.deleteById(PROBLEM_API_BASE_URL + '/' + Id);
    }

    add(problem) {
        return ApiService.post(PROBLEM_API_BASE_URL, problem);
    }

    // editPatient(patient) {
    //     return ApiService.put(PROBLEM_API_BASE_URL + '/' + patient.patientid, patient);
    // }
    getProblemStatus() {
        return ApiService.getAllDatas(PROBLEM_API_BASE_URL + PROBLEM_STATUS );
    }
}

export default new ProblemService();