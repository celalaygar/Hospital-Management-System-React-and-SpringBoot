import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css"; 
import "alertifyjs/build/css/alertify.min.css";
import PatientService from '../../services/PatientService';
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class PatientDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: props.patientid,
            name: props.name,
            lastname: props.lastname,
            email: props.email,
            bornDate: props.bornDate,
            gender: props.gender,
            city: props.city,
            message:''
        };
    }
    // componentDidMount() {
        
    // }
    // componentWillReceiveProps() {
    //     this.setState({
    //         patientid: this.props.patientid,
    //         name: this.props.name,
    //         lastname: this.props.lastname,
    //         email: this.props.email,
    //         bornDate: this.props.bornDate,
    //         gender: this.props.gender,
    //         city: this.props.city,
    //     });
    // }
    editPatient(id) {
        alertify.confirm(
            "Are you sure to edit the patient.",
            ok => {
                window.localStorage.setItem("patientId", id);
                this.props.history.push('/edit-patient');
            },
            cancel => {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    deletePatient(patientid) {
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
        var age = null ;
        if(this.props.bornDate != null){
            var born = Number(this.props.bornDate.substr(0, 4)) ;
            var now = Number(new Date().toLocaleDateString('tr-TR').substr(6, 4));
            age = now - born;
        } 
            
        return (
            <div>
                <div className="card" >
                    <div className="card-header"> <h3> Patient Detail</h3>  </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"><b>Patient id : </b>{this.props.patientid}</li>
                        <li className="list-group-item"><b>Name : </b>{this.props.name}</li>
                        <li className="list-group-item"><b>Last Name : </b>{this.props.lastname}</li>
                        <li className="list-group-item"><b>Age : </b>
                            {age !== null ? age : null}
                        </li>
                        <li className="list-group-item"><b>Born Date : </b>
                            {this.props.bornDate !== null ?
                                <Moment format="YYYY / MM / DD  HH:mm">
                                    {this.props.bornDate}
                                </Moment>
                            : null} 
                        </li>
                        
                        <li className="list-group-item"><b>Email : </b>{this.props.email}</li>
                        <li className="list-group-item"><b>City : </b>{this.props.city}</li>
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
