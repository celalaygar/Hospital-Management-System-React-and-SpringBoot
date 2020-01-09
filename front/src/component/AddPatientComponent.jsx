import React, { Component } from 'react'
import PatientService from '../services/PatientService';

class AddPatientComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            lastname: '',
            email:'',
            gender: 'Male',
            age: 0,
            city: 'Ankara',
            status: 1
        }
        this.saveUser = this.saveUser.bind(this);
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
            });
    }
    handleChangeGender = (event) => this.setState({gender: event.target.value});
    handleChangeCity = (event) => this.setState({city: event.target.value});
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    render() {
        return (
            <div className="col-sm-12">
                <div>
                    <h2 className="text-center">ADD PATİENT</h2>
                    <form>
                        <div className="form-group">
                            <label >User Name:</label>
                            <input type="text" placeholder="name" name="name" className="form-control" value={this.state.name}  onChange={this.onChange}/>
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input placeholder="Last name" name="lastname" className="form-control" value={this.state.lastname} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input placeholder="Email" name="email" className="form-control" value={this.state.email} onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input type="number" placeholder="age" name="age" className="form-control" value={this.state.age} onChange={this.onChange} />
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
                                
                                <option value="Adana">Adana</option>
                                <option value="Ankara">Ankara</option>
                                <option value="Antalya">Antalya</option>
                                <option value="Bursa">Bursa</option>
                                <option value="Diyarbakır">Diyarbakır</option>
                                <option value="İzmir">İzmir</option>
                                <option value="İstanbul">İstanbul</option>
                                <option value="Karaman">Karaman</option>
                                <option value="Konya">Konya</option>
                                <option value="Manisa">Manisa</option>
                                <option value="Mugla">Mugla</option>
                                <option value="Samsun">Samsun</option>
                                <option value="Sivas">Sivas</option>
                                <option value="Osmanniye">Osmaniye</option>
                                <option value="Zonguldak">Zonguldak</option>
                            </select>
                         </div>
                        {/* <div className="form-group">
                            <label>Salary:</label>
                            <input type="number" placeholder="salary" name="salary" className="form-control" value={this.state.salary} onChange={this.onChange} />
                        </div> */}
                        <button className="btn btn-success" onClick={this.saveUser}>Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default AddPatientComponent;