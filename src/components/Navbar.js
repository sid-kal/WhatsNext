import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from '@mui/icons-material/LightMode';
const Navbar = ({ theme, action }) => {
    let location = useLocation();
    let history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("token");
        history.replace("/");
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbarcolour">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    WhatsNext
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/home"
                                        ? "active"
                                        : ""
                                }`}
                                aria-current="page"
                                to="/home"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/about"
                                        ? "active"
                                        : ""
                                }`}
                                to="/about"
                            >
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    location.pathname === "/dashboard"
                                        ? "active"
                                        : ""
                                }`}
                                aria-current="page"
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    {!localStorage.getItem("token") ? (
                        <div className="d-flex">
                            <Link
                                className="btn btn-primary mx-1"
                                to="/login"
                                role="button"
                                style={{}}
                            >
                                Login
                            </Link>
                            <Link
                                className="btn btn-primary mx-1"
                                to="/signup"
                                role="button"
                            >
                                Signup
                            </Link>
                            <div  onClick={action} style={{display:"flex", alignItems: "center" ,background: "#0a1929", padding: "4px", borderRadius: "7px"}}>
                            {theme ? (
                                <DarkModeIcon
                                color="action"
                                sx={{ color: "white" }}
                                />
                                ) : (
                                    <LightModeIcon
                                    color="action"
                                    sx={{ color: "white" }}
                                    />
                                    )}
                            </div>
                        </div>
                    ) : (
                        <>
                            <button
                                className="btn btn-primary mx-1"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                            <div  onClick={action} style={{display:"flex", alignItems: "center" ,background: "#0a1929", padding: "4px", borderRadius: "7px", width:"30px", margin: "3px"}}>
                            {theme ? (
                                <DarkModeIcon
                                color="action"
                                sx={{ color: "white" }}
                                />
                                ) : (
                                    <LightModeIcon
                                    color="action"
                                    sx={{ color: "white" }}
                                    />
                                    )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
