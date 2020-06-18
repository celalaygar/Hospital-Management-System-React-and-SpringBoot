import React, { Component } from 'react'
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css"; 
import "alertifyjs/build/css/alertify.min.css"; 
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class ReceipeDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receipeid: props.receipeid,
            detail: props.detail,
            drug_detail: props.drug_detail, 
            delivery_date: props.delivery_date,
            patientid:props.patientid,
            problemid:props.problemid
        };
    } 
    editReceipe(id) {
        alertify.confirm(
            "Are you sure to edit the receipe.",
            ok => {
                window.localStorage.setItem("receipeId", id);
                // this.props.history.push('/edit-patient');
            },
            cancel => {
                alertify.error('Cancel');
            }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    deleteReceipe(patientid) {
        alertify.confirm("Are you sure to delete the receipe.",
            function () {
                // PatientService.deletePatient(patientid)
                //     .then(res => {
                //         window.location.href = '/patients';
                //         alertify.success("Deleting is ok ");
                //     })
                console.log("Deleting is ok")
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
                    <div className="card-header"> <h3> Receipe Detail</h3>  </div>
                    <ul className="text-left list-group list-group-flush">
                        
                        <li className="list-group-item"><b>receipe id : </b>{this.props.receipeid}</li>
                        <li className="list-group-item"><b>Detail : </b>{this.props.detail}</li>
                        <li className="list-group-item"><b>Drug detail : </b>{this.props.drug_detail}</li>
                        <li className="list-group-item"><b>Usage : </b>{this.props.usage}</li>
                        <li className="list-group-item"><b>Barcode : </b>{this.props.barcode}</li>
                        <li className="list-group-item"><b>Delivery Date : </b>
                            {this.props.delivery_date !== null ?
                                <Moment format="YYYY / MM / DD  HH:mm">
                                    {this.props.delivery_date}
                                </Moment>
                            : null} 
                        </li>
                        {/* <li className="list-group-item"> 
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => this.deleteReceipe(this.props.receipeid)}>
                                Delete
                            </button>
                        </li> */}
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(ReceipeDetail)
