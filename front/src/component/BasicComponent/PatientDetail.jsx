import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/themes/default.css";
import "alertifyjs/build/css/alertify.css";
import PatientService from '../../services/PatientService';
import { withRouter } from 'react-router';

class PatientDetail extends Component {
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         patientid: props.patientid,
    //         name: props.name,
    //         lastname: props.lastname,
    //         email: props.email,
    //         gender: props.gender,
    //         age: props.age,
    //         city: props.city,
    //         message:''
    //     }
    //     this.editPatient = this.editPatient.bind(this);
    //     this.deletePatient = this.deletePatient.bind(this);
    // }
    componentDidMount() {
    }
    editPatient(id) {
        window.localStorage.setItem("patientId", id);
        this.props.history.push('/edit-patient');
    }
    deletePatient(patientid) {
        //this.props.history.push('/');
        alertify.confirm("Are you sure to delete the patient.",
            function () {
                PatientService.deletePatient(patientid)
                    .then(res => {
                        window.location.href = '/patients';
                        alertify.success("Deleting is ok ");
                    })
            },
            function () {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    render() {
        return (
            <div>
                <div className="card" >
                    <div className="card-header"> <h3> Patient Detail</h3>  </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"><b>Patient id : </b>{this.props.patientid}</li>
                        <li className="list-group-item"><b>Name : </b>{this.props.name}</li>
                        <li className="list-group-item"><b>Last Name : </b>{this.props.lastname}</li>
                        <li className="list-group-item"><b>Email :</b>{this.props.email}</li>
                        <li className="list-group-item"><b>City : </b>{this.props.city}</li>
                        <li className="list-group-item"><b>Age : </b>{this.props.age}</li>
                        <li className="list-group-item"><b>Gender : </b>{this.props.gender}</li>
                        <li className="list-group-item">
                            <button
                                className="btn btn-sm btn-success"
                                onClick={() => this.editPatient(this.props.patientid)} >
                                Edit
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => this.deletePatient(this.props.patientid)}>
                                Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(PatientDetail)
