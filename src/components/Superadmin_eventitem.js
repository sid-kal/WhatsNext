import React , {useState} from 'react'


const Superadmin_eventitem = (props) => {
    const host = "http://localhost:5000"
    const { event } = props;
    const [events, setEvents] = useState([{ id: "", title: "", edescription: "", etag: "", estartTime: Date.now, eendTime: Date.now, ereqsp: false, elike: 0 }]);
    const handledeny = async (id) => {
        let response = await fetch(`${host}/api/superadmin/alltheevents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let json = await response.json()
        // events = json;
        setEvents(json);
        response = await fetch(`${host}/api/superadmin/denyevent/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
           
          });
        json = await response.json(); 
        let newEvents = JSON.parse(JSON.stringify(events));
        // Logic to edit in client
        for (let index = 0; index < newEvents.length; index++) {
            const element = newEvents[index];
            if (element._id === id) {
                newEvents[index].title = element.title;
                newEvents[index].description = element.description;
                newEvents[index].tag = element.tag;
                newEvents[index].startTime = element.startTime;
                newEvents[index].endTime = element.endTime;
                newEvents[index].like = element.like;
                newEvents[index].isspecial = false;
                newEvents[index].reqsp = false;
                break;
            }
        }
        setEvents(newEvents);
        alert("Request has been rejected.")
        window.location.reload();
    }
    const handleapprove = async(id) => {
        let response = await fetch(`${host}/api/superadmin/alltheevents`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        let json = await response.json()
        // events = json;
        setEvents(json);
        response = await fetch(`${host}/api/superadmin/approveevent/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
           
          });
        json = await response.json(); 
        let newEvents = JSON.parse(JSON.stringify(events));
        for (let index = 0; index < newEvents.length; index++) {
            const element = newEvents[index];
            if (element._id === id) {
                newEvents[index].title = element.title;
                newEvents[index].description = element.description;
                newEvents[index].tag = element.tag;
                newEvents[index].startTime = element.startTime;
                newEvents[index].endTime = element.endTime;
                newEvents[index].like = element.like;
                newEvents[index].isspecial = true;
                newEvents[index].reqsp = false;
                break;
            }
        }
        setEvents(newEvents);
        alert("Request has been accepted.")
        window.location.reload();
    }
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{event.title}</h5>

                        <span >{event.startTime}</span><br />
                        <span>{event.endTime}</span>
                        <h6> {event.tag}</h6>
                    </div>
                    <p className="card-text">{event.description}</p>
                    <p className="card-text">Likes: {event.like}</p>
                    <button onClick={()=>handleapprove(event._id)}>Approve</button>
                    <button onClick={()=>handledeny(event._id)}>Deny</button>
                </div>
            </div>
        </div>
    )
}

export default Superadmin_eventitem
