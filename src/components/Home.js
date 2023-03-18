import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
  } from '@mui/x-data-grid';
import Description from "./Description"

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      showLastButton
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
const Home = () => {
  const [events, setEvents] = useState([{title:"", description:""}]);
  const autorun = async () => {
    const res = await fetch("http://localhost:5000/api/homepg/allevents", {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    });
    const json = await res.json();
    setEvents(json.events);
    console.log(json.len);
    console.log(json.events);
  }
  window.onload = autorun;
  function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
  const columns = [
    { field: 'title', headerName: 'Title' , width:170},
    { field: 'description', headerName: 'Description' , width:260},
    {},
    {},
    {},
    {},
  ]
    
  return (
    <div>
      <h2>Home</h2>
      <Link to="/dashboard">
        Profile
      </Link>
      <div className="row my-3">
                <h2>Your Events</h2>
                <div className="container mx-2"> 
                {events.length===0 && 'No notes to display'}
                </div>
                {/* {events.length !== 0 && events.map((event) => {
                    return <Description key={event._id} event={event} />
                })} */}
            </div>
            <div  style={{ display: 'flex', height: '80vh' }}>
            <DataGrid getRowHeight={() => 'auto'} rows={events} columns={columns} pageSize={100} getRowId={(row) =>  generateRandom()} components={{ Toolbar: GridToolbar,Pagination: CustomPagination, }}  />

            </div>

    </div>
  )
}

export default Home

