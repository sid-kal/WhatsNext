import React, { useContext } from "react";
import eventContext from "../context/events/eventContext";
import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashAlt,
    faEdit,
    faCheck,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Myeventitem = (props) => {
    const context = useContext(eventContext);
    const { deleteEvent } = context;
    const { event, updateEvent } = props;

    return (
        <div className="col-md-5 mb-5 container">
            <div className="card h-100 shadow">
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title mb-3">{event.title}</h5>
                    <p className="card-text mb-4">{event.description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        {/* <span className="text-muted">
              {event.startTime} - {event.endTime}
            </span> */}
                        <span className="text-muted">
                            {moment(event.startTime).format(
                                "MMM Do YYYY, h:mm a"
                            )}{" "}
                            -{" "}
                            {moment(event.endTime).format(
                                "MMM Do YYYY, h:mm a"
                            )}
                        </span>

                        <h6 className="text-capitalize mb-0">{event.tag}</h6>
                    </div>
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
                                Likes: {event.like}
                            </div>
                            <div className="card-text">
                                {event.reqsp && <p>Requested</p>}
                            </div>
                            <div className="card-text">
                                {!event.reqsp && !event.isspecial && (
                                    <p>Not Requested</p>
                                )}
                            </div>
                            <div className="card-text">
                                {event.isspecial && (
                                    <p>Approved as special event</p>
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
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </button>
                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => {
                                    updateEvent(event);
                                }}
                            >
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Myeventitem;
