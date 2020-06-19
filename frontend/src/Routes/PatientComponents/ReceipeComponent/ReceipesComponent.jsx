import React, { Component } from 'react'
import "@material/react-checkbox/dist/checkbox.css";
import AlertifyService from '../../../services/AlertifyService';
import ReceipeService from '../../../services/ReceipeService';
import Moment from 'react-moment';

import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
import { withRouter } from 'react-router';
import ReceipeDetail from '../../BasicComponent/ReceipeDetail';

class ReceipesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            problemid: props.problemid,
            receipes: [],
            receipe: {}
        }
        this.getAllReceipes = this.getAllReceipes.bind(this);
        this.viewReceipeDetail = this.viewReceipeDetail.bind(this);
    }
    componentDidMount() {
        this.getAllReceipes();
    }
    getAllReceipes() {
        ReceipeService.getAllByProblemId(this.state.problemid).then((res) => {
            this.setState({ receipes: res.data })
        }).catch((error) => {
            if (error.response) {
                AlertifyService.alert(error.response.data.message);
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    }

    viewQuickly(r) {
        this.setState({ receipe: r })
    }
    viewReceipeDetail = () => (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Receipe Detail</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ReceipeDetail
                            receipeid={this.state.receipe.receipeid}
                            detail={this.state.receipe.detail}
                            drug_detail={this.state.receipe.drug_detail}
                            delivery_date={this.state.receipe.delivery_date}
                            barcode={this.state.receipe.barcode}
                            usage={this.state.receipe.usage}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
    deleteReceipe(receipid) {
        alertify.confirm("Are you sure to delete the receipe.",
            ok => {
                ReceipeService.deleteReceipe(receipid).then((res) => {
                    if (res.data === true) {
                        AlertifyService.successMessage('Receipe was deleted.');
                        this.getAllReceipes();
                    }
                }).catch((error) => {
                    if (error.response) {
                        AlertifyService.alert(error.response.data.message);
                    }
                    else if (error.request) console.log(error.request);
                    else console.log(error.message);
                });
            },
            cancel => { AlertifyService.errorMessage('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    render() {
        let receipes = this.state.receipes;
        return (
            <div className="row">
                <div className="col-lg-12">
                    <hr />
                    <p className="h3 d-flex justify-content-center">Receipes</p>
                    <hr />
                    <div className="table-responsive">
                        <table className="table table-bordered table-sm table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>ID </th>
                                    <th>Receipe Detail</th>
                                    <th>Drug Detail</th>
                                    <th>Create Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receipes.map(r =>

                                    <tr className="bg-default" key={r.receipeid}>
                                        <td>{r.receipeid}</td>
                                        <td>{r.detail}</td>
                                        <td>{r.drug_detail}</td>
                                        <td>
                                            <Moment format="YYYY/MM/DD HH:mm">
                                                {r.delivery_date}
                                            </Moment>
                                        </td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button id="btnGroupDrop1"
                                                    type="button"
                                                    className="btn btn-sm btn-secondary dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"> Actions </button>

                                                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                    <button
                                                        type="button"
                                                        className="dropdown-item"
                                                        onClick={() => this.viewQuickly(r)}
                                                        data-toggle="modal" data-target="#exampleModal" > 
                                                    View Quickly</button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.deleteReceipe(r.receipeid)} >
                                                        Delete </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {this.viewReceipeDetail()}
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ReceipesComponent);