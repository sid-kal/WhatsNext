import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo1.png";
import svg from "./logo2.png";
import Typewriter from "typewriter-effect";
import "./login.css";
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Save the auth token and redirect
            localStorage.setItem("token", json.authtoken);
            history.push("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div class="everything">
                <div class="logoandtext">
                    <img
                        style={{
                            borderRadius: "15vw",
                            width: "60%",
                        }}
                        src={logo}
                        alt="APP LOGO"
                        srcset=""
                    />
                    <div className="type">
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter

                                    .typeString(
                                        "Always stay informed with campus activities!"
                                    )

                                    .start();
                            }}
                        />
                    </div>
                </div>
                <div class="hero-img" >
                <div className="container">
        <div className="screen">
        <div className="screen__content">
            <form className='login' onSubmit={handleSubmit}>
                
                
                <div className="login__field">
                        <i className="login__icon fas fa-user"></i>
                    
                    <input type="email" className="login-input" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
               
               
                <div className="login__field">
                        <i className="login__icon fas fa-lock"></i>
                    
                    <input type="password" className="login-input" value={credentials.password} onChange={onChange} name="password" id="password" placeholder="Password" />
                    </div>
                

                <button className="button login__submit">
                        <span className="button__text">Log In Now</span>
                        <i className="button__icon fas fa-chevron-right"></i>
                    </button>	
            </form>
            <div className="social-login">
                    
                    <div className="social-icons">
                        <a href="#" className="social-login__icon fab fa-instagram"></a>
                        <a href="#" className="social-login__icon fab fa-facebook"></a>
                        <a href="#" className="social-login__icon fab fa-twitter"></a>
                    </div>
                </div>
            </div>
            <div className="screen__background">
                <span className="screen__background__shape screen__background__shape4"></span>
                <span className="screen__background__shape screen__background__shape3"></span>		
                <span className="screen__background__shape screen__background__shape2"></span>
                <span className="screen__background__shape screen__background__shape1"></span>
            </div>	
            </div>
            </div>
                </div>
            </div>
            <div class="social">
                <a>Connect with us:</a>
                <a href="https://facebook.com" class="btnSocial">
                    <i
                        class="fab fa-2x fa-facebook-f"
                        style={{ color: "blue" }}
                    ></i>
                </a>
                <a href="https://twitter.com" class="btnSocial">
                    <i
                        class="fab fa-2x fa-twitter"
                        style={{ color: "blue" }}
                    ></i>
                </a>
                <a href="https://instagram.com" class="btnSocial">
                    <i
                        class="fab fa-2x fa-instagram"
                        style={{ color: "blue" }}
                    ></i>
                </a>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>
        </>
    );
};

export default Login;
