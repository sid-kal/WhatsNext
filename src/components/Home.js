import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/styles";
import Pagination from "@mui/material/Pagination";
import moment from "moment";

import Carousel from "./Carousel.js";



import {
    gridPageCountSelector,
    gridPageSelector,
    useGridApiContext,
    useGridSelector,
} from "@mui/x-data-grid";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

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
    },
});

const Home = ({ theme }) => {
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
    const [special, setSpecial] = useState([
        {
            isspecial: false
        }
    ]);

    const [open, setOpen] = useState(false);
    const [popupData, setPopupData] = useState({});
    const [gridkey, setGridkey] = useState(false);
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
            setSpecial(json.events);
            // console.log(json.len);
        };
        autorun();
    }, [gridkey]);
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

    const RenderAbstractConfirmButton = ({ eventID }) => {
        const [likeData, setLikeData] = useState(null);

        useEffect(() => {
            const fetchData = async () => {
                const res = await fetch(
                    "http://localhost:5000/api/generaluser/checkforlikeevent",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": localStorage.getItem("token"),
                        },
                        body: JSON.stringify({
                            eventID: eventID,
                        }),
                    }
                );
                const json = await res.json();
                setLikeData(json);
            };
            fetchData();
        }, [eventID]);

        const handleLike = async () => {
            await fetch("http://localhost:5000/api/generaluser/likeevent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    eventID: eventID,
                }),
            });
            setGridkey(!gridkey);
        };

        if (!likeData) {
            return <div>Loading...</div>;
        }

        const { found } = likeData;
        return (
            <Button onClick={handleLike}>
                {found ? (
                    <ThumbUpAltIcon color="blue" />
                ) : (
                    <ThumbUpOffAltIcon />
                )}
            </Button>
        );
    };

    const columns = [
        { field: "title", headerName: "Title", width: "200" },
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
                        // console.log(params.row);
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
            width: 108,
            renderCell: (params) => (
                <RenderAbstractConfirmButton eventID={params.row._id} />
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

    const getRowSpacing = React.useCallback(() => {
        return {
            top: 20,
            bottom: 20,
        };
    }, []);

    const style = {marginTop: "3vh"};

    return (
        <div style={style} className="App">
            <Carousel events={events} special={special} theme={theme}/>
            <div class="container">
                {!localStorage.getItem("token") ? (
                    <div>
                        You are not authorised to access the page. Login/Signup
                        and then try again.
                    </div>
                ) : (
                    <div>
                        {/* <h2>Home</h2> */}
                        <h1 style={{ textAlign: "center", color: "#0047AB" , marginTop: "3vh"}}>
                            <Link
                                style={{
                                    color: "#0047AB",
                                    textDecoration: "none",
                                }}
                                to="/dashboard"
                            >
                                View your Dashboard
                            </Link>
                        </h1>
                        <div className="row my-3">
                            <h2 style={{ textAlign: "center", color: "white" }}>
                                All Events
                            </h2>
                            <div className="container mx-2">
                                {events.length === 0 && "No notes to display"}
                            </div>
                        </div>
                        <div style={{ width: "100%" }}>
                            <DataGrid
                                style={{ marginBottom: "10vh" }}
                                key={gridkey}
                                className={classes.root}
                                getRowHeight={() => 60}
                                disableSelectionOnClick
                                // disableColumnFilter
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
                                getRowClassName={() =>
                                    theme ? "data-grid-row" : "data-grid-row2"
                                }
                                sx={{
                                    fontSize: 16,
                                    borderRadius: 0,
                                    border: 0,
                                    borderTop: 0,
                                    borderBottom: 0,
                                    color: theme ? "white" : "black",
                                    borderColor: "black",
                                    "& .MuiDataGrid-row": {
                                        backgroundColor:
                                            theme == 0 ? "#75C8FF" : "#001e3c",
                                        borderRadius: "2vh",
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-row:hover": {
                                        background:
                                            theme == 0 ? "#75C8FF" : "#001e3c",
                                        borderRadius: "2vh",
                                    },
                                    "& .MuiDataGrid-root": {
                                        borderBottom: "none",
                                    },
                                    "& .MuiDataGrid-columnHeaders": {
                                        border: 0,
                                        borderTop: 0,
                                        borderBottom: 0,
                                        borderRadius: "10vh",
                                    },
                                    "& .MuiDataGrid-footerContainer": {
                                        border: 0,
                                        display: "none",
                                    },
                                    "& .MuiTablePagination-selectLabel": {
                                        color: "black",
                                    },
                                    "& .MuiSelect-select": {
                                        color: "black",
                                    },
                                }}
                                getRowSpacing={getRowSpacing}
                                // rowSpacingType="border"
                            />
                        </div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            maxWidth="lg"
                            PaperProps={{
                                style: {
                                    width: "60%",
                                    maxHeight: "90%",
                                    background: theme ? "#001e3c" : "",
                                    color: theme ? "white" : "",
                                },
                            }}
                        >
                            <DialogTitle>{popupData.title}</DialogTitle>
                            <DialogContent>
                                <DialogContentText
                                    style={{ color: theme ? "white" : "" }}
                                >
                                    <div>
                                        <strong>Description: </strong>{" "}
                                        {popupData.description}
                                    </div>
                                    <span className="text-muted">
                                        <div>
                                            <strong>Start Time: </strong>{" "}
                                            {moment(popupData.startTime).format(
                                                "MMM Do YYYY, h:mm a"
                                            )}
                                        </div>
                                        <div>
                                            <strong>End Time: </strong>{" "}
                                            {moment(popupData.endTime).format(
                                                "MMM Do YYYY, h:mm a"
                                            )}
                                        </div>
                                    </span>
                                    <div>
                                        <strong>Image URL: </strong>
                                        <a href={popupData.image}>
                                            {popupData.image}
                                        </a>
                                    </div>
                                    <div>
                                        <strong>Organiser: </strong>{" "}
                                        {popupData.organiser}
                                    </div>
                                    <div>
                                        <strong>Location: </strong>{" "}
                                        {popupData.venue}
                                    </div>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Close</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
