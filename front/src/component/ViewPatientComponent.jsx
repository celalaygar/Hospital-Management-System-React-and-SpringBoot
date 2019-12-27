import React, { Component } from 'react'
import ApiService from '../services/ApiService';


export default class ViewPatientComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patientid: props.match.params.patientid,
            name: '',
            lastname: '',
            gender: '',
            age: 0,
            city: '',
            status: 1
        }
        this.loadPatient = this.loadPatient.bind(this);
    }
    componentDidMount() {
        this.loadPatient();
    }
    loadPatient() {
        console.log(this.state.patientid)
        ApiService.fetchPatientById(this.state.patientid) .then((res) => {
            let p = res.data;
            this.setState({
                patientid: p.patientid,
                name: p.name,
                lastname: p.lastname,
                gender: p.gender,
                age: p.age,
                city: p.city,
                status: p.status,
            })
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <hr />
                    </div>
                    <div className="col-lg-6">
                        <div className="card" >
                            <div class="card-header">
                                Patient Details
                            </div>
                            <ul className="text-left list-group list-group-flush">
                                <li className="list-group-item"><b>Name : </b>{this.state.name}</li>
                                <li className="list-group-item"><b>Last Name :</b>{this.state.lastname}</li>
                                <li className="list-group-item"><b>City : </b>{this.state.city}</li>
                                <li className="list-group-item"><b>Age : </b>{this.state.age}</li>
                                <li className="list-group-item"><b>Gender </b>{this.state.gender}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <img style={{width: 500, height: 300}} src="https://cdn.dribbble.com/users/6060/screenshots/3028817/dribbble.jpg" alt="" />

                    </div>
                </div>
            </div>
        )
    }
}
