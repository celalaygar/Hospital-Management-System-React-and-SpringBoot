
import React, { Component } from 'react'
import ProblemService from '../../../services/ProblemService';
import { ErrorMessage, Field, Form, Formik } from "formik";
import ReactDatePicker from 'react-datepicker';
import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import AlertifyService from '../../../services/AlertifyService';
//import Select from 'react-select';

var statuses = [];
export default class ProblemFormComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            patientid: window.localStorage.getItem("patientId"),

            problemName: '',
            problemDetail: '',
            creationDate: new Date(),
            problemStatus: 'AYAKTA',
            pid: props.match.params.patientid,

            status: 1,
            problemStatuses: [],
            errorMessage: "",
            selectedOption: null,
            options: []
        }
        this.loadStatus = this.loadStatus.bind(this);
    }
    componentDidMount() {
        this.loadStatus();
    }
    loadStatus() {
        statuses = [];
        ProblemService.getProblemStatus().then(res => {
            this.setState({ problemStatuses: res.data });
            for (var i = 0; i < this.state.problemStatuses.length; i++) {
                statuses.push({ value: this.state.problemStatuses[i], label: this.state.problemStatuses[i] })
            }
        });
    }
    viewPatient(patientid) {
        window.localStorage.setItem("patientId", patientid);
        this.props.history.push('/view-patient/' + patientid);
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
    addProblem = () => {
        if (this.state.problemName === '' || this.state.problemDetail === '') {
            AlertifyService.alert("Fill in the blanks");
        } else {
            if (this.state.patientid != null) {
                let data = null;
                let newProblem = this.state;
                newProblem['status'] = 1;
                newProblem['pid'] = this.state.patientid;
                ProblemService.add(newProblem).then(res => {
                    data = res.data;
                    // var newStateArray = this.state.problems.slice();
                    // newStateArray.push(data);
                    // this.setState({ problems: newStateArray });
                    this.setState({ 
                            problemName: '',
                            problemDetail: '',
                            problemStatus: 'AYAKTA',
                            creationDate: new Date() 
                    });
                    AlertifyService.successMessage("Saving problem for related patient is ok.. ");
                    this.viewPatient(this.state.patientid);
                });
            } else {
                AlertifyService.alert("There is no patient..");
            }
        }
    }
    onChangeData(type, e) {
        const addproblem = this.state;
        addproblem[type] = e;
        this.setState({ addproblem });
    }
    render() {
        let { problemName, problemDetail, problemStatus, creationDate } = this.state;
        const { selectedOption } = this.state.options;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        return (
            <div className="row">
                <div className="col-sm-12">
                    <h5>Problem Form</h5>
                    <hr />
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => this.viewPatient(this.state.patientid)} >  Back </button>
                    <hr />
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
                                    onChange={e => this.onChangeData('problemName', e.target.value)} />
                                <ErrorMessage name="problemName" component="div" className="alert alert-danger text-danger" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Problem Detail :</label>
                                <Field
                                    className="form-control"
                                    type="text"
                                    name="problemDetail"
                                    value={problemDetail}
                                    onChange={e => this.onChangeData('problemDetail', e.target.value)} />
                                <ErrorMessage name="problemDetail" component="div" className="alert alert-danger text-danger" />
                            </fieldset>
                            {this.state.problemStatuses.length > 0 ?
                                <fieldset className="form-group">
                                    <label >Status : {statuses}  </label>
                                    <Select
                                        value={selectedOption}
                                        onChange={e => this.onChangeData('problemStatus', e.value)}
                                        options={statuses}
                                    />
                                </fieldset>
                                : null}
                            <fieldset className="form-group">
                                <label >Date : </label>
                                <ReactDatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={creationDate}
                                    onChange={e => this.onChangeData('creationDate', e)}
                                    filterDate={isWeekday}          // disable weekend
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </fieldset>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    onClick={() => this.viewPatient(this.state.patientid)}  
                                    data-dismiss="modal">Close</button>
                                <div className="dropdown-divider"></div>
                                <button className="btn btn-success" type="submit">Save</button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        )
    }
}
