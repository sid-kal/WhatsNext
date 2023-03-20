import React from "react";
import "./Landing.css";
import logo from "./logo1.png";
import Typewriter from "typewriter-effect";

export default function Landing() {
    return (
        <>
            <div>
                <div class="container" >
                    <div class="wrapper">
                        <center>
                            {" "}
                            <div class="header">
                                <img
                                    style={{
                                        width: "30vw",
                                        borderRadius: "15vw",
                                        marginTop: "2vw",
                                    }}
                                    src={logo}
                                    alt="APP LOGO"
                                    srcset=""
                                />
                            </div>
                        </center>
                        <div class="main">
                            <div class="typewriter">
                                <h1>
                                    {" "}
                                    <span class="auto-type"></span>{" "}
                                </h1>
                            </div>
                            <script src="https://cdn.jsdelivr.net/npm/typed.js@2.0.12"></script>




                            <div class="hero-text">
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
                                <div class="hero-img">
                                    <img
                                        src="https://digitshack.com/codepen/mentor7/illustration-mockups.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr></hr>
                <div class="social">
                    <a href="#" class="btnSocial">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" class="btnSocial">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a href="#" class="btnSocial">
                        <i
                            class="fab fa-instagram"
                            style={{ color: "blue" }}
                        ></i>
                    </a>
                </div>
            </div>
        </>
    );
}

