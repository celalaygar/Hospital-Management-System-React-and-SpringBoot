import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ListPatientComponent from './component/PatientComponents/ListPatientComponent';
import ViewPatientComponent from './component/PatientComponents/ViewPatientComponent';
import AddPatientComponent from './component/PatientComponents/AddPatientComponent';
import EditPatientComponent from './component/PatientComponents/EditPatientComponent';
import NotFoundComponent from './NotFound/NotFoundComponent';
import ViewProblemComponent from './component/PatientComponents/ProblemComponent/ViewProblemComponent';
import IndexPage2 from './component/IndexPage2';
import { Lines } from 'react-preloaders';
function App() {
  return (            
    <div className="App" style={{background: '#fff'}}>

      <div className="container">
        <div className="row">
          <div className="col-sm-12">
          <a href="/">
            {/* style={{width: 400, height: 100}}  */}
            <img style={{ height: 100}}  
            src="data:image/png;base64,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" alt="" />
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
                <Route path="/patient/problem/:problemid" component={ViewProblemComponent} />

                
                <Route path="/notfound" component={NotFoundComponent} />
                <Route path="/de" component={IndexPage2} />
                <Route path="*" component={NotFoundComponent} />
              </Switch>
            </Router>
          </div>
        </div>
      </div>
      {/* <Lines /> */}
      {/* <Lines animation="slide-left" />; */}
      
      <Lines animation="slide" />;

      {/* <Lines animation="slide-down" />; */}

      {/* <Lines animation="slide-right" />; */}
    </div>
  );
}

export default App;
