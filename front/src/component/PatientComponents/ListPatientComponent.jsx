import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';
import "alertifyjs/build/css/themes/default.css";
import "alertifyjs/build/css/alertify.css";
import "./ListPatientComponent.css"
// import Modal from 'react-modal';

import * as alertify from 'alertifyjs';

const items = [
    'Name',
    'Lastname',
    'Email',
    'City'
];
let filterArray = []
let checked = {
    name: false,
    lastname: false,
    email: false,
    city: false
}
class ListPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patients: [],
            message: null,
            indeterminate: false,
            filters: []
        }
        this.reloadPatientList = this.reloadPatientList.bind(this);
        //alertify.success("Hoş Geldiniz..");
    }
    componentDidMount() {
        this.reloadPatientList();
    }
    // componentDidUpdate() {
    //     this.reloadPatientList();
    // }
    componentWillMount() {
        this.reloadPatientList();
    }
    reloadPatientList() {
        PatientService.getPatients().then((res) => {
            this.setState({ patients: res.data })
        });
    }
    deletePatient(patientid) {
        alertify.confirm(
            "Are you sure to delete the patient.",
            ok => {
                PatientService.deletePatient(patientid).then(res => {
                    this.setState({ message: 'User deleted successfully. ' + res });
                    this.setState({ patients: this.state.patients.filter(patient => patient.patientid !== patientid) });
                });
                alertify.success('to delete patient is ok');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    editPatient(id) {
        window.localStorage.setItem("patientId", id);
        this.props.history.push('/edit-patient');
    }
    viewPatient(id) {
        window.localStorage.setItem("patientId", id);
        this.props.history.push('/view-patient/' + id);
    }
    addPatient() {
        window.localStorage.removeItem("userId");
        this.props.history.push('/add-patient');
    }
    onChangeSearchByName = (e) => {
        this.filterPatients(e.target.value);
    }
    filterPatients = (value) => {
        var results = [];
        //let filters = ["name","lastname","email"];
        if (value !== '') {
            results = this.state.patients.filter(patient => {
                let find = false;
                //filters.forEach(filter=>{
                filterArray.forEach(function (filter) {
                    let control = patient[filter.toLowerCase()].toLowerCase().indexOf(value.toLowerCase());
                    if (control > -1) find = true;
                });
                return find;
            });
            this.setState({ patients: results });
        }
        else { this.reloadPatientList(); }
    }
    createCheckbox = label => (
        <div className="float-left " key={label} >
            <Checkbox
                nativeControlId='my-checkbox'
                checked={checked[label]}
                onChange={(e) => { this.changeStateForChecked(e, label); }}
            />
            <label className="checkbox-label" htmlFor={label + 'my-checkbox'}><b>{label}</b></label>
        </div>
    )
    createCheckboxes = () => (  items.map((item) => this.createCheckbox(item))  )
    changeStateForChecked = (e, label) => {
        checked[label] = e.target.checked;
        var index = filterArray.indexOf(label);
        if (checked[label]) {
            if (index === -1) {  filterArray.push(label); }
        } else {
            if (index !== -1) {  filterArray.splice(index, 1);  }
        }
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => this.addPatient()}>
                            Add Patient
                        </button> 
                        <hr/>
                    </div>
                    <div className="col-lg-4">
                        {this.createCheckboxes()}
                    </div>
                    <div className="col-lg-8" >
                        <div className="form-group">
                            <input type="text"
                                placeholder="Search Patient by choosing any parameter"
                                name="searchByName"
                                className="form-control"
                                onChange={this.onChangeSearchByName} />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        
                        <div className="table-responsive">
                            <table className="table table-bordered table-sm table-dark table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>City</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.patients.map(patient =>
                                        <tr className={patient.gender === "Male" ? "bg-default" : "bg-danger"} key={patient.patientid}>
                                            <td>{patient.patientid} - {patient.name}</td>
                                            <td>{patient.lastname}</td>
                                            <td>{patient.email}</td>
                                            <td>{patient.gender}</td>
                                            <td>{patient.city}</td>
                                            <td>
                                                <div className="btn-group" role="group">
                                                    <button id="btnGroupDrop1"
                                                        type="button"
                                                        className="btn btn-secondary dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"> Actions </button>
                                                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                        <button className="dropdown-item" onClick={() => this.viewPatient(patient.patientid)} > View</button>
                                                        <div className="dropdown-divider"></div>
                                                        <button className="dropdown-item" onClick={() => this.editPatient(patient.patientid)} > Edit</button>
                                                        <div className="dropdown-divider"></div>
                                                        <button className="dropdown-item" onClick={() => this.deletePatient(patient.patientid)}> Delete </button>
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
        );
    }

}

export default ListPatientComponent;