

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import  Home  from './components/Home';
import About from './components/About';
import EventState from "./context/events/EventState";
// import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Superadmin from './components/Superadmin';
import Dashboard from './components/Dashboard';
import Landing from './components/Landing';




function App() {
  
  return (
    <>
      <EventState>
        <Router>
            <div style={{position: "sticky", top:0, zIndex: "5"}}>
          <Navbar />
            </div>
            <Switch>
    <Route exact path="/"><Landing/></Route>
              <Route exact path="/home">
                <Home/>
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/dashboard">
                <Dashboard/>
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path={process.env.REACT_APP_SUPERADMIN_URL}>
                <Superadmin />
              </Route>
            </Switch>
        </Router>
      </EventState>
    </>
  );
}

export default App;
