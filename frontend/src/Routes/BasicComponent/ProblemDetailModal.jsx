import React, { Component } from 'react'
import Moment from 'react-moment'
import { withRouter } from 'react-router'

class ProblemDetailModal extends Component {

    constructor(props) {
        super(props)
        this.state = {

        } 
    }
 
    render() {
        return (
            <div className="modal fade" id="problemModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <div className="card-header"><h3> Problem Detail</h3> </div>
                                    <ul className="text-left list-group list-group-flush">
                                        <li className="list-group-item"><b>Problem Name : </b>{this.props.problem.problemName}</li>
                                        <li className="list-group-item"><b>Problem Detail : </b>{this.props.problem.problemDetail}</li>
                                        <li className="list-group-item"><b>Problem Status : </b>{this.props.problem.problemStatus}</li>
                                        <li className="list-group-item"><b>Creation Date (Y/M/D H/M) : </b>
                                            <Moment format="YYYY / MM / DD  HH:mm">{this.props.problem.creationDate}</Moment>
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
export default withRouter(ProblemDetailModal)