import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import ProblemService from '../../services/ProblemService';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import Modal from 'react-modal';
import Moment from 'react-moment';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
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
                problemName: '',
                problemDetail: '',
                creationDate: new Date(),
                problemStatus:'AYAKTA',
                pid: props.match.params.patientid
            },
            status: 1,
            message: null,
            modalIsOpen: false,
            problemStatuses: [],
            errorMessage: ""
        }
        this.loadPatient = this.loadPatient.bind(this);
    }
    componentDidMount() {
        this.loadPatient();
        
        ProblemService.getProblemStatus().then(res => {
            let statuses = res.data;
            this.setState({
                problemStatuses: statuses
            });
        })
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
                age: p.age,
                city: p.city,
                status: p.status,
                problems: p.problems,
                modalIsOpen: false
                
            });
        })
        .catch((error) => {
            // Error
            if (error.response) {
                console.log(error.response.data.message);
                this.setState({ errorMessage: error.response.data.message ,patientid: null});
                
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log(error.message);
            }
            
        });
    }
    editPatient(id) {
        window.localStorage.setItem("patientId", id);
        this.props.history.push('/edit-patient');
    }
    deleteProblem(problemid) {
        ProblemService.delete(problemid)
            .then(res => {
                this.setState({ message: 'Problem Silindi' });
                this.setState({ problems: this.state.problems.filter(p => p.problemid !== problemid) });
                
                alertify.success("Deleting is ok : "+this.state.message);
            });
    }
    // back() {
    //     this.props.history.push('/patients');
    // }
    addProblem = () => {
        if (this.state.addproblem.problemName === '' || this.state.addproblem.problemDetail === '') {
            this.setState({ message: "Lütfen boş alanları doldurunuz..." });
        } else {
            if(this.state.patientid != null){
                this.setState({ message: '' });
                
                let data = null;
                let problem = {
                    problemName: this.state.addproblem.problemName,
                    problemDetail: this.state.addproblem.problemDetail,
                    creationDate: this.state.addproblem.creationDate,
                    problemStatus: this.state.addproblem.problemStatus,
                    pid: this.state.patientid
                };
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
                            problemStatus:'AYAKTA',
                            creationDate: new Date()
                        }
                    });
                    // alertify.alert("This is an alert dialog.", function(){
                    //   alertify.success('Saving is ok');
                    // });
                    alertify.success("Saving is ok : " + this.state.message);
                });
            }else{
                this.setState({ message: "Hasta kaydı bulunamadı. Lütfen uygun bir hasta seçiniz." });
            }
            
        }
    }
    onChangeName = (e) => {
        this.setState({
            addproblem: {
                problemName: e.target.value,
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
                problemDetail: e.target.value,
                problemStatus: this.state.addproblem.problemStatus,
                creationDate: this.state.addproblem.creationDate
            }
        });
    }
    handleChangeProblemStatus = (e) => {
        this.setState({
            addproblem: {
                problemName: this.state.addproblem.problemName,
                problemDetail: this.state.addproblem.problemName,
                problemStatus: e.target.value,
                creationDate: this.state.addproblem.creationDate
            }
        });
    }

    onChangeDate = date => {
        this.setState({
              addproblem: {
                  problemName:   this.state.addproblem.problemName,
                  problemDetail:   this.state.addproblem.problemDetail,
                  problemStatus: this.state.addproblem.problemStatus,
                  creationDate: date
              }
          });
      }
    handleClose = () => this.setState({ modalIsOpen: false });
    openM = () => {
        this.setState({ message: null });
    };
    viewProblem(problemid) {
        //window.localStorage.setItem("problemid", id);
        this.props.history.push('/patient/problem/' + problemid);
    }
    notFoundPage() {
        this.props.history.push('/notfound');
    }

    onChangeSearchByStatusOrDate = (e) =>  { 
        //this.setState({ [e.target.name]: e.target.value }); 
        this.filterProblems(e.target.value);
    }
    filterProblems(value){
        var results= [];
        let filters = ["problemStatus","creationDate"];
        if(value !== ''){
            results = this.state.problems.filter(problem =>{
                let find = false;
                //filters.forEach(filter=>{
                filters.forEach(function(filter){
                    let control = problem[filter].toLowerCase().indexOf(value.toLowerCase());
                        if(control > -1)  find = true; 
                });
                return find;
            });
            console.log(results)
            this.setState({ problems:  results});
        }
        else{
            this.loadPatient();
        }
    }
    render() {
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        return (
            <div className="container">
                <div className="row">
                    {/* Show and close modal */}
                    <div className="col-lg-12">
                        {
                        this.state.errorMessage !== '' ? 
                        <div className="alert alert-danger" role="alert">
                            {this.state.errorMessage}
                        </div> :  null
                        }

                        {/* <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => this.openModal(true)}>
                            Launch demo modal
                        </button> */}
                        <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() => this.openM()}
                            data-whatever="@getbootstrap">Add Problem</button>
                        {/* 
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={() => this.handleClose()}
                            style={customStyles}
                            contentLabel="Example Modal">

                            <button onClick={() => this.handleClose()}>X </button>
                            <p>hello Modal</p>
                        </Modal> */}
                            {/* {this.state.message !== null ?
                                        <div className="alert alert-warning" role="alert">
                                            <strong>Perfect! </strong>{this.state.message}
                                            
                                        </div>

                                        : <p></p>} */}

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
                                        
                                        <form>
                                            <div className="form-group">
                                                <label >Problem Name:</label>
                                                <input type="text"
                                                    placeholder="Problem Name"
                                                    name="problemName"
                                                    className="form-control"
                                                    value={this.state.addproblem.problemName}
                                                    onChange={this.onChangeName} />
                                            </div>
                                            <div className="form-group">
                                                <label >Problem Detail:</label>
                                                <input type="text"
                                                    placeholder="Problem Detail"
                                                    name="problemDetail"
                                                    className="form-control"
                                                    value={this.state.addproblem.problemDetail}
                                                    onChange={this.onChangeDetail} />
                                            </div>
                                            
                                            <div className="form-group">
                                                <label>City:</label>
                                                <select className="form-control" 
                                                        value={this.state.addproblem.problemStatus} 
                                                        onChange={this.handleChangeProblemStatus} >
                                                    {this.state.problemStatuses.map(status => 
                                                        
                                                        <option key={status} value={status}>{status}</option>
                                                        )}

                                                </select>
                                            </div>



                                            <div className="form-group">
                                                <label >Date :</label>
                                                <DatePicker
                                                    className="form-control"
                                                    // showTimeSelect
                                                    showTimeInput
                                                    selected={this.state.addproblem.creationDate}
                                                    onChange={this.onChangeDate}
                                                    filterDate={isWeekday}          // disable weekend
                                                    timeIntervals={15}              // time range around 15 min
                                                    //showWeekNumbers                 // show week number
                                                    timeFormat="HH:mm"              // show time format
                                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-primary" onClick={this.addProblem} data-dismiss="modal">Add</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </div>
                    {/* Patient Details */}
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

                    {/* Patient's Problem List */}
                    <div className="col-lg-12">
                        <hr />
                        <div className="form-group">
                            <input  type="text" 
                                    placeholder="Search Problem by Status or Create Date" 
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
                                        <th>Problem Name</th>
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
                                            <td>{problem.problemDetail}</td>
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
                                                        className="btn btn-secondary dropdown-toggle"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"> Actions </button>

                                                    <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                        <button 
                                                            className="dropdown-item" 
                                                            onClick={() => this.viewProblem(problem.problemid)} > 
                                                                View </button>
                                                        
                                                        {/* <button className="dropdown-item" onClick={() => this.editPatient(patient.patientid)} > Edit</button> */}
                                                        
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
// export default ViewPatientComponent;