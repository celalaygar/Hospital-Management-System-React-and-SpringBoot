import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";

export default class EditPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state ={
            patientid: '',
            name: '',
            lastname: '',
            gender: 'Male',
            email: '',
            age:0 ,
            city: 'Ankara',
            status: 1,
            cities:[]
        }
        this.loadPatient = this.loadPatient.bind(this);
        this.getAllCities();
    }
    getAllCities(){
        PatientService.getCities().then(res => {
            this.setState({ cities: res.data });

        });
    }
    componentDidMount() {
        this.loadPatient();
          
    }

    loadPatient() {
        PatientService.getPatientById(window.localStorage.getItem("patientId"))
            .then((res) => {
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
                })
            });
    }
    editPatient = (e) => {
        e.preventDefault();
        let patient = { 
            patientid: window.localStorage.getItem("patientId"),
            name: this.state.name, 
            lastname: this.state.lastname, 
            gender: this.state.gender, 
            email: this.state.email, 
            age: this.state.age, 
            city: this.state.city,
            status: this.state.status };
        PatientService.editPatient(patient)
            .then(res => {
                this.props.history.push('/patients');
                
                alertify.success("Updated patient is ok");
            });
    }

    handleChangeGender = (event) => this.setState({ gender: event.target.value});
    handleChangeCity = (event) => this.setState({ city: event.target.value});
    onChange = (e) =>  this.setState({ [e.target.name]: e.target.value });
    render() {
        return ( 
                <div className="row">
                    <div className="col-lg-6">
                        <h2 className="text-center">Edit Patient</h2>
                        <hr/>
                        <form>
                        <div className="form-group">
                            <label >User Name:</label>
                            <input type="text" placeholder="name" name="name" className="form-control"  value={this.state.name}  onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text"  placeholder="Last name" name="lastname" className="form-control" value={this.state.lastname} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="number" placeholder="age" name="age" className="form-control" value={this.state.age} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select  className="form-control" value={this.state.gender} onChange={this.handleChangeGender} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                         </div>
                        <div className="form-group">
                            <label>City:</label>
                            <select  className="form-control" value={this.state.city} onChange={this.handleChangeCity} >
                                    {this.state.cities.map(city => 
                                    
                                    <option key={city} value={city}>{city}</option>
                                    )}
                            </select>
                         </div>
                        <button className="btn btn-success" onClick={this.editPatient}>Update</button>
                    </form>
                    </div> 
                    <div className="col-lg-6">
                        <img style={{width: 500, height: 300}} src="https://cdn.dribbble.com/users/6060/screenshots/3028817/dribbble.jpg" alt="" /> 
                    </div>
                    <div className="col-sm-12"> 
                        <hr/>
                        <hr/>
                        <hr/>
                    </div>
                </div> 
        )
    }
}