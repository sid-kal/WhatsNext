import React from "react";
var style = document.createElement("style");
style.innerHTML = `
body {
    font-family: Arial, Helvetica, sans-serif;
    margin: 0;
  }
  
  html {
    box-sizing: border-box;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  .column {
    float: left;
    width: 33.3%;
    margin-bottom: 16px;
    padding: 0 8px;
  }
  
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 8px;
  }
  
  .about-section {
    padding: 50px;
    text-align: center;
    background-color: #474e5d;
    color: white;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .container::after, .row::after {
    content: "";
    clear: both;
    display: table;
  }
  
  .title {
    color: grey;
  }
  
  .button {
    border: none;
    outline: 0;
    display: inline-block;
    padding: 8px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 100%;
  }
  
  .button:hover {
    background-color: #555;
  }
  
  @media screen and (max-width: 650px) {
    .column {
      width: 100%;
      display: block;
    }
  }
`;

// Apoorva Gupta
// 210179
// apoorvag21@iitk.ac.in
// Kruthi Akkinepally
// 210088
// akruthi21@iitk.ac.in
// Chitwan Goel
// Geetika
// Krish Sharma
// Aditya Kumar
// Aman Arya
// Siddharth Kalra
// Talin Gupta
// Varun Tokas
// Paras Sikarwar
// 210295
// 210392
// 210530
// 210060
// 210106
// 211032
// 211095
// 211152
// 210699

// chitwang21@iitk.ac.in
//  geetika21@iitk.ac.in
//  krish21@iitk.ac.in
// adityakum21@iitk.ac.in
// aarya21@iitk.ac.in
// siddharthk21@iitk.ac.in
// taling21@iitk.ac.in
//     varuntokas21@iitk.ac.in
// sparas21@iitk.ac.in

document.head.appendChild(style);
const About = ({theme}) => {


    const style={backgroundColor: ((theme==1)?"#001e3c":"")};


    return (
        <>
        <div style={{color: theme?"white":""}}>

            <div class="container" >
                <div class="about-section">
                    <h1>Team What's Next</h1>
                </div>

                <div class="row">
                    <div class="column">
                        <div class="card" style={style}>
                            <div class="container" >
                                <h2>Geetika</h2>
                                {/* <p class="title">CEO & Founder</p> */}
                                {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                                <p>geetika21@iitk.ac.in</p>
                            </div>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card" style={style}>
                            <div class="container">
                                <h2>Chitwan Goel</h2>
                                {/* <p class="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                                <p>chitwang21@iitk.ac.in</p>
                            </div>
                        </div>
                    </div>

                    <div class="column">
                        <div class="card"  style={style}>
                            <div class="container">
                                <h2>Talin Gupta</h2>
                                <p>taling21@iitk.ac.in</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="row">
                        <div class="column">
                            <div class="card" style={style}>
                                <div class="container">
                                    <h2>Aditya Kumar</h2>
                                    {/* <p class="title">CEO & Founder</p> */}
                                    {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                                    <p>adityakum21@iitk.ac.in</p>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card" style={style}>
                                <div class="container">
                                    <h2>Siddharth Kalra</h2>
                                    {/* <p class="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                                    <p>siddharthk21@iitk.ac.in</p>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card" style={style}>
                                <div class="container">
                                    <h2>Paras Sikarwar</h2>
                                    <p>sparas21@iitk.ac.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <div class="row">
                        <div class="column">
                            <div class="card" style={style}>
                                <div class="container">
                                    <h2>Apoorva Gupta</h2>
                                    {/* <p class="title">CEO & Founder</p> */}
                                    {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                                    <p>apoorvag21@iitk.ac.in</p>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card" style={style}>
                                <div class="container">
                                    <h2>Varun Tokas</h2>
                                    {/* <p class="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                                    <p>varuntokas21@iitk.ac.in</p>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card" style={style}>
                                <div class="container">
                                    <h2>Krish Sharma</h2>
                                    <p>krish21@iitk.ac.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="row">
                        <div class="column">
                            <div class="card" style={style}>
                                <div class="container">
                                    <h2>Aman Arya</h2>
                                    {/* <p class="title">CEO & Founder</p> */}
                                    {/* <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                                    <p>aarya21@iitk.ac.in</p>
                                </div>
                            </div>
                        </div>

                        <div class="column">
                            <div class="card" style={style}>
                                <div class="container">
                                    <h2>Kruthi Akkinepally</h2>
                                    {/* <p class="title">Art Director</p>
        <p>Some text that describes me lorem ipsum ipsum lorem.</p> */}
                                    <p>akruthi21@iitk.ac.in</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default About;
