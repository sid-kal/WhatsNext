import EventContext from "./eventContext";
import { useState } from "react";

const EventState = (props) => {
  const host = "http://localhost:5000"
  // const eventsInitial = [];
  const [events, setEvents] = useState([{id: "", etitle: "", edescription: "", etag: "", estartTime:Date.now, eendTime:Date.now, ereqsp:false,elike:0,eimage:""}]);
  // let events = [];
  // console.log(Array.isArray(events));
  // Get all events
  const getEvents = async () => {
    // API Call 
    const response = await fetch(`${host}/api/events/fetchallevents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json() 
    // events = json;
    setEvents(json)
  }

  // Add a Event
  const addEvent = async (title, description, tag, startTime, endTime, reqsp, image) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/events/addevent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag, startTime, endTime, reqsp, image})
    });
  
    const json = await response.json();
    if (json.backdate === false) {
      alert("Events in back date cannot be scheduled");
      return;
    }
  
    // console.log(json.event);
    let confirmed = false;
    // Custom confirm box
    if(!(json.success)){
      const options = {
        weekday: 'long', // Include the weekday in the output string
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata' // Replace with your desired timezone
      };
      const confirmation = document.createElement('div');
      confirmation.classList.add('confirmation');
      confirmation.innerHTML = `
        <div class="confirmation-message">
          Event clashes with the following events: 
        </div>
        <div class="confirmation-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Organiser</th>
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              ${json.clash.map((cl) => `
                <tr>
                  <td>${cl.title}</td>
                  <td>${cl.organiser}</td>
                  <td>${(new Date(cl.startTime)).toLocaleString('en-us' , options)}</td>
                  <td>${(new Date(cl.endTime)).toLocaleString('en-us' , options)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
        <div class="confirmation-buttons">
          <button class="confirm-button">Schedule the event anyways</button>
          <button class="cancel-button">Cancel scheduling</button>
        </div>`;
        
      document.body.insertBefore(confirmation, document.body.firstChild);
  
      const confirmButton = confirmation.querySelector('.confirm-button');
      const cancelButton = confirmation.querySelector('.cancel-button');
  
      // Add styles for the confirmation box
      confirmation.style.position = 'fixed';
      confirmation.style.top = '0';
      confirmation.style.left = '0';
      confirmation.style.width = '100%';
      confirmation.style.backgroundColor = '#fff';
      confirmation.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      confirmation.style.padding = '20px';
  
      // Add styles for the confirmation message
      confirmation.querySelector('.confirmation-message').style.fontWeight = 'bold';
      confirmation.querySelector('.confirmation-message').style.marginBottom = '10px';
  
      // Add styles for the confirmation table
      confirmation.querySelector('.confirmation-table table').style.borderCollapse = 'collapse';
      confirmation.querySelector('.confirmation-table th').style.border = '1px solid #ddd';
      confirmation.querySelector('.confirmation-table td').style.border = '1px solid #ddd';
      confirmation.querySelector('.confirmation-table th, .confirmation-table td').style.padding = '8px';
    
      confirmButton.addEventListener('click', async () => {
        confirmed = true;
        confirmation.remove();
  
        const response = await fetch(`${host}/api/events/addeventfinally`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "auth-token":localStorage.getItem("token")
          },
          body: JSON.stringify({title, description, tag, startTime, endTime, reqsp, image})
        });
        const json = await response.json();
        setEvents(events.concat(json.savedEvent));
        const allusers = await fetch(`${host}/api/events/fetchallusers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const usersjson = await allusers.json();
        console.log(usersjson.length);
        for (let i = 0; i < usersjson.length; i++) {
          const res = await fetch(`${host}/api/events/sendnotification`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: usersjson[i].email, event: json.savedEvent})
          });
        }
      });
      cancelButton.addEventListener('click', () => {
        confirmation.remove();
      });
    }
    // console.log(confirmed);
    if (json.success) {
      const response = await fetch(`${host}/api/events/addeventfinally`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem("token")
        },
        body: JSON.stringify({title, description, tag, startTime, endTime, reqsp, image})
      });
      const json = await response.json();
      setEvents(events.concat(json.savedEvent));
      const allusers = await fetch(`${host}/api/events/fetchallusers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const usersjson = await allusers.json();
      console.log(usersjson.length);
      for (let i = 0; i < usersjson.length; i++) {
        const res = await fetch(`${host}/api/events/sendnotification`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email: usersjson[i].email, event: json.savedEvent})
        });
      }
    } 
  }
  

  // Delete a Event
  const deleteEvent = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/events/deleteevent/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token")
      }
    });
    const json = response.json(); 
    const newEvents = events.filter((event) => { return event._id !== id })
    setEvents(newEvents)
    // events = newEvents;
  }

  // Edit a Event
  const editEvent = async (id, title, description, tag, startTime, endTime) => {
    // API Call 
    const response = await fetch(`${host}/api/events/updateevent/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag, startTime, endTime})
    });
    const json = await response.json(); 

     let newEvents = JSON.parse(JSON.stringify(events))
    // Logic to edit in client
    for (let index = 0; index < newEvents.length; index++) {
      const element = newEvents[index];
      if (element._id === id) {
        newEvents[index].title = title;
        newEvents[index].description = description;
        newEvents[index].tag = tag; 
        newEvents[index].startTime = startTime;
        newEvents[index].endTime = endTime;
        newEvents[index].like = element.like;
        break; 
      }
    }  
    setEvents(newEvents);
    // events = newEvents;
  }

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, editEvent, getEvents }}>
      {props.children}
    </EventContext.Provider>
  )

}
export default EventState;