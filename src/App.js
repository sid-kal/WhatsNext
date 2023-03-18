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
import Events from './components/Events';

function App() {
  return (
    <>
      <EventState>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
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
              <Route exact path="/events">
                <Events/>
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/superadmin">
                <Superadmin />
              </Route>
            </Switch>
          </div>
        </Router>
      </EventState>
    </>
  );
}

export default App;
