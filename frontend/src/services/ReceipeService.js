import ApiService from "./ApiService";


const RECEIPE_BASE_URL = '/receipe';
const FIND_BY_R_ID = '/find-by-id/';
const FIND_ALL = /find-all-by-problemid/;

class ReceipeService {

    getAllReceipes() {
        return ApiService.getAllDatas(RECEIPE_BASE_URL);
    }

    getAllByProblemId(problemId) {
        return ApiService.getAll(RECEIPE_BASE_URL + FIND_ALL + problemId);
    }

    getReceipeByReceipeId(receipeId) {
        return ApiService.getOneById(RECEIPE_BASE_URL + FIND_BY_R_ID + receipeId);
    }

    // fetchPatientByEmail(email) {
    //     return axios.get(PATIENT_API_BASE_URL + '/find-by-email/' + email);
    // }

    // deleteReceipe(receipeId) {
    //     return ApiService.deleteById(RECEIPE_API_BASE_URL + '/' + Id);
    // }

    save(receipe) {
        return ApiService.post(RECEIPE_BASE_URL, receipe);
    }

    // editReceipe(patient) {
    //     return ApiService.put(RECEIPE_API_BASE_URL + '/' + patient.patientid, patient);
    // }
}

export default new ReceipeService();