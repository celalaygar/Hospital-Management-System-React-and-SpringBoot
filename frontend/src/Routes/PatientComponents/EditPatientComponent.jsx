import React, { Component } from 'react'
import PatientService from '../../services/PatientService';
import * as alertify from 'alertifyjs';
import "alertifyjs/build/css/alertify.css";
import DatePicker from "react-datepicker";

export default class EditPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: '',
            name: '',
            lastname: '',
            gender: 'Male',
            email: '',
            bornDate: null,
            city: 'Ankara',
            status: 1,
            cities: []
        }
        this.loadPatient();
        this.loadPatient = this.loadPatient.bind(this);
        this.getAllCities();
    }
    getAllCities() {
        PatientService.getCities().then(res => {
            this.setState({ cities: res.data });
        });
    }
    componentDidMount() {
        this.loadPatient();
        this.getAllCities();
    }

    loadPatient() {
        PatientService.getPatientById(window.localStorage.getItem("patientId")).then((res) => {
            let p = res.data;
            this.setState({
                patientid: p.patientid,
                name: p.name,
                lastname: p.lastname,
                email: p.email,
                phoneNo: p.phoneNo,
                bornDate: p.bornDate,
                gender: p.gender,
                city: p.city,
                status: p.status,
            });
        });
    }
    editPatient = (e) => {
        e.preventDefault();
        let patient = this.state;
        patient['patientid'] = window.localStorage.getItem("patientId");
        PatientService.editPatient(patient).then(res => {
            this.props.history.push('/patients');
            alertify.success("Updated patient is ok");
        });
    }
    onChangeData(type, data) {
        const stateData = this.state;
        stateData[type] = data;
        this.setState({ stateData });
    }
    render() {
        let bornDate = new Date();

        if (this.state.bornDate !== null)
            bornDate = new Date(this.state.bornDate.toString());
        const isWeekday = date => {
            const day = date.getDay(date);
            return day !== 0 && day !== 6;
        };
        let {name, lastname,phoneNo, email, gender, city} = this.state;
        return (
            <div className="row">
                <div className="col-lg-7">
                    <h2 className="text-center">Edit Patient</h2>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label >User Name:</label>
                            <input type="text" placeholder="name" name="name" className="form-control" value={name} onChange={e => this.onChangeData('name', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Last Name:</label>
                            <input type="text" placeholder="Last name" name="lastname" className="form-control" value={lastname} onChange={e => this.onChangeData('lastname', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Phone No:</label>
                            <input type="text" placeholder="phone No" name="lastphoneNoname" className="form-control" value={phoneNo} onChange={e => this.onChangeData('phoneNo', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" placeholder="Email" name="email" className="form-control" value={email} onChange={e => this.onChangeData('email', e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Born Date:</label>
                            {bornDate !== null ?
                                <div className="form-group">
                                    <DatePicker
                                        className="form-control"
                                        // showTimeSelect
                                        showTimeInput
                                        selected={bornDate}
                                        onChange={e => this.onChangeData('bornDate', e)}
                                        filterDate={isWeekday}          // disable weekend
                                        timeIntervals={15}              // time range around 15 min
                                        //showWeekNumbers               // show week number
                                        timeFormat="HH:mm"              // show time format
                                        dateFormat="yyyy/MM/dd h:mm aa" // show all of time format
                                    />
                                </div>
                                :
                                null

                            }
                        </div>
                        <div className="form-group">
                            <label>Gender:</label>
                            <select className="form-control" value={gender} onChange={e => this.onChangeData('gender', e.target.value)} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>City:</label>
                            <select className="form-control" value={city} onChange={e => this.onChangeData('city', e.target.value)}>
                                {this.state.cities.map(c =>

                                    <option key={c} value={c}>{c}</option>
                                )}
                            </select>
                        </div>
                        <button className="btn btn-success" onClick={this.editPatient}>Update</button>
                    </form>
                </div>
                <div className="col">

                </div>
                <div className="col-lg-4">
                    <img style={{ margin: '20px 0', height: 300 }} src="https://www.shareicon.net/data/512x512/2016/02/26/725010_document_512x512.png" alt="" />
                </div>
                <div className="col-sm-12">
                <hr />
                <hr />
                <hr />
                </div>
            </div>
        )
    }
}