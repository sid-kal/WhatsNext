import EventContext from "./eventContext";
import { useState } from "react";

const EventState = (props) => {
  const host = "http://localhost:5000"
  const eventsInitial = [];
  const [events, setEvents] = useState(eventsInitial);
  // let events = [];
  console.log(Array.isArray(events));
  // Get all Notes
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
  const addEvent = async (title, description, tag) => {
    // TODO: API Call
    // API Call 
    const response = await fetch(`${host}/api/events/addevent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title, description, tag})
    });

    const event = await response.json();
    // const finalevents = events.concat(event);
    console.log(Array.isArray(events));
    setEvents(events.concat(event))
    events.push(event);
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
  const editEvent = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/events/updateevent/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
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