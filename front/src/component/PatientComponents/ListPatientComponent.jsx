import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import "@material/react-checkbox/dist/checkbox.css";
import Checkbox from '@material/react-checkbox';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";


const items = [
    'name',
    'lastname',
    'email',
    'city'
  ];
let filterArray = []
class ListPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patients: [],
            message: null,
            checked: {
                name: false,
                lastname: false,
                email: false,
                city: false
            }, 
            indeterminate: false,
            filters : []
        }
        this.reloadPatientList = this.reloadPatientList.bind(this);
    }
    componentDidMount() {

        this.reloadPatientList();
    }
    reloadPatientList() {
        PatientService.getPatients()
            .then((res) => {
                this.setState({ patients: res.data })
            });
    }
    deletePatient(patientid) {
        PatientService.deletePatient(patientid)
            .then(res => {
                this.setState({ message: 'User deleted successfully. ' + res });
                this.setState({ patients: this.state.patients.filter(patient => patient.patientid !== patientid) });
            })
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
    filterPatients =  (value)  => {
        var results= [];
        //let filters = ["name","lastname","email"];
        if(value !== ''){
            results =this.state.patients.filter(patient =>{
                let find = false;
                //filters.forEach(filter=>{
                this.state.filters.forEach(function(filter){
                    let control = patient[filter].toLowerCase().indexOf(value.toLowerCase());
                        if(control > -1)  find = true; 
                });
                return find;
            });
            this.setState({ patients:  results});
        }
        else{
            this.reloadPatientList();
        }
    }
    onChangeSearchByName = (e) =>  { 
        this.setState({ filters:  filterArray});
        this.filterPatients(e.target.value);
    }
    applyFilter(){
        items.map(item=>{
            this.controlFilter(item)
        });
        alertify.success("filtering parameters have been created for the search process.");
    }
    controlFilter( data ){
        if(this.state.checked[data]){
            var index =  filterArray.indexOf(data)
            if (index === -1){
                filterArray.push(data);   
            }
        }else{
            var index =  filterArray.indexOf(data)
            if (index !== -1){
                filterArray.splice(index, 1);
            }
        }
    }
    createCheckbox = label => (
        <div className="float-left" style={{margin: '0 30px 0 0 '}}  key={label} >
            <Checkbox 
                nativeControlId='my-checkbox'
                checked={this.state.checked[label]}
                onChange={(e) => {  this.changeStateForChecked(e,label); } }
            />
            <label htmlFor='my-checkbox'>{label}</label>
        </div>
    )
    changeStateForChecked = (e,label) => {
        if(label === 'name'){
            this.setState({
                checked:{name: e.target.checked,
                    lastname: this.state.checked.lastname,
                    email: this.state.checked.email,
                    city: this.state.checked.city}, 
                indeterminate: e.target.indeterminate });
        }
        else if(label === 'lastname'){
            this.setState({
                checked:{lastname: e.target.checked,
                    name: this.state.checked.name,
                    email: this.state.checked.email,
                    city: this.state.checked.city},
                indeterminate: e.target.indeterminate });
        }
        else if(label === 'email'){
            this.setState({
                checked:{ email: e.target.checked,
                    name: this.state.checked.name,
                    lastname: this.state.checked.lastname,
                    city: this.state.checked.city},
                indeterminate: e.target.indeterminate });
        }
        else if(label === 'city'){
            this.setState({
                checked:{ city: e.target.checked,
                    name: this.state.checked.name,
                    lastname: this.state.checked.lastname,
                    email: this.state.checked.email},
                indeterminate: e.target.indeterminate });
        }
    }

    createCheckboxes = () => (
        items.map((item) => 
            this.createCheckbox(item)
        )
    )

    render() {
        return (
            <div >
                <div className="col-lg-12">
                    <button className="btn btn-warning " style={{ width: '100px' }} onClick={() => this.addPatient()}> Add User</button>
                    <hr />
                    <button className="btn btn-info " style={{ width: '100px' }} onClick={() => this.applyFilter()}> Apply </button>
                    {this.createCheckboxes()}
                    <hr />
                    <div className="form-group">
                        <input  type="text" 
                                placeholder="Search Patient by Name or Lastname or Email" 
                                name="searchByName" 
                                className="form-control"  
                                onChange={this.onChangeSearchByName} />
                    </div>
                    <hr />
                </div>
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-sm table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>gender</th>
                                    <th>city</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.patients.map(patient =>
                                    <tr className={patient.gender === "Male" ? "bg-default" : "bg-danger"}  key={patient.patientid}>
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
                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>
                    </div>
                </div>
            </div>
        );
    }

}

export default ListPatientComponent;