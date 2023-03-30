import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo1.png";
import svg from "./logo2.png";
import Typewriter from "typewriter-effect";

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
    function click() {
        // toggle the type attribute
        const togglePassword = document.querySelector("#togglePassword");
        const passwordV = document.querySelector("#password");
        const type = passwordV.getAttribute("type") === "password" ? "text" : "password";
        togglePassword.className === 'fa fa-eye viewpass mr-4 text-muted' ? document.getElementById("togglePassword").className = 'fa fa-eye-slash viewpass mr-4 text-muted' : document.getElementById("togglePassword").className = 'fa fa-eye viewpass mr-4 text-muted';
        passwordV.setAttribute("type", type);

    }
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
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                value={credentials.email}
                                onChange={onChange}
                                id="email"
                                name="email"
                                aria-describedby="emailHelp"
                            />
                            <div id="emailHelp" className="form-text">
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className="mb-3" style={{ position: "relative" }}>
                                <label htmlFor="Password" className="form-label">
                                    Enter Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    onChange={onChange}
                                    style={{ paddingRight: "40px" }} // add padding to make space for the icon
                                />
                                <span
                                    className="fa fa-eye viewpass mr-4 text-muted"
                                    onClick={click}
                                    id="togglePassword"
                                    style={{
                                        position: "absolute",
                                        top: "73%",
                                        right: "10px",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                    }}
                                ></span>
                            </div>


                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </form>
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
