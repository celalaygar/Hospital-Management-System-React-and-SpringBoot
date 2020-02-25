import React, { Component } from 'react'
import Moment from 'react-moment'
import { withRouter } from 'react-router'

class ProblemDetail extends Component {
    render() {
        return (
            <div>
                <div className="card" >
                    <div className="card-header"><h3> Problem Detail</h3> </div>
                    <ul className="text-left list-group list-group-flush">
                        <li className="list-group-item"><b>Problem Name : </b>{this.props.problemName}</li>
                        <li className="list-group-item"><b>Problem Detail : </b>{this.props.problemDetail}</li>
                        <li className="list-group-item"><b>Problem Status : </b>{this.props.problemStatus}</li>

                        <li className="list-group-item"><b>Create Date : (Y/M/D H/M) </b>
                            <Moment format="YYYY/MM/DD HH:mm">
                                {this.props.creationDate}
                            </Moment>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
export default withRouter(ProblemDetail)