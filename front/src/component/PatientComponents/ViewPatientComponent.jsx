import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import ProblemService from '../../services/ProblemService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Modal from 'react-modal';
import Moment from 'react-moment';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import "@material/react-checkbox/dist/checkbox.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from 'react-select';
import PatientDetail from '../BasicComponent/PatientDetail';
import AlertifyService from '../../services/AlertifyService';

var statuses = [];
let filterAllProblem = [];

let filters = ["problemName", "problemStatus"];
export default class ViewPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: props.match.params.patientid,
            name: '',
            lastname: '',
            email: '',
            gender: '',
            bornDate: null,
            city: '',
            problems: [],
            addproblem: {
                problemName: '',
                problemDetail: '',
                creationDate: new Date(),
                problemStatus: 'AYAKTA',
                pid: props.match.params.patientid
            },
            status: 1,
            message: null,
            modalIsOpen: false,
            problemStatuses: [],
            errorMessage: "",
            checked: false, indeterminate: false,
            selectedOption: null,
            options: []
        }
        this.loadPatient = this.loadPatient.bind(this);
    }

    componentDidMount() {
        this.loadPatient();
        this.loadStatus();
    }

    loadPatient() {
        PatientService.getPatientById(this.state.patientid).then(res => {
            let p = res.data;
            this.setState({
                patientid: p.patientid,
                name: p.name,
                lastname: p.lastname,
                email: p.email,
                gender: p.gender,
                bornDate:p.bornDate,
                city: p.city,
                status: p.status,
                problems: p.problems,
                modalIsOpen: false
            });
            filterAllProblem = p.problems;
        }).catch((error) => {
            if (error.response) {
                this.setState({ errorMessage: error.response.data.message, patientid: null });
                AlertifyService.alert(error.response.data.message);
                this.props.history.push('/patients');
            }
            else if (error.request) console.log(error.request);
            else console.log(error.message);
        });
    }

    loadStatus() {
        ProblemService.getProblemStatus().then(res => {
            this.setState({ problemStatuses: res.data });
        })
    }

    deleteProblem(problemid) {
        alertify.confirm("Are you sure to delete the problem.",
            ok => {
                ProblemService.delete(problemid)
                    .then(res => {
                        this.setState({ message: 'Problem Silindi' });
                        this.setState({ problems: this.state.problems.filter(p => p.problemid !== problemid) });
                        AlertifyService.successMessage('Deleting is ok : ' + this.state.message);
                    });
            },
            cancel => { AlertifyService.errorMessage('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }

    addProblem = () => {
        if (this.state.addproblem.problemName === '' || this.state.addproblem.problemDetail === '') {
            this.setState({ message: "Lütfen boş alanları doldurunuz..." });
        } else {
            if (this.state.patientid != null) {
                this.setState({ message: '' });
                let data = null;
                let problem = {
                    problemName: this.state.addproblem.problemName,
                    problemDetail: this.state.addproblem.problemDetail,
                    creationDate: this.state.addproblem.creationDate,
                    problemStatus: this.state.addproblem.problemStatus,
                    status: 1,
                    pid: this.state.patientid
                };
                //console.log(problem)
                ProblemService.add(problem).then(res => {
                    data = res.data;
                    // push new problem to problems
                    var newStateArray = this.state.problems.slice();
                    newStateArray.push(data);
                    this.setState({ problems: newStateArray });
                    this.setState({ message: "Kayıt işlemi başarılı..." });
                    this.setState({
                        addproblem: {
                            problemName: '',
                            problemDetail: '',
                            problemStatus: 'AYAKTA',
                            creationDate: new Date()
                        }
                    });
                    AlertifyService.successMessage("Saving problem for related patient is ok.. ");
                });
            } else { this.setState({ message: "Hasta kaydı bulunamadı." }); }
        }
    }
    onChangeName = (e) => {
        this.setState({
            addproblem: {
                [e.target.name]: e.target.value,
                problemDetail: this.state.addproblem.problemDetail,
                problemStatus: this.state.addproblem.problemStatus,
                creationDate: this.state.addproblem.creationDate
            }
        });
    }

    onChangeDetail = (e) => {
        this.setState({
            addproblem: {
                problemName: this.state.addproblem.problemName,
                [e.target.name]: e.target.value,
                problemStatus: this.state.addproblem.problemStatus,
                creationDate: this.state.addproblem.creationDate
            }
        });
    }

    handleChangeProblemStatus = (e) => {

        this.setState({
            e,
            addproblem: {
                problemName: this.state.addproblem.problemName,
                problemDetail: this.state.addproblem.problemDetail,
                problemStatus: e['value'],
                creationDate: this.state.addproblem.creationDate
            }
        });
    }

    onChangeDate = date => {
        //console.log(date)
        this.setState({
            addproblem: {
                problemName: this.state.addproblem.problemName,
                problemDetail: this.state.addproblem.problemDetail,
                problemStatus: this.state.addproblem.problemStatus,
                creationDate: date
            }
        });
    }

    handleClose = () => this.setState({ modalIsOpen: false });

    openModal = () => {
        statuses = [];
        for (var i = 0; i < this.state.problemStatuses.length; i++) {
            statuses.push({ value: this.state.problemStatuses[i], label: this.state.problemStatuses[i] })
        }
        this.setState({ message: null });
    };

    viewProblem(problemid) {
        //window.localStorage.setItem("problemid", id);
        this.props.history.push('/patient/problem/' + problemid);
    }

    notFoundPage() { this.props.history.push('/notfound'); }

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

    validate(values) {
        let errors = {};
        if (!values.problemName)
            errors.problemName = 'Enter a Problem Name!';
        else if (values.problemName.length < 5)
            errors.problemName = 'Enter at least 5 characters into Problem Name!';

        if (!values.problemDetail)
            errors.problemDetail = 'Enter a Problem Detail!';
        else if (values.problemDetail.length < 5)
            errors.problemDetail = 'Enter at least 5 characters into Problem Detail!';
        return errors;
    }

    handleChange = selectedOption => { this.setState({ selectedOption }); }

    limitingPatientDetail(data) {
        if (data.length < 31) return data;
        else return data.substr(0, 30) + "...";
    }

    render() {
        let { problemName, problemDetail, problemStatus, creationDate } = this.state.addproblem;
        const { selectedOption } = this.state.options;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        return (
            <div className="row">
                {/* Show and close modal */}
                <div className="col-lg-12">
                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => this.openModal()}
                        data-whatever="@getbootstrap">Add Problem</button>
                    {/* ADD PATİENT PROBLEM MODAL */}
                    <div className="modal fade" id="exampleModal"
                        tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="false">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Add Problem For {this.state.name} {this.state.lastname}</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <Formik
                                        onSubmit={this.addProblem}
                                        validate={this.validate}
                                        initialValues={{ problemName, problemDetail, problemStatus, creationDate }}
                                        enableReinitialize={true} >
                                        <Form>
                                            <fieldset className="form-group">
                                                <label>Problem Name :</label>
                                                <Field
                                                    className="form-control"
                                                    type="text"
                                                    name="problemName"
                                                    value={problemName}
                                                    onChange={this.onChangeName} />
                                                <ErrorMessage name="problemName" component="div" className="alert alert-danger text-danger" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Problem Detail :</label>
                                                <Field
                                                    className="form-control"
                                                    type="text"
                                                    name="problemDetail"
                                                    value={problemDetail}
                                                    onChange={this.onChangeDetail} />
                                                <ErrorMessage name="problemDetail" component="div" className="alert alert-danger text-danger" />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label >Status : </label>
                                                <Select
                                                    value={selectedOption}
                                                    onChange={this.handleChangeProblemStatus}
                                                    options={statuses}
                                                />
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label >Date : </label>
                                                <DatePicker
                                                    className="form-control"
                                                    // showTimeSelect
                                                    showTimeInput
                                                    selected={creationDate}
                                                    onChange={this.onChangeDate}
                                                    filterDate={isWeekday}          // disable weekend
                                                    timeIntervals={15}              // time range around 15 min
                                                    //showWeekNumbers               // show week number
                                                    timeFormat="HH:mm"              // show time format
                                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                                />
                                            </fieldset>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <div className="dropdown-divider"></div>
                                                <button className="btn btn-success" type="submit">Save</button>
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
                {/* Patient Details */}
                <div className="col-lg-7">
                    <PatientDetail
                        name={this.state.name}
                        lastname={this.state.lastname}
                        email={this.state.email}
                        city={this.state.city}
                        bornDate={this.state.bornDate}
                        gender={this.state.gender}
                        patientid={this.state.patientid}
                    />
                </div>

                <div className="col"></div>
                <div className="col-lg-4">
                    <img style={{ height: 300 }} src="https://cdn1.iconfinder.com/data/icons/education-vol-1-1/64/009-512.png" alt="" />
                </div>

                {/* Patient's Problem List */}
                <div className="col-lg-12">
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
                                {this.state.problems.map(problem =>

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
                                                        onClick={() => this.deleteProblem(problem.problemid)} >
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
                        <hr />
                        <hr />
                        <hr />
                    </div>
                </div>
            </div>
        )
    }
}