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
            <img style={{ height: "100px", margin: "10px 0"}}  
            src="https://cdn.onlinewebfonts.com/svg/img_492937.png" alt="" />
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
