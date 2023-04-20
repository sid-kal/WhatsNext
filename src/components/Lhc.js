import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Lhc() {
  let history = useHistory();
  const params = useParams();
//   const courseId = params.id; // replace with the actual course ID
//                     console.log(courseId)
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {

        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("http://localhost:5000/api/payment/orders");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_oh9lOH7URWO3MH", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "IITK LHC",
            description: "Payment for event scheduling",

            order_id: order_id,
            handler: async function (response) {
                try {
                  const paymentId = response.razorpay_payment_id;
                  const orderId = response.razorpay_order_id;
                  const signature = response.razorpay_signature;
        
                  const result = await axios.post(
                    "http://localhost:5000/api/payment/verify",
                    { paymentId, orderId, signature }
                  );
        
                  if (result.data.status === "success") {
                    alert("Payment successful");
                    history.push("/dashboard");
                    
                    // try {
                    //   const response = await fetch(
                    //     `http://localhost:5000/api/auth/add`,
                    //     {
                    //       method:'POST',
                    //       headers: {
                    //         'Content-Type': 'application/json',
                    //         "auth-token": localStorage.getItem("token"),
                    //       },
                    //       body:JSON.stringify({id:courseId})
                    //     }
                    //   );
                    //   const json = await response.json();
                    //     alert(json.msg);
                    //     // console.log(json.msg)
                    //     if(json.success){
                    //       history.replace(`/details/${courseId}`);
                    //     }
                    // } catch (error) {
                    //   console.error(error);
                    //   alert("Error adding course to user's list");
                    // }
                  } else {
                    alert("Payment failed");
                  }
                } catch (error) {
                  console.error(error);
                  alert(error);
                }
              },
            prefill: {
                name: "",
                email: "cs253proj@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Soumya Dey Corporate Office",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    // const [paid, setpaid] = useState(false);
    // useEffect(() => {
    //   const checkpaid = async() => {
    //     let response = await fetch(`http://localhost:5000/api/auth/check/${courseId}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         "auth-token": localStorage.getItem('token')
    //       }
    //     });
    //     let json = await response.json()
    //     setpaid(json.success);
    //   }
    //   checkpaid();
    // }, [])
    return (
      <div className="App">
      {!(localStorage.getItem('token')) ? <h2>You are not authorized to access the page. Kindly Login/Signup and try again.</h2> : <div>
        {/* {paid ? <><h2>You have already paid for the course. You can proceed to view the course by clicking on the below link.</h2> <Link to={`details/${courseId}`}>View Course</Link></> :
            <header className="App-header">
                
                <p>Buy Course Now!</p>
            </header>} */}
            <button className="App-link" onClick={displayRazorpay}>
                Pay ₹{500}
            </button>
            </div>}
        </div>
    );
}

export default Lhc;
