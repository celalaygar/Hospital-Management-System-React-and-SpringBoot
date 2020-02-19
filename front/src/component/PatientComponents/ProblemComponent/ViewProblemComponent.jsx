import React, { Component } from 'react'
import ProblemService from '../../../services/ProblemService'
//import Moment from 'react-moment';
import PatientDetail from '../../BasicComponent/PatientDetail';
import ProblemDetail from '../../BasicComponent/ProblemDetail';



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
            creationDate:null,
            errorMessage: ""
        }
        this.loadProblemDetail = this.loadProblemDetail.bind(this);
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
                console.log(error.response.data.message);
                this.setState({ errorMessage: error.response.data.message, problemid: null });

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
            <div className="container">
                {/* Show and close modal */}
                {this.state.errorMessage !== '' ?
                    <div className="row">
                        <div className="col-sm-12">
                            <h3>Problem Details</h3>
                            <hr/>
                        </div>
                        <div className="col-lg-12">
                            <div className="alert alert-danger" role="alert">
                                {this.state.errorMessage}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="row">
                        <div className="col-sm-12">
                            <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => this.viewPatient(this.state.patient.patientid)}>Back</button>
                            <hr/>
                            <h5>Problem Detail for {this.state.patient.name} {this.state.patient.lastname}</h5>
                            <hr/>
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
                        <div className="col-lg-6">
                        </div>
                    </div>
                    }
            </div>
        )
    }
}
