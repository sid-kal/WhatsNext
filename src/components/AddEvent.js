import React, { useContext, useState } from "react";
import eventContext from "../context/events/eventContext";

const AddEvent = () => {
    const context = useContext(eventContext);
    const { AaddEvent } = context;

    const [event, setEvent] = useState({
        title: "",
        description: "",
        tag: "",
        startTime: Date.now,
        endTime: Date.now,
        reqsp: false,
        like: 0,
        image: "",
        venue:""
    });

    const handleClick = (e) => {
        e.preventDefault();
        let tmp = document.getElementById("reqsp");
        let tmp2 = tmp.checked;
        const now = new Date();
        // console.log(typeof(now))
        // console.log(typeof((event.startTime)))
        const sttime = new Date(event.startTime);
        const endtime = new Date(event.endTime);

        if(sttime <= now || endtime <= now){
            alert("Events in back date cannot be scheduled")
            return;
        }
        if (event.startTime >= event.endTime) {
            alert("Please enter valid start time and end time.");
        } else {
            AaddEvent(
                event.title,
                event.description,
                event.tag,
                event.startTime,
                event.endTime,
                tmp2,
                event.image,
                event.venue
            );
            setEvent({
                title: "",
                description: "",
                tag: "",
                startTime: Date.now,
                endTime: Date.now,
                reqsp: false,
                like: 0,
                image: "",
                venue:""
            });
        }
    };

    const onChange = (e) => {
        setEvent({ ...event, [e.target.name]: e.target.value });
    };
    return (
        <div className="container my-3" style={{width: "50vw"}}>
            <h2 style={{ fontWeight: "bold" }}>Add Event</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        aria-describedby="emailHelp"
                        value={event.title}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={event.description}
                        onChange={onChange}
                        minLength={5}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                        Tag
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={event.tag}
                        onChange={onChange}
                        required
                    />
                </div>
              

                <div className="mb-3">
                    <label htmlFor="startTime" className="form-label">
                        Start Time
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="startTime"
                        name="startTime"
                        value={event.startTime}
                        onChange={onChange}
                    />
                    {/* <DateTimePicker onChange={onChange} value={event.date} /> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="endTime" className="form-label">
                        End Time
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control"
                        id="endTime"
                        name="endTime"
                        value={event.endTime}
                        onChange={onChange}
                    />
                    {/* <DateTimePicker onChange={onChange} value={event.date} /> */}
                </div>
                <div className="mb-3">
                    <label
                        htmlFor="reqsp"
                        className="form-label"
                        style={{ display: "flex" }}
                    >
                        <div style={{ marginRight: "1vw" }}>Special Event</div>
                        <input
                            type="checkbox"
                            id="reqsp"
                            name="reqsp"
                            value={event.reqsp}
                            onChange={onChange}
                        />
                    </label>
                    {/* <DateTimePicker onChange={onChange} value={event.date} /> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Link for poster/image
                    </label>
                    <input
                        type="text"
                        id="image"
                        className="form-control"
                        name="image"
                        value={event.image}
                        onChange={onChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="venue" className="form-label">
                        Location of the event
                    </label>
                    <input
                        type="text"
                        id="venue"
                        className="form-control"
                        name="venue"
                        value={event.venue}
                        onChange={onChange}
                    />
                </div>

                <button
                    disabled={
                        event.title.length < 5 || event.description.length < 5
                    }
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleClick}
                >
                    Add Event
                </button>
            </form>
        </div>
    );
};

export default AddEvent;
