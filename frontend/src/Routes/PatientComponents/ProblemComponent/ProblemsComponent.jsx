
import React, { Component } from 'react'
import Moment from 'react-moment';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
import ProblemService from '../../../services/ProblemService';
import AlertifyService from '../../../services/AlertifyService';
import { withRouter } from 'react-router';
import ProblemDetail from '../../BasicComponent/ProblemDetail';


let filterAllProblem = [];
let filters = ["problemName", "problemStatus"];
class ProblemsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: props.patientid,
            problems: [],
            problem:{}

        }
        this.getAllProblems = this.getAllProblems.bind(this);
    }
    componentDidMount() {
        this.getAllProblems();
    }
    getAllProblems() {
        ProblemService.getAllByPatientId(this.state.patientid).then(res => {
            this.setState({ problems: res.data });
        });
    }
    onChangeSearchByStatusOrDate = (e) => { this.filterProblems(e.target.value); }
    filterProblems(value) {
        var results = [];
        if (value !== '') {
            results = filterAllProblem.filter(problem => {
                let find = false;
                //filters.forEach(filter=>{
                filters.forEach(function (filter) {
                    let control = problem[filter].toLowerCase().indexOf(value.toLowerCase());
                    if (control > -1) find = true;
                });
                return find;
            });
            this.setState({ problems: results });
        }
        else { this.loadPatient(); }
    }
    limitingPatientDetail(data) {
        if (data.length < 31) return data;
        else return data.substr(0, 30) + "...";
    }
    deleteProblem(problemid) {
        alertify.confirm("Are you sure to delete the problem.",
            ok => {
                ProblemService.delete(problemid).then(res => {
                    //this.setState({ problems: this.state.problems.filter(p => p.problemid !== problemid) });
                    AlertifyService.successMessage('Deleting is ok : ');
                    this.getAllProblems();
                });
            },
            cancel => { AlertifyService.errorMessage('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    viewProblem(problemid) {
        window.localStorage.setItem("problemid", problemid);
        this.props.history.push('/problem/' + problemid);
    }
    viewQuickly(problem){
        this.setState({problem:problem});
    }
    viewQuicklyModal = (problem) => (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Problem Detail</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                            <ProblemDetail
                                problemid={problem.problemid}
                                problemName={problem.problemName}
                                problemDetail={problem.problemDetail}
                                problemStatus={problem.problemStatus}
                                creationDate={problem.creationDate}
                                patientid={this.state.patientid}
                            />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
    render() {
        let problems = this.state.problems;
        return (
            <div className="row">
            <div className="col-lg-12">
                <hr />
                <p className="h3 d-flex justify-content-center">Problems</p>
                <hr />
                <div className="form-group">
                    <input type="text"
                        placeholder="Search Problem by problem Name or problem Status"
                        name="searchByName"
                        className="form-control"
                        onChange={this.onChangeSearchByStatusOrDate}
                    />
                </div>
                <hr />
                <div className="table-responsive">
                    <table className="table table-bordered table-sm table-dark table-hover">
                        <thead>
                            <tr>
                                <th>Problem Name </th>
                                <th>Problem Detail</th>
                                <th>Problem Status</th>
                                <th>Create Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {problems.map(problem =>

                                <tr className="bg-default" key={problem.problemid}>
                                    <td>{problem.problemName}</td>
                                    <td>{this.limitingPatientDetail(problem.problemDetail)}</td>

                                    <td>{problem.problemStatus}</td>
                                    <td>
                                        <Moment format="YYYY/MM/DD HH:mm">
                                            {problem.creationDate}
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
                                                    onClick={() => this.viewProblem(problem.problemid)} >
                                                    View </button>
                                                <div className="dropdown-divider"></div>
                                                <button
                                                    className="dropdown-item"
                                                    data-toggle="modal" data-target="#exampleModal"
                                                    onClick={() => this.viewQuickly(problem)} >
                                                    View Quickly </button>
                                                <div className="dropdown-divider"></div>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={() => this.deleteProblem(problem.problemid)} >
                                                    Delete </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {this.viewQuicklyModal(this.state.problem)}
                    <hr />
                    <hr />
                    <hr />
                </div>
            </div></div>
        )
    }
}
export default withRouter(ProblemsComponent);