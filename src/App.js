

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Landing from './components/Landing.js';
import Navbar from './components/Navbar';
import  Home  from './components/Home';
import About from './components/About';
import EventState from "./context/events/EventState";
// import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import Superadmin from './components/Superadmin';
import Dashboard from './components/Dashboard';
import Forget from './components/Forget';
import {useState,useEffect} from 'react';





function App() {
  
    const [theme, setTheme] = useState(0);//0 light, 1 dark

    const changeBackgroundColor = (color) => {
        document.body.style.backgroundColor = color;
      };

      const action=()=>{
        changeBackgroundColor((theme==0? '#0a1929':'')) ;setTheme(!theme);
      }
      
      useEffect(action, []);
    
  return (
    <>
      <EventState>
        <Router>
            <div style={{position: "sticky", top:0, zIndex: "5"}}>
          <Navbar theme={theme} action={action}/>
            </div>
            <Switch>
    <Route exact path="/"><Landing theme={theme}/></Route>
              <Route exact path="/home">
                <Home theme={theme}/>
              </Route>
              <Route exact path="/about">
                <About theme={theme}/>
              </Route>
              <Route exact path="/login">
                <Login theme={theme}/>
              </Route>
              <Route exact path="/dashboard">
                <Dashboard theme={theme}/>
              </Route>
              <Route exact path="/forget">
                <Forget theme={theme}/>
              </Route>
              <Route exact path="/signup">
                <Signup theme={theme}/>
              </Route>
              <Route exact path={process.env.REACT_APP_SUPERADMIN_URL}>
                <Superadmin theme={theme}/>
              </Route>
            </Switch>
        </Router>
      </EventState>
    </>
  );
}

export default App;
