import React, { useContext } from "react";
import eventContext from "../context/events/eventContext";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashAlt,
    faEdit
} from "@fortawesome/free-solid-svg-icons";

const Myeventitem = (props) => {
    const context = useContext(eventContext);
    const { deleteEvent } = context;
    const { event, updateEvent } = props;

    const style={backgroundColor: ((props.theme==1)?"#001e3c":"")};

    return (

        <div className="col-md-5 mb-5 container" >
            <div className="card h-100 shadow" style={style}>
                <div className="card-body d-flex flex-column">
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
                    
                    <span className="text-muted">
                        {moment(event.startTime).format("MMM Do YYYY, h:mm a")}{" "}
                        - {moment(event.endTime).format("MMM Do YYYY, h:mm a")}
                    </span>

                    <div
                        className="d-flex align-items-center mt-auto"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                flexDirection: "column",
                            }}
                        >
                            <div className="card-text me-auto">
                                Location : {event.venue}
                            </div>
                            <div className="card-text me-auto">
                                Likes : {event.like}
                            </div>
                            {/* <div className="card-text">
                                {event.reqsp && <p>Requested</p>}
                            </div> */}
                            <div className="card-text">
                                {!event.reqsp  && (
                                    <p>Not requested </p>
                                )}
                            </div>
                            <div className="card-text">
                                { event.isspecial && (
                                    <p>Approved as special.</p>
                                )}
                            </div>
                            {/* <div className="card-text">
                                {!event.isspecial && <p>denied</p>}
                            </div> */}
                        </div>
                        <div className="d-flex align-items-center">
                            <button
                                className="btn btn-sm btn-outline-danger me-2"
                                onClick={() => {
                                    deleteEvent(event._id);
                                }}
                            >
                                Delete <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => {
                                    updateEvent(event);
                                }}
                            >
                                Edit <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Myeventitem;
