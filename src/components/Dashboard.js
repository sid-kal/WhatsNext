import React, { useContext, useEffect, useRef, useState } from "react";
import eventContext from "../context/events/eventContext";
import Eventitem from "./Eventitem";
import AddEvent from "./AddEvent";
import Myeventitem from "./Myeventitem";

const Dashboard = ({theme}) => {
    // console.log(localStorage.getItem("token"));
    const [user, setUser] = useState({ name: "", email: "" });
    const [likedevents, setlikedevent] = useState([]);
    useEffect(() => {
        const getuser = async () => {
            const response = await fetch(
                "http://localhost:5000/api/auth/getuser",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                }
            );
            const loggedinuser = await response.json();
            setUser(loggedinuser);

            const res = await fetch(
                "http://localhost:5000/api/generaluser/showlikedevents",
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                    },
                }
            );

            const json = await res.json();
            // console.log(json.id);
            setlikedevent(json.id);
            // console.log(likedevents);
            }
            getuser();
    }, []);
    
    const context = useContext(eventContext);
    const { events, getEvents, editEvent } = context;
    // console.log(typeof(events));
    useEffect(() => {
        getEvents();
        // eslint-disable-next-line
    }, []);
    const ref = useRef(null);
    const refClose = useRef(null);
    const [event, setEvent] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
        estartTime: Date.now,
        eendTime: Date.now,
        elike: 0,
    });

    const updateEvent = (currentEvent) => {
        ref.current.click();
        setEvent({
            id: currentEvent._id,
            etitle: currentEvent.title,
            edescription: currentEvent.description,
            etag: currentEvent.tag,
            estartTime: currentEvent.startTime,
            eendTime: currentEvent.endTime,
            elike: currentEvent.like,
        });
    };

    const handleClick = (e) => {
        editEvent(
            event.id,
            event.etitle,
            event.edescription,
            event.etag,
            event.estartTime,
            event.eendTime
        );
        refClose.current.click();
    };

    const onChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };

    const style={
    color: theme?"white":""

};

    return (
        <div style={style}>

        <div class="container">
        
            {!localStorage.getItem("token") ? (
                <div>
                    You are not authorised to access the page. Login/Signup and
                    then try again.
                </div>
            ) : (
                <div>
                    <div className="row my-3">
                        <button
                            ref={ref}
                            type="button"
                            className="btn btn-primary d-none"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                        >
                            Launch demo modal
                        </button>
                        <div
                            className="modal fade"
                            id="exampleModal"
                            tabIndex="-1"
                            aria-labelledby="exampleModalLabel"
                            aria-hidden="true"
                        >
                            <div className="modal-dialog"  style={{background: theme?"#001e3c":""}}>
                                <div className="modal-content" style={{background: theme?"#001e3c":""}}>
                                    <div className="modal-header">
                                        <h5
                                            className="modal-title"
                                            id="exampleModalLabel"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            Edit Event
                                        </h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="my-3">
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="title"
                                                    className="form-label"
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="etitle"
                                                    name="etitle"
                                                    value={event.etitle}
                                                    aria-describedby="emailHelp"
                                                    onChange={onChange}
                                                    minLength={5}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="description"
                                                    className="form-label"
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Description
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="edescription"
                                                    name="edescription"
                                                    value={event.edescription}
                                                    onChange={onChange}
                                                    minLength={5}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="tag"
                                                    className="form-label"
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Tag
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="etag"
                                                    name="etag"
                                                    value={event.etag}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="startTime"
                                                    className="form-label"
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    Start Time
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    id="estartTime"
                                                    name="estartTime"
                                                    value={event.estartTime}
                                                    onChange={onChange}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="endTime"
                                                    className="form-label"
                                                    style={{
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    End Time
                                                </label>
                                                <input
                                                    type="datetime-local"
                                                    className="form-control"
                                                    id="eendTime"
                                                    name="eendTime"
                                                    value={event.eendTime}
                                                    onChange={onChange}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            ref={refClose}
                                            type="button"
                                            className="btn btn-secondary"
                                            data-bs-dismiss="modal"
                                        >
                                            Close
                                        </button>
                                        <button
                                            disabled={
                                                event.etitle.length < 5 ||
                                                event.edescription.length < 5
                                            }
                                            onClick={handleClick}
                                            type="button"
                                            className="btn btn-primary"
                                        >
                                            Update Event
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h2>
                            <b>Name: </b> {user.name}
                        </h2>
                        <h2>
                            <b>Email: </b>
                            {user.email}
                        </h2>
                        <hr style={{ height: "2px", marginTop: "2vh" }} />
                        {user.isAdmin && <AddEvent />}
                        <hr style={{ height: "2px" }} />
                        <h2 style={{ fontWeight: "bold" }}>Your Events</h2>
                        <div className="container mx-2">
                            {events?.length === 0 && "No events to display"}
                        </div>
                        {events?.length !== 0 &&
                            events?.map((event) => {
                                return (
                                    <Myeventitem
                                        key={event._id}
                                        updateEvent={updateEvent}
                                        event={event}
                                        theme={theme}
                                    />
                                );
                            })}
                        <hr style={{ height: "2px" }} />
                        <h2 style={{ fontWeight: "bold" }}>Liked Events</h2>
                        {likedevents.length !== 0 &&
                            likedevents?.map((event) => {
                                return (
                                    <Eventitem  key={event._id} event={event} theme={theme}/>
                                );
                            })}
                    </div>
                </div>
            )}
        </div>
        </div>
    );
};

export default Dashboard;