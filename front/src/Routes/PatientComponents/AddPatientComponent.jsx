import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";
import AlertifyService from '../../services/AlertifyService';

class AddPatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email:'',
            gender: 'Male',
            city: 'ANKARA',
            bornDate: new Date(),
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
            email: this.state.email, 
            city: this.state.city,
            bornDate : this.state.bornDate,
            status: this.state.status }; 
        PatientService.addPatient(patient)
            .then(res => {
                this.setState({ message: 'User added successfully.' });
                this.props.history.push('/patients');
                alertify.success("Adding patient is ok");
            }).catch((error) => {
                console.log(error.response)
                if (error.response) {
                    this.setState({ errorMessage: error.response.data.message, patientid: null });
                    AlertifyService.alert(error.response.data.message);
                    //this.props.history.push('/patients');
                }
                else if (error.request) console.log(error.request);
                else console.log(error.message);
            });
    }
    handleChangeGender = (event) => this.setState({gender: event.target.value});
    handleChangeCity = (event) => this.setState({city: event.target.value});
    onChangePatientForm = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onChangeDate = date => {
        this.setState({  bornDate: date });
    }
    render() { 
        let bornDate = this.state.bornDate;
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
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
                            <label>Born Date:</label>
                            <div className="form-group">
                                <DatePicker
                                    className="form-control"
                                    // showTimeSelect
                                    showTimeInput
                                    selected={bornDate}
                                    onChange={this.onChangeDate}
                                    filterDate={isWeekday}          // disable weekend
                                    timeIntervals={15}              // time range around 15 min
                                    //showWeekNumbers               // show week number
                                    timeFormat="HH:mm"              // show time format
                                    dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                />
                            </div>
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
                        <img style={{  height: 200 }} src="https://i1.wp.com/www.nosinmiubuntu.com/wp-content/uploads/2013/02/New-Database.png?w=770" alt="" />
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