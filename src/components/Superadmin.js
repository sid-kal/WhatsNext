import React, { useState } from 'react'
import Superadmin_eventitem from './Superadmin_eventitem';

const Superadmin = () => {
  const host= "http://localhost:5000"
  const [requ, setreq] = useState([]);
  const seereq = async () => {
    const response = await fetch(`${host}/api/superadmin/seerequests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        //   "auth-token": localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setreq(json);
  }
  
  
  return (
    <div>
      <button onClick={seereq}>requests</button>
      {requ.map((event) => {
        return <Superadmin_eventitem key={event._id} event={event} />
      })}
    </div>
  )
}

export default Superadmin
