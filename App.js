import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import EventState from "./context/events/EventState";
// import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import MyEvents from "./components/myEvents";
import Events from "./components/Events";
import EditEvents from "./components/editEvent";

function App() {
  return (
    <>
      <EventState>
        <Router>
          <Navbar />
          {/* <Alert message="This is amazing React course" /> */}
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
              <Route exact path="/signup">
                <Signup />
                </Route>
              <Route exact path="/Events">
                <Events />
              </Route>
              <Route exact path="/myEvents">
                <MyEvents />
                </Route>
                <Route exact path="/editEvents">
                <EditEvents />
              </Route>
            </Switch>
          </div>
        </Router>
      </EventState>
    </>
  );
}

export default App;
