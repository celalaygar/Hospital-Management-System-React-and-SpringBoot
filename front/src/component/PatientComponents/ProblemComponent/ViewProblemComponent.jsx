import React, { Component } from 'react'
import ProblemService from '../../../services/ProblemService'
//import Moment from 'react-moment';
import PatientDetail from '../../BasicComponent/PatientDetail';
import ProblemDetail from '../../BasicComponent/ProblemDetail';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
import AlerService from '../../../services/AlerService';



export default class ViewProblemComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            problemid: props.match.params.problemid,
            patient: {},
            problemDetail: null,
            problemName: null,
            problemStatus: null,
            pid: null,
            creationDate: null,
            errorMessage: ""
        }
        
    }

    componentDidMount() {
        this.loadProblemDetail();
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
                AlerService.alert(error.response.data.message);
                this.props.history.push('/patients');
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
        });
    }
    viewPatient(id) {
        window.localStorage.setItem("patientId", id);
        this.props.history.push('/view-patient/' + id);
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
                                    className="btn btn-danger "
                                    onClick={() => this.viewPatient(this.state.patient.patientid)}>Back</button>
                                <hr />
                            </div>
                            <div className="col-lg-6">
                                <PatientDetail
                                    name={this.state.patient.name}
                                    lastname={this.state.patient.lastname}
                                    email={this.state.patient.email}
                                    city={this.state.patient.city}
                                    age={this.state.patient.age}
                                    gender={this.state.patient.gender}
                                    patientid={this.state.patient.patientid}
                                />
                            </div>
                            <div className="col-lg-6">
                                <ProblemDetail
                                    problemName={this.state.problemName}
                                    problemDetail={this.state.problemDetail}
                                    problemStatus={this.state.problemStatus}
                                    creationDate={this.state.creationDate}
                                />
                            </div>
                            <div className="col-lg-12">
                                <hr/>
                                <hr/>
                                <hr/>
                                <hr/>
                                <hr/>   
                                <hr/>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
