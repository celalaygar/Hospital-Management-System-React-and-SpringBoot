import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import PatientService from '../../services/PatientService';
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class PatientDetailModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: props.patient.patientid,
            name: props.patient.name,
            lastname: props.patient.lastname,
            email: props.patient.email,
            bornDate: props.patient.bornDate,
            gender: props.patient.gender,
            city: props.patient.city,
            message: ''
        };
        // props.patient.array.map(a => {
        //     console.log(a + ' : ' + props[a] + ' : ' + (typeof props[a]))
        // })
    }
    editPatient(id) {
        alertify.confirm(
            "Are you sure to edit this patient.",
            ok => {
                window.localStorage.setItem("patientId", id);
                this.props.patient.history.push('/edit-patient');
            },
            cancel => {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    deletePatient(patientid) {
        alertify.confirm("Are you sure to delete this patient.",
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
        var age = null;
        if (this.props.patient.bornDate != null) {
            var born = Number(this.props.patient.bornDate.substr(0, 4));
            var now = Number(new Date().toLocaleDateString('tr-TR').substr(6, 4));
            age = now - born;
        }
        return (
            <div className="modal fade" id="patientModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Problem Detail</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="card" >
                                    <div className="card-header"> <h3> Patient Detail</h3>  </div>
                                    <ul className="text-left list-group list-group-flush">
                                        <li className="list-group-item"><b>Patient id : </b>{this.props.patient.patientid}</li>
                                        <li className="list-group-item"><b>Name : </b>{this.props.patient.name}</li>
                                        <li className="list-group-item"><b>Last Name : </b>{this.props.patient.lastname}</li>
                                        <li className="list-group-item"><b>Age : </b>
                                            {age !== null ? age : null}
                                        </li>
                                        <li className="list-group-item"><b>Born Date : </b>
                                            {this.props.patient.bornDate !== null ?
                                                <Moment format="YYYY / MM / DD  HH:mm"> {this.props.patient.bornDate} </Moment> : null
                                            }
                                        </li>
                                        <li className="list-group-item"><b>Email : </b>{this.props.patient.email}</li>
                                        <li className="list-group-item"><b>City : </b>{this.props.patient.city}</li>
                                        <li className="list-group-item"><b>Gender : </b>{this.props.patient.gender}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(PatientDetailModal)
