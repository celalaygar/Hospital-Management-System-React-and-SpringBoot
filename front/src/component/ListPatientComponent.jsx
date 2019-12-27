import React, { Component } from 'react'
import ApiService from '../services/ApiService';

class ListPatientComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            patients: [],
            message: null
        }
        // this.deleteUser = this.deleteUser.bind(this);
        // this.editUser = this.editUser.bind(this);
        // this.addUser = this.addUser.bind(this);
        this.reloadPatientList = this.reloadPatientList.bind(this);
    }

    componentDidMount() {
        this.reloadPatientList();
    }

    reloadPatientList() {
        ApiService.fetchPatients()
            .then((res) => {
                this.setState({ patients: res.data })
            });
    }

    deletePatient(patientid) {
        console.log(patientid)
        ApiService.deletePatient(patientid)
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

    render() {
        return (
            <div >
                <div className="col-sm-12">
                    <h2 className="text-center">Patients List</h2>
                    <button className="btn btn-warning" style={{ width: '100px' }} onClick={() => this.addPatient()}> Add User</button>
                    <hr />
                </div>
                <div className="col-sm-12">
                    <div className="table-responsive">
                        <table className="table table-bordered table-sm table-dark table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>FirstName</th>
                                    <th>LastName</th>
                                    <th>gender</th>
                                    <th>Age</th>
                                    <th>city</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.patients.map( patient =>
                                    <tr key={patient.patientid}>
                                        <td>{patient.patientid}</td>
                                        <td>{patient.name}</td>
                                        <td>{patient.lastname}</td>
                                        <td>{patient.gender}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.city}</td>
                                        <td>
                                            <div class="btn-group" role="group">
                                                
                                                <button id="btnGroupDrop1" 
                                                type="button" 
                                                class="btn btn-secondary dropdown-toggle" 
                                                data-toggle="dropdown" 
                                                aria-haspopup="true" 
                                                aria-expanded="false"> Actions </button>

                                                <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                    <button className="dropdown-item" onClick={() => this.viewPatient(patient.patientid)} style={{ marginRight: '20px' }}> View</button>
                                                    <button className="dropdown-item" onClick={() => this.editPatient(patient.patientid)} style={{ marginRight: '20px' }}> Edit</button>
                                                    <button className="dropdown-item" onClick={() => this.deletePatient(patient.patientid)}> Delete </button>

                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default ListPatientComponent;