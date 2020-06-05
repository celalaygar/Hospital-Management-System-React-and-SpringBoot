import React, { Component } from 'react'
import "@material/react-checkbox/dist/checkbox.css";
import AlertifyService from '../../../services/AlertifyService';
import ReceipeService from '../../../services/ReceipeService';
import Moment from 'react-moment';

export default class ReceipesComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            problemid: props.problemid,
            receipes: []
        }
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
    render() {

        return (
            <div className="col-lg-12">
            <hr />
            {/* <div className="form-group">
                <input type="text"
                    placeholder="Search Problem by problem Name or problem Status"
                    name="searchByName"
                    className="form-control"
                    onChange={this.onChangeSearchByStatusOrDate}
                />
            </div> */}
            <p className="h3 d-flex justify-content-center">Receipe Table</p>
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
                        {this.state.receipes.map(r =>

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
                                                className="dropdown-item"
                                                onClick={() => this.viewReceipe(r.receipeid)} >
                                                View </button>
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
                <hr />
                <hr />
                <hr />
            </div>
        </div>
        )
    }
}
