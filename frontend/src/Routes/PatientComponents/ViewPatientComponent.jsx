import React, { Component } from 'react'
import PatientService from '../../services/PatientService'; 
import PatientDetail from '../BasicComponent/PatientDetail';
import AlertifyService from '../../services/AlertifyService';
import ProblemsComponent from './ProblemComponent/ProblemsComponent';
 
export default class ViewPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: props.match.params.patientid,
            patient: null,
            name: '',
            lastname: '',
            email: '',
            gender: '',
            bornDate: null,
            city: '',
            problems: [],  
            message: null 
        }
        this.loadPatient = this.loadPatient.bind(this); 
    }

    componentDidMount() {
        this.loadPatient(); 
    }
    
    loadPatient() {
        PatientService.getPatientById(this.state.patientid).then(res => {
            let p = res.data;
            this.setState({ patient: p });
            this.setState({
                patientid: p.patientid,
                problems: p.problems
            }); 
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
                this.props.history.push('/patients');
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    } 
    viewProblem(problemid) { 
        this.props.history.push('/problem/' + problemid);
    }
    viewProblemForm(patientid){ 
        window.localStorage.setItem("patientId", patientid);
        this.props.history.push('/add-problem'); 
    }  
    render() { 
        let patient = this.state.patient; 
        return (
            <div className="row">
                {/* Show and close modal */}
                <div className="col-lg-12">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => this.viewProblemForm(patient.patientid)}
                        data-whatever="@getbootstrap">Add Problem</button>
 
                    <hr />
                </div>
                {/* Patient Details */}
                <div className="col-lg-7">
                    {patient != null ?
                        <PatientDetail
                            patientid={patient.patientid}
                            name={patient.name}
                            lastname={patient.lastname}
                            email={patient.email}
                            city={patient.city}
                            bornDate={patient.bornDate}
                            gender={patient.gender}
                            showButtons={true}
                            // array={['patientid','name','lastname','email','city','bornDate','gender']}
                        />
                        : null}
                </div> 
                <div className="col"></div>
                <div className="col-lg-4">
                    <img style={{ height: 300 }} src="https://cdn1.iconfinder.com/data/icons/education-vol-1-1/64/009-512.png" alt="" />
                </div> 
                <div className="col-lg-12">
                        <ProblemsComponent   patientid={this.state.patientid}/>
                </div> 
            </div>
        )
    }
}