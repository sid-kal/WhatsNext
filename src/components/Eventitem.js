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
                        <span >{event.startTime}</span><br/>
                       <span>{event.endTime}</span>
                        <h6> {event.tag}</h6>
                    </div>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text">Likes: {event.like}</p>
                    <p className="card-text">{event.reqsp && <p>requested</p>}</p>
                    <p className="card-text">{!(event.reqsp) && <p>not requested</p>}</p>
                    <p className="card-text">{(event.isSpecial) && <p>approved</p>}</p>
                    <p className="card-text">{!(event.isSpecial) && <p>denied</p>}</p>
                    
                    
                </div>
            </div>
        </div>
    )
}

export default Eventitem
