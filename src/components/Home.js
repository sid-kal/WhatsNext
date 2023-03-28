import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/styles";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import Description from "./Description";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

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
const useStyles = makeStyles({
    root: {
        "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#0047AB",
            color: "white",
        },
        "& .MuiDataGrid-cell": {
            fontWeight: "bold",
        },
    },
});

const EventCard = (data) => {
    return (
        <>
            <div>{data.title}</div>
        </>
    );
};
const Home = () => {
    const classes = useStyles();
    const [events, setEvents] = useState([
        {
            title: "",
            description: "",
            startTime: Date(0),
            endTime: Date(0),
            id: "",
            like: 0,
        },
    ]);
    const [open, setOpen] = useState(false);
    const [popupData, setPopupData] = useState({});
    const [jsonText, setJsonText] = useState("like");
    useEffect(() => {
        const autorun = async () => {
            const res = await fetch(
                "http://localhost:5000/api/homepg/allevents",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            const json = await res.json();
            setEvents(json.events);
            console.log(json.len);
            console.log(json.events);
        };
        autorun();
    }, []);
    // window.onload = autorun;
    function generateRandom() {
        var length = 8,
            charset =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
            retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
    const columns = [
        { field: "title", headerName: "Title", width: "200" },
        // { field: 'description', headerName: 'Description' , width:260},

        {
            field: "startTime",
            headerName: "Start Time",
            width: 225,
            valueFormatter: (params) =>
                moment(params.value).format("h:mm a, Do MMMM, YYYY"),
        },
        {
            field: "endTime",
            headerName: "End Time",
            width: 225,
            valueFormatter: (params) =>
                moment(params.value).format("h:mm a, Do MMMM, YYYY"),
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <div
                    className="btn btn-sm btn-primary"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        setPopupData(params.row);
                        console.log(params.row);
                        setOpen(true);
                    }}
                >
                    View Details
                </div>
            ),
        },
        {
            field: "organiser",
            headerName: "Organiser",
            width: 230,
        },
        {
            field: "likeevent",
            headerName: "Like",
            width: 100,
            renderCell: (params) => (
                <div
                    variant="contained"
                    class="btn btn-sm btn-success"
                    color="secondary"
                    onClick={async () => {
                        console.log(params.row._id);
                        const res = await fetch(
                            "http://localhost:5000/api/generaluser/likeevent",
                            {
                                method: "POST",
                                // credentials: 'include',
                                headers: {
                                    "Content-Type": "application/json",
                                    "auth-token": localStorage.getItem("token"),
                                },
                                body: JSON.stringify({
                                    eventID: params.row._id,
                                }), // replace '123' with the actual event ID
                            }
                        );
                        const json = await res.json();
                        console.log(json.id);
                        setJsonText(json.id);
                        window.location.reload();
                    }}
                >
                    {jsonText}
                </div>
            ),
        },
        {
            field: "like",
            headerName: "LikeCount",
            width: 100,
        },
    ];

    const handleClose = () => {
        setOpen(false);
    };

    // for(let i=0;i<events.length;i++)
    // {
    //     return (
    //         <EventCard data={events[i]}/>
    //     )
    // }

    // const helloWorldArray = Array.from({ length: 100 }, () => "hello world");

    return (
        <div class="container">
            {/* {helloWorldArray.map((item, index) => (
                <p key={index}>{item}</p>
            ))} */}

            {!localStorage.getItem("token") ? (
                <div>
                    You are not authorised to access the page. Login/Signup and
                    then try again.
                </div>
            ) : (
                <div>
                    {/* <h2>Home</h2> */}
                    <h1 style={{ textAlign: "center", color: "#0047AB" }}>
                        <Link
                            style={{ color: "#0047AB", textDecoration: "none" }}
                            to="/dashboard"
                        >
                            Profile
                        </Link>
                    </h1>
                    <div className="row my-3">
                        <h2 style={{ textAlign: "center" }}>All Events</h2>
                        <div className="container mx-2">
                            {events.length === 0 && "No notes to display"}
                        </div>
                    </div>
                    <div style={{ width: "100%" }}>
                        <DataGrid
                            className={classes.root}
                            getRowHeight={() => 60}
                            rows={events}
                            columns={columns}
                            pageSize={100}
                            getRowId={(row) => generateRandom()}
                            components={{
                                Toolbar: GridToolbar,
                                Pagination: CustomPagination,
                            }}
                            autoHeight={true}
                            autoWidth={true}
                            showCellRightBorder={true}
                            sx={{
                                fontSize: 16,
                                borderRadius: 2,
                                border: 1,
                                borderTop: 1,
                                borderBottom: 1,
                                color: "black",
                                borderColor: "black",
                                "& .MuiDataGrid-row": {
                                    border: 1,
                                },
                                "& .MuiDataGrid-columnHeaders": {
                                    border: 1,
                                    borderTop: 2,
                                    borderBottom: 1,
                                    borderRadius: 0,
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    border: 0,
                                },
                                "& .MuiTablePagination-selectLabel": {
                                    color: "black",
                                },
                                "& .MuiSelect-select": {
                                    color: "black",
                                },
                                "& .MuiTablePagination-displayedRows": {
                                    color: "black",
                                },
                                "& .MuiSvgIcon-root": {
                                    color: "black",
                                },
                            }}
                        />
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        maxWidth="lg"
                        PaperProps={{
                            style: { width: "60%", maxHeight: "90%" },
                        }}
                    >
                        <DialogTitle>{popupData.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                <div>
                                    <strong>Description:</strong>{" "}
                                    {popupData.description}
                                </div>
                                <span className="text-muted">
                                    <div>
                                        <strong>Start Time:</strong>{" "}
                                        {moment(popupData.startTime).format(
                                            "MMM Do YYYY, h:mm a"
                                        )}
                                    </div>
                                    <div>
                                        <strong>End Time:</strong>{" "}
                                        {moment(popupData.endTime).format(
                                            "MMM Do YYYY, h:mm a"
                                        )}
                                    </div>
                                </span>
                                <div>
                                    <strong>Image URL:</strong>
                                    {popupData.image}
                                </div>
                                {/* <div><strong>Organiser:</strong> {popupData.organiser}</div> */}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </div>
    );
};

export default Home;
