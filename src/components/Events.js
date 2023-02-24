import React, { useContext, useEffect, useRef, useState } from 'react'
import eventContext from '../context/events/eventContext';
import Eventitem from './Eventitem';
import AddEvent from './AddEvent';

const Events = () => {
    const context = useContext(eventContext);
    const { events, getEvents, editEvent } = context;
    // console.log(typeof(events));
    useEffect(() => {
        getEvents()
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null)
    const refClose = useRef(null)
    const [event, setEvent] = useState({id: "", etitle: "", edescription: "", etag: ""})

    const updateEvent = (currentEvent) => {
        ref.current.click();
        setEvent({id: currentEvent._id, etitle: currentEvent.title, edescription: currentEvent.description, etag:currentEvent.tag})
    }

    const handleClick = (e)=>{ 
        editEvent(event.id, event.etitle, event.edescription, event.etag)
        refClose.current.click();
    }

    const onChange = (e)=>{
        setEvent({...event, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddEvent />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Event</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={event.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={event.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={event.etag} onChange={onChange} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={event.etitle.length<5 || event.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Event</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h2>Your Events</h2>
                <div className="container mx-2"> 
                {events.length===0 && 'No notes to display'}
                </div>
                {events.map((event) => {
                    return <Eventitem key={event._id} updateEvent={updateEvent} event={event} />
                })}
            </div>
        </>
    )
}

export default Events
