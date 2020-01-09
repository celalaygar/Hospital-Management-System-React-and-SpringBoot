import React, { Component } from 'react'
import PatientService from '../services/PatientService';

class ListPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patients: [],
            message: null,
            patientNames : []
        }
        // this.deleteUser = this.deleteUser.bind(this);
        // this.editUser = this.editUser.bind(this);
        // this.addUser = this.addUser.bind(this);
        this.reloadPatientList = this.reloadPatientList.bind(this);
    }

    componentDidMount() {
        // let value = (9-1)/(10*2*2)/(6-4);
        // let value2 = 8/40/2;
        // console.log(value+" - - "+value2)

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
        let filters = ["name","lastname","email"];
        if(value !== ''){
            results =this.state.patients.filter(patient =>{
                let find = false;
                //filters.forEach(filter=>{
                filters.forEach(function(filter){
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
        //this.setState({ [e.target.name]: e.target.value }); 
        this.filterPatients(e.target.value);
    }
    render() {
        return (
            <div >
                <div className="col-lg-12">
                    <button className="btn btn-warning " style={{ width: '100px' }} onClick={() => this.addPatient()}> Add User</button>
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
                                                    <button className="dropdown-item" onClick={() => this.editPatient(patient.patientid)} > Edit</button>
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