import React, { Component } from 'react'
import ProblemService from '../../../services/ProblemService'
//import Moment from 'react-moment';
import PatientDetail from '../../BasicComponent/PatientDetail';
import ProblemDetail from '../../BasicComponent/ProblemDetail';
import "@material/react-checkbox/dist/checkbox.css";
import AlertifyService from '../../../services/AlertifyService';
import ReceipesComponent from "../ReceipeComponent/ReceipesComponent";




export default class ViewProblemComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            problemid: props.match.params.problemid,
            patient: {},
            receipes: [],
            problemDetail: null,
            problemName: null,
            problemStatus: null,
            pid: null,
            creationDate: null,
            errorMessage: ""
        }
        // this.loadProblemDetail();
        // this.loadProblemDetail = this.loadProblemDetail.bind(this);
    }
    componentDidMount() {
        this.loadProblemDetail();
        // this.getAllReceipes();
    }

    loadProblemDetail() {
        ProblemService.getProblem(this.state.problemid).then(res => {
            let p = res.data;
            this.setState({
                problemDetail: p.problemDetail,
                problemName: p.problemName,
                pid: p.pid,
                problemStatus: p.problemStatus,
                patient: p.patient,
                creationDate: p.creationDate
            });
        }).catch((error) => {
            // Error
            if (error.response) {
                this.setState({ errorMessage: error.response.data.message, problemid: null });
                AlertifyService.alert(error.response.data.message);
                
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
        });
    }
    viewPatient(patientid) {
        window.localStorage.setItem("patientId", patientid);
        this.props.history.push('/view-patient/' + patientid);
    }
    // getAllReceipes() {
    //     ReceipeService.getAllByProblemId(this.state.problemid).then((res) => {
    //         this.setState({ receipes: res.data })
    //         console.log(this.state.receipes)
    //     }).catch((error) => {
    //         if (error.response) {
    //             AlertifyService.alert(error.response.data.message);
    //         }
    //         else if (error.request) console.log(error.request);
    //         else console.log(error.message);
    //     });
    // }
    openReceipeForm(patientid, problemid) {
        window.localStorage.setItem("patientId", patientid);
        window.localStorage.setItem("problemId", problemid);
        this.props.history.push('/receipe-form');
    }
    render() {

        return (
            <div className="row">
                <div className="col-sm-12">
                    <h1>Problem Details</h1>
                    <hr />
                </div>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12">
                            <button
                                className="btn btn-danger"
                                onClick={() => this.viewPatient(this.state.patient.patientid)}>
                                Back
                            </button>
                            <button
                                className="btn btn-warning ml-1"
                                onClick={() => this.openReceipeForm(this.state.patient.patientid, this.state.problemid)} >
                                Add Receipe
                            </button>
                            <hr />
                        </div>
                        <div className="col-lg-6">
                            <PatientDetail
                                name={this.state.patient.name}
                                lastname={this.state.patient.lastname}
                                email={this.state.patient.email}
                                city={this.state.patient.city}
                                bornDate={this.state.patient.bornDate}
                                gender={this.state.patient.gender}
                                patientid={this.state.patient.patientid}
                            />
                        </div>
                        <div className="col-lg-6">
                            <ProblemDetail

                                problemid={this.state.problemid}
                                problemName={this.state.problemName}
                                problemDetail={this.state.problemDetail}
                                problemStatus={this.state.problemStatus}
                                creationDate={this.state.creationDate}
                                patientid={this.state.patient.patientid}
                            />
                        </div>
                    </div>
                </div>
                <ReceipesComponent  problemid={this.state.problemid} />
            </div>
        )
    }
}
