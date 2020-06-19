import React, { Component } from 'react'
// import * as alertify from 'alertifyjs';
// import "alertifyjs/build/css/themes/default.min.css";
// import "alertifyjs/build/css/themes/bootstrap.min.css"; 
// import "alertifyjs/build/css/alertify.min.css"; 
import { withRouter } from 'react-router';
import Moment from 'react-moment';

class ReceipeDetailModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            receipeid: props.receipe.receipeid,
            detail: props.receipe.detail,
            drug_detail: props.receipe.drug_detail,
            delivery_date: props.receipe.delivery_date,
            patientid: props.receipe.patientid,
            problemid: props.receipe.problemid
        };
    }
    render() {
        return (<div className="modal fade" id="receipemModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <div className="card-header"> <h3> Receipe Detail</h3>  </div>
                                <ul className="text-left list-group list-group-flush">

                                    <li className="list-group-item"><b>receipe id : </b>{this.props.receipe.receipeid}</li>
                                    <li className="list-group-item"><b>Detail : </b>{this.props.receipe.detail}</li>
                                    <li className="list-group-item"><b>Drug detail : </b>{this.props.receipe.drug_detail}</li>
                                    <li className="list-group-item"><b>Usage : </b>{this.props.receipe.usage}</li>
                                    <li className="list-group-item"><b>Barcode : </b>{this.props.receipe.barcode}</li>
                                    <li className="list-group-item"><b>Delivery Date : </b>
                                        {this.props.receipe.delivery_date !== null ?
                                            <Moment format="YYYY / MM / DD  HH:mm">
                                                {this.props.receipe.delivery_date}
                                            </Moment>
                                            : null}
                                    </li>
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
export default withRouter(ReceipeDetailModal)
