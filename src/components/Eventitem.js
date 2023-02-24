import React, {useContext} from 'react'
import eventContext from '../context/events/eventContext';

const Eventitem = (props) => {
    const context = useContext(eventContext);
    const { deleteEvent } = context;
    const {event, updateEvent } = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{event.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteEvent(event._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateEvent(event)}}></i>
                        <h5 >{event.date}</h5>
                    </div>
                    <p className="card-text">{event.description}</p>
                    
                </div>
            </div>
        </div>
    )
}

export default Eventitem
