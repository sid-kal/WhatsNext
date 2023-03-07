import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:"", otp : ""}); 
    const [generatedOTP, setGeneratedOTP] = useState("");
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/generateotp", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name,email,password})
        });
        const json = await response.json()
        //console.log(json);
        if (json.success){
          setGeneratedOTP(json.otp);
          alert("OTP generated successfully and sent to your email!");
        } else {
          alert("Invalid credentials");
        }
      }
    
      const handleVerify = (e) => {
        //e.preventDefault();
        const enteredOtp = credentials.otp; // doubt
        if (parseInt(enteredOtp) === parseInt(generatedOTP)) {
          // OTPs match, create user
          const { name, email, password } = credentials;
          fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,password})
          })
          .then(response => response.json())
          .then(json => {
            console.log(json);
            if (json.success){
              // Save the auth token and redirect
              localStorage.setItem('token', json.authtoken); 
              history.push("/");
            } else {
              alert("Invalid credentials");
            }
          })
          .catch(error => console.error(error));
        } else {
          // OTPs don't match
          alert("Incorrect OTP, please try again.");
        }
      }
    

    const onchange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container'>
            <form>
            <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name'  onChange = {onchange} aria-describedby="emailHelp"></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email'  onChange = {onchange} aria-describedby="emailHelp"></input>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="Password" name="password" onChange = {onchange} ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="cPassword" name="cpassword" onChange = {onchange} ></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">OTP</label>
                    <input type="password" className="form-control" id="otp" name="otp" onChange = {onchange} ></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                <button type="button" className="btn btn-primary" onClick={() => handleVerify(generatedOTP, setGeneratedOTP)}>Verify</button>

            </form>
        </div>
    )
}

export default Signup
