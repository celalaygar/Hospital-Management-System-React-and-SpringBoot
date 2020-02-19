import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";


class AddPatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email:'',
            gender: 'Male',
            age: 0,
            city: 'ANKARA',
            status: 1,
            cities:[]
        }
        this.saveUser = this.saveUser.bind(this);
        this.getAllCities();
    }
    getAllCities(){
        PatientService.getCities().then(res => {
            this.setState({ cities: res.data });

        });
    }
    saveUser = (e) => {
        e.preventDefault();
        let patient = { 
            name: this.state.name, 
            lastname: this.state.lastname, 
            gender: this.state.gender, 
            age: this.state.age, 
            email: this.state.email, 
            city: this.state.city,
            status: this.state.status };
        PatientService.addPatient(patient)
            .then(res => {
                this.setState({ message: 'User added successfully.' });
                this.props.history.push('/patients');
                alertify.success("Adding patient is ok");
            });
    }
    handleChangeGender = (event) => this.setState({gender: event.target.value});
    handleChangeCity = (event) => this.setState({city: event.target.value});
    onChangePatientForm = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="container row">
                <div className="col-sm-9">
                    <h2 className="text-center">ADD PATİENT</h2>
                    <form>
                        <div className="form-group">
                            <label >User Name:</label>
                            <input type="text" placeholder="name" name="name" className="form-control" value={this.state.name}  onChange={this.onChangePatientForm}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input placeholder="Last name" name="lastname" className="form-control" value={this.state.lastname} onChange={this.onChangePatientForm} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.onChangePatientForm} />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="number" placeholder="age" name="age" className="form-control" value={this.state.age} onChange={this.onChangePatientForm} />
                        </div>

                        <div className="form-group">
                            <label>Gender:</label>
                            <select className="form-control" 
                                    value={this.state.gender} 
                                    onChange={this.handleChangeGender} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                         </div>
                        <div className="form-group">
                            <label>City:</label>
                            <select className="form-control" 
                                    value={this.state.city} 
                                    onChange={this.handleChangeCity} >
                                {this.state.cities.map(city => 
                                    
                                    <option key={city} value={city}>{city}</option>
                                    )}

                            </select>
                         </div> 

                        <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                    </form>
                </div>
                <div className="col-lg-3">
                        <img style={{ width: 300, height: 200 }} src="https://cdn.dribbble.com/users/6060/screenshots/3028817/dribbble.jpg" alt="" />
                </div>
                <div className="col-sm-12">
                    <hr/>
                    <hr/>
                    <hr/>
                </div>
            </div>
        );
    }
}

export default AddPatientComponent;