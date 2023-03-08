import React, { useState } from 'react'
import Eventitem from './Eventitem';

const Superadmin = () => {
    const host="http://localhost:5000"
    const [requ, setreq] = useState([]);
    const seereq = async()=>{
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
                    return <Eventitem key={event._id} event={event} />
                })}
    </div>
  )
}

export default Superadmin