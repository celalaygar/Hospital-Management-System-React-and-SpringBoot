import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';
import "alertifyjs/build/css/themes/default.min.css";
import "alertifyjs/build/css/themes/bootstrap.min.css";
import "alertifyjs/build/css/alertify.min.css";
import "../../Assets/css/ListPatientComponent.css"
// import Modal from 'react-modal';

import * as alertify from 'alertifyjs';
import Moment from 'react-moment';

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
let filterAllPatients
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
    // componentWillMount
    UNSAFE_componentWillMount() {
        this.reloadPatientList();
    }
    reloadPatientList() {
        PatientService.getPatients().then((res) => {
            this.setState({ patients: res.data })
            filterAllPatients = res.data
        });
    }
    deletePatient(patientid) {
        alertify.confirm(
            "Are you sure to delete this patient.",
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

        alertify.confirm(
            "Are you sure to edit this patient.",
            ok => {
                window.localStorage.setItem("patientId", id);
                this.props.history.push('/edit-patient');
            },
            cancel => { alertify.error('Cancel'); }
        ).set({ title: "Attention" }).set({ transition: 'slide' }).show();
    }
    viewPatient(patientid) {
        window.localStorage.setItem("patientId", patientid);
        this.props.history.push('/view-patient/' + patientid);
    }
    addPatient() {
        //window.localStorage.removeItem("userId");
        this.props.history.push('/add-patient');
    }
    onChangeSearchByName = (e) => {
        this.filterPatients(e.target.value);
    }
    filterPatients = (value) => {
        if (filterArray.length > 0) {
            var results = [];
            if (value !== '' && value.length > 0) {
                results = filterAllPatients.filter(patient => {
                    let find = false;
                    filterArray.forEach(function (filter) {
                        let control = patient[filter.toLowerCase()].toLowerCase().indexOf(value.toLowerCase());
                        if (control > -1) find = true;
                    });
                    return find;
                });
                this.setState({ patients: results });
            }
            else { this.reloadPatientList(); }
        } else {
            alertify.set('notifier', 'delay', 2);
            //alertify.set('notifier','position', 'top-center');
            alertify.error('Please select any parameters');
        }
    }
    createCheckboxes = () => (items.map((item) => this.createCheckbox(item)))
    createCheckbox = label => (
        <div className="float-left" style={{ margin: "0 25px 0 0" }} key={label} >
            <Checkbox
                nativeControlId='my-checkbox'
                checked={checked[label]}
                onChange={(e) => { this.changeStateForChecked(e, label); }}
            />
            <label className="checkbox-label" ><b>{label}</b></label>
        </div>
    )
    changeStateForChecked = (e, label) => {
        checked[label] = e.target.checked;
        var index = filterArray.indexOf(label);
        if (checked[label]) {
            if (index === -1) { filterArray.push(label); }
        } else {
            if (index !== -1) { filterArray.splice(index, 1); }
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => this.addPatient()}>
                        Add Patient
                        </button>
                    <hr />
                </div>
                <div className="col-lg-6" >
                    <div className="form-group">
                        <input type="text"
                            placeholder="Search Patient by choosing any parameter"
                            name="searchByName"
                            className="form-control"
                            onChange={this.onChangeSearchByName} />
                    </div>
                    <hr />
                </div>
                <div className="col-lg-6"> {this.createCheckboxes()} </div>
                <div className="col-lg-12">
                    <div className="table-responsive-lg">
                        <table className="table table-bordered table-sm table-dark table-hover" style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Born Date</th>
                                    <th>City</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody >
                                {this.state.patients.map(patient =>
                                    <tr className={patient.gender === "Male" ? "bg-default" : "bg-danger"} key={patient.patientid}>
                                        <td>{patient.name} {patient.lastname}</td>
                                        {/* {patient.patientid} */}
                                        <td>{patient.email}</td>
                                        <td>
                                            {patient.bornDate !== null ?
                                                <Moment format="YYYY/MM/DD HH:mm">
                                                    {patient.bornDate}
                                                </Moment>
                                                : null}
                                        </td>
                                        <td>{patient.city}</td>
                                        <td>
                                            <div className="btn-group" role="group">
                                                <button id="btnGroupDrop1"
                                                    type="button"
                                                    className="btn btn-secondary btn-sm dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"> Actions </button>
                                                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.viewPatient(patient.patientid)} >  View </button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.editPatient(patient.patientid)} > Edit</button>
                                                    <div className="dropdown-divider"></div>
                                                    <button
                                                        className="dropdown-item"
                                                        onClick={() => this.deletePatient(patient.patientid)}> Delete </button>
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
        );
    }

}

export default ListPatientComponent;