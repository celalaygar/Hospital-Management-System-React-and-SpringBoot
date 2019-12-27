import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListPatientComponent from './component/ListPatientComponent';
import NotFoundComponent from './NotFound/NotFoundComponent';
import AddPatientComponent from './component/AddPatientComponent';
import EditPatientComponent from './component/EditPatientComponent';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <a href="/" className="btn btn-primary">Home</a>
            <Router>
              <Switch>
                <Route path="/" exact component={ListPatientComponent} />
                <Route path="/patients" component={ListPatientComponent} />
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
