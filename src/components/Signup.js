import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "./logo1.png";
import logo1 from "./light.png";
import svg from "./logo2.png";
import Typewriter from "typewriter-effect";
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Signup = ({theme}) => {
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        otp: "",
    });
    const [generatedOTP, setGeneratedOTP] = useState("");
    const [showOTP, setShowOTP] = useState(false);
    const [disableGenerateOTP, setDisableGenerateOTP] = useState(false);
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const response = await fetch(
            "http://localhost:5000/api/auth/generateotp",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            }
        );
        const json = await response.json();
        //console.log(json);
        if (json.success) {
            if (json.already_exists) alert("User already exists");
            else {
                setGeneratedOTP(json.otp);
                alert("OTP generated successfully and sent to your email!");
                setShowOTP(true);
                setDisableGenerateOTP(true);
                setTimeout(() => {
                    setDisableGenerateOTP(false);
                }, 30000);
            }
        } else {
            alert("Invalid credentials");
        }
    };

    const handleVerify = (e) => {
        //e.preventDefault();
        const enteredOtp = credentials.otp; // doubt
        if (parseInt(enteredOtp) === parseInt(generatedOTP)) {
            // OTPs match, create user
            const { name, email, password } = credentials;
            fetch("http://localhost:5000/api/auth/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
                    if (json.success) {
                        // Save the auth token and redirect
                        localStorage.setItem("token", json.authtoken);
                        history.push("/");
                    } else {
                        alert("Invalid credentials");
                    }
                })
                .catch((error) => console.error(error));
        } else {
            // OTPs don't match
            alert("Incorrect OTP, please try again.");
        }
    };

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    function click() {
        // toggle the type attribute
        const togglePassword = document.querySelector("#togglePassword");
        const passwordV = document.querySelector("#Password");
        const type = passwordV.getAttribute("type") === "password" ? "text" : "password";
        togglePassword.className === 'fa fa-eye viewpass mr-4 text-muted' ? document.getElementById("togglePassword").className = 'fa fa-eye-slash viewpass mr-4 text-muted' : document.getElementById("togglePassword").className = 'fa fa-eye viewpass mr-4 text-muted';
        passwordV.setAttribute("type", type);

    }

    const style = {
        backgroundColor: theme == 1 ? "#0a1929" : "",
        color: theme == 1 ? "white" : "black",
    };

    return (
        <>
        <div style={style}>
            <div class="everything">
                <div class="logoandtext">
                    <img
                        style={{
                            borderRadius: "15vw",
                            width: "60%",
                        }}
                        src={theme?logo:logo1}
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
                <div class="hero-img">
                    <div>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    onChange={onchange}
                                    aria-describedby="emailHelp"
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    onChange={onchange}
                                    aria-describedby="emailHelp"
                                ></input>
                                <div id="emailHelp" className="form-text">
                                    We'll never share your email with anyone
                                    else.
                                </div>
                            </div>
                            {/* <div className="mb-3">
                                <label
                                    htmlFor="Password"
                                    className="form-label"
                                >
                                    Enter Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    name="password"
                                    onChange={onchange}
                                    >
                                </input>
                                <span className="fa fa-eye viewpass mr-4 text-muted" onClick={click} id="togglePassword"></span>
                            </div> */}
                            {/* <div className="mb-3">
                                <label
                                    htmlFor="cPassword"
                                    className="form-label"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="cPassword"
                                    name="cpassword"
                                    onChange={onchange}
                                ></input>
                            </div> */}
                            <div className="mb-3" style={{ position: "relative" }}>
                                <label htmlFor="Password" className="form-label">
                                    Enter Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="Password"
                                    name="password"
                                    onChange={onchange}
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

                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={disableGenerateOTP}
                            >
                                {disableGenerateOTP
                                    ? "Wait for 30s before generating new otp"
                                    : "Generate OTP for my email"}
                            </button>

                            {showOTP && (
                                <div className="mb-3">
                                    <label
                                        htmlFor="cPassword"
                                        className="form-label"
                                    >
                                        OTP (Check your spam if you do not see
                                        the email)
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="otp"
                                        name="otp"
                                        onChange={onchange}
                                    ></input>
                                </div>
                            )}
                            {showOTP && (
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() =>
                                        handleVerify(
                                            generatedOTP,
                                            setGeneratedOTP
                                        )
                                    }
                                >
                                    Verify Otp
                                </button>
                            )}
                        </form>
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
            </div>
        </>
    );
};

export default Signup;
