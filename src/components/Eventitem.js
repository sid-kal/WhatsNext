import React, { useContext } from "react";
import eventContext from "../context/events/eventContext";
import moment from "moment";

const Eventitem = (props) => {
    const context = useContext(eventContext);
    const { deleteEvent } = context;
    const { event } = props;
    return (
        <div className="container col-md-5 ">
            <div className="card my-3" style={{ width: "100%" }}>
                <div className="card-body" style={{ width: "100%" }}>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <div
                            className="card-title mb-3"
                            style={{ fontWeight: "bold", fontSize: 40 }}
                        >
                            {event.title}
                        </div>
                        <div className="text-capitalize mb-0">{event.tag}</div>
                    </div>
                    <hr />
                    <p className="card-text mb-4">{event.description}</p>
                    <p className="text-muted">
                        {moment(event.startTime).format("MMM Do YYYY, h:mm a")}{" "}
                        - {moment(event.endTime).format("MMM Do YYYY, h:mm a")}
                    </p>

                    <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <div className="card-text">Likes: {event.like}</div>
                            <div>
                                {/* <i className="far fa-edit mx-2" onClick={()=>{updateEvent(event)}}></i> */}
                                {/* <p className="card-text">{event.reqsp && <p>requested</p>}</p> */}
                                <div className="card-text">
                                    {!event.reqsp && <div>Not requested as special.</div>}
                                </div>
                                <div className="card-text">
                                    {event.reqsp && event.isspecial && <div>Requested and Approved</div>}
                                </div>
                                <div className="card-text">
                                    {event.reqsp && !event.isspecial && <div>Requested and Denied</div>}
                                </div>
                            </div>
                        </div>
                        <i
                            className="far fa-trash-alt mx-2"
                            onClick={() => {
                                deleteEvent(event._id);
                            }}
                        ></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Eventitem;
