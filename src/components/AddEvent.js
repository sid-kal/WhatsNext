import React, {useContext, useState} from 'react'
import eventContext from '../context/events/eventContext';
import DateTimePicker from 'react-datetime-picker';
const AddEvent = () => {
    const context = useContext(eventContext);
    const {addEvent} = context;

    const [event, setEvent] = useState({title: "", description: "", tag: "", date:Date.now})

    const handleClick = (e)=>{
        e.preventDefault();
        addEvent(event.title, event.description, event.tag,event.date);
        setEvent({title: "", description: "", tag: "", date:Date.now})
    }

    const onChange = (e)=>{
        setEvent({...event, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
            <h2>Add a Event</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={event.title} onChange={onChange} minLength={5} required /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={event.description} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={event.tag} onChange={onChange} minLength={5} required />
                </div>
                <div className='mb-3'>
                <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date" value={event.date} onChange={onChange} />
                {/* <DateTimePicker onChange={onChange} value={event.date} /> */}
                </div>
               
                <button disabled={event.title.length<5 || event.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Event</button>
            </form>
        </div>
    )
}

export default AddEvent
