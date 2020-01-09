import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListPatientComponent from './component/ListPatientComponent';
import NotFoundComponent from './NotFound/NotFoundComponent';
import AddPatientComponent from './component/AddPatientComponent';
import EditPatientComponent from './component/EditPatientComponent';
import ViewPatientComponent from './component/ViewPatientComponent';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
          <a href="/">
            <img style={{width: 200, height: 100}} 
            src="https://upload.wikimedia.org/wikipedia/commons/8/82/Patient_Logo_2018.svg" alt="" />
          </a>
          </div>
          <div className="col-sm-12">
            <Router>
              <Switch>
                <Route path="/" exact component={ListPatientComponent} />
                <Route path="/patients" component={ListPatientComponent} />
                <Route path="/view-patient/:patientid" component={ViewPatientComponent} />
                <Route path="/add-patient" component={AddPatientComponent} />
                <Route path="/edit-patient" component={EditPatientComponent} />
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
