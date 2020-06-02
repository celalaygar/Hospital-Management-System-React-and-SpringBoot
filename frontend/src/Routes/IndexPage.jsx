import React, { Component } from 'react'
import Axios from 'axios';


class IndexPage extends Component {
    state = {
        patients: []
    }


    deletePatient(id,e){
        console.log("Clicked "+ id);
        Axios.delete(`http://localhost:8182/patient/${id}`); 
        console.log("-------------")
        Axios.get(`http://localhost:8182/patient`)
          .then(res => {
            const patients = res.data;
            console.log(res)
            this.setState({ patients });
          })
    }
    getAll = (e) =>{
        console.log("-------------")
        Axios.get(`http://localhost:8182/patient`)
          .then(res => {
            const patients = res.data;
            console.log(res)
            this.setState({ patients });
          })
          
    }
    componentDidMount() {

        Axios.get(`http://localhost:8182/patient`)
          .then(res => {
            const patients = res.data;
            console.log(res)
            this.setState({ patients });
          })

      }
    render() {
        return (
            <div className="container">
                <div className="App">
                    <h5>Hello</h5>
                    <hr/>
                    <table>
                        <thead>
                            <tr>
                            <th>patientid</th>
                            <th>name</th>
                            <th>lastname</th>
                            <th>city</th>
                            <th>gender</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tfoot> 
                        { this.state.patients.map(p =>
                        <tr  key={p.patientid} >
                            <td>{p.patientid}</td>
                            <td>{p.name}</td>
                            <td>{p.lastname}</td>
                            <td>{p.city}</td>
                            <td>{p.gender}</td>
                            <td>
                                <button onClick={this.deletePatient.bind(this, p.patientid)} className="btn btn-mn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr> )}
                        </tfoot>
                    </table>
                </div>
            </div>
        );
    }
}

export default IndexPage;