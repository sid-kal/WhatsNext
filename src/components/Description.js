import React, { useContext } from "react";
import eventContext from "../context/events/eventContext";

const Eventitem = (props) => {
    // const { deleteEvent } = context;
    const { event } = props;
    return (
        <div className="container card my-3" style={{ width: "100%", height: "100%" }}>
            <div className="card-body">
                <div className="d-flex align-items-center">
                    <h5 className="card-title">{event.title}</h5>
                    {/* <i className="far fa-trash-alt mx-2" onClick={()=>{deleteEvent(event._id)}}></i> */}
                    {/* <i className="far fa-edit mx-2" onClick={()=>{updateEvent(event)}}></i> */}
                    <span>{event.startTime}</span>
                    <br />
                    <span>{event.endTime}</span>
                    <h6> {event.tag}</h6>
                </div>
                <p className="card-text">{event.description}</p>
                <p className="card-text">Like: {event.like}</p>
                <p className="card-text">{event.reqsp && <p>requested</p>}</p>
                <p className="card-text">
                    {!event.reqsp && <p>not requested</p>}
                </p>
                <p className="card-text">
                    {event.isspecial && <p>approved</p>}
                </p>
                <p className="card-text">{!event.isspecial && <p>denied</p>}</p>
            </div>
            
        </div>
    );
};

export default Eventitem;
