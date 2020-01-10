import React, { Component } from 'react'
import PatientService from '../services/PatientService';
import ProblemService from '../services/ProblemService';

export default class ViewPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: props.match.params.patientid,
            name: '',
            lastname: '',
            email: '',
            gender: '',
            age: 0,
            city: '',
            problems: [],
            addproblem: {
                problemName: 'data 1',
                problemDetail: 'data 2',
                pid: props.match.params.patientid
            },
            status: 1
        }
        this.loadPatient = this.loadPatient.bind(this);
    }
    componentDidMount() {
        this.loadPatient();
    }
    loadPatient() {
        PatientService.getPatientById(this.state.patientid).then((res) => {
            let p = res.data;
            this.setState({
                patientid: p.patientid,
                name: p.name,
                lastname: p.lastname,
                email: p.email,
                gender: p.gender,
                age: p.age,
                city: p.city,
                status: p.status,
                problems: p.problems
            })
        });
    }
    editPatient(id) {
        window.localStorage.setItem("patientId", id);
        this.props.history.push('/edit-patient');
    }
    deletePatient(patientid) {
        PatientService.deletePatient(patientid)
            .then(res => {
                this.props.history.push('/patients');
            })
    }
    // back() {
    //     this.props.history.push('/patients');
    // }
    addProblem = (e) => {
        e.preventDefault();
        let problem = {
            problemName: this.state.addproblem.problemName,
            problemDetail: this.state.addproblem.problemDetail,
            pid: this.state.patientid
        };
        ProblemService.add(problem).then(res => {
            
        });
        this.state.problems.concat(problem);
        this.setState({ problems:  this.state.problems });
        this.state.problems.map(problem => console.log(problem));
    }
    onChange = (e) => {
        this.setState({
            addproblem: {
                problemName: e.target.value,
                problemDetail: this.state.addproblem.problemDetail,
            }
        });
    }
    onChange2 = (e) => {
        this.setState({
            addproblem: {
                problemName: this.state.addproblem.problemName,
                problemDetail: e.target.value
            }
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        {/* 
                        <Redirect to='/patients' />

                        <button
                            className="btn btn-sm btn-info"
                            onClick={this.back} >
                            Patients
                        </button> */}
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            data-whatever="@getbootstrap">Add Problem</button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">Add Problem For {this.state.name} {this.state.lastname}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="form-group">
                                                <label >Problem Name:</label>
                                                <input type="text"
                                                    placeholder="Problem Name"
                                                    name="problemName"
                                                    className="form-control"
                                                    value={this.state.addproblem.problemName}
                                                    onChange={this.onChange} />
                                            </div>
                                            <div className="form-group">
                                                <label >Problem Detail:</label>
                                                <input type="text"
                                                    placeholder="Problem Detail"
                                                    name="problemDetail"
                                                    className="form-control"
                                                    value={this.state.addproblem.problemDetail}
                                                    onChange={this.onChange2} />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={this.addProblem}>Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <div className="col-lg-6">
                        <div className="card" >
                            <div className="card-header">
                                Patient Details
                            </div>
                            <ul className="text-left list-group list-group-flush">
                                <li className="list-group-item"><b>Name : </b>{this.state.name}</li>
                                <li className="list-group-item"><b>Last Name : </b>{this.state.lastname}</li>
                                <li className="list-group-item"><b>Email :</b>{this.state.email}</li>
                                <li className="list-group-item"><b>City : </b>{this.state.city}</li>
                                <li className="list-group-item"><b>Age : </b>{this.state.age}</li>
                                <li className="list-group-item"><b>Gender : </b>{this.state.gender}</li>
                                <li className="list-group-item">
                                    <button
                                        className="btn btn-sm btn-success"
                                        onClick={() => this.editPatient(this.state.patientid)} >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => this.deletePatient(this.state.patientid)}>
                                        Delete
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img style={{ width: 500, height: 300 }} src="https://cdn.dribbble.com/users/6060/screenshots/3028817/dribbble.jpg" alt="" />

                    </div>
                    <div className="col-lg-12">
                        <hr/>
                        <div className="table-responsive">
                            <table className="table table-bordered table-sm table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>Problem Name</th>
                                        <th>Problem Detail</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.problems.map(problem =>
                                        <tr className="bg-default" key={problem.problemid}>
                                            <td>{problem.problemName}</td>
                                            <td>{problem.problemDetail}</td>
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <button id="btnGroupDrop1"
                                                        type="button"
                                                        className="btn btn-secondary dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"> Actions </button>

                                                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                        {/* <button className="dropdown-item" onClick={() => this.viewPatient(patient.patientid)} > View</button> */}
                                                        {/* <button className="dropdown-item" onClick={() => this.editPatient(patient.patientid)} > Edit</button> */}
                                                        <button className="dropdown-item" > Delete </button>

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
                            <hr />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
