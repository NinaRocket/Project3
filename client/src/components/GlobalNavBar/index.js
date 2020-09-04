import React from "react";
import "./style.css";
import { useHistory } from "react-router-dom";
import { useDriverKickContext } from '../../utils/DriverKickContext';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import LogoTan from "../../images/global/drive-kick-logo-tan.svg";
import LogoDark from "../../images/global/drive-kick-logo-dark.svg";
import { FaPlus } from "react-icons/fa";

function GlobalNavBar() {
    // Context state that changes the nav based on the page being used
    const { navType } = useDriverKickContext();

    // Sets redirects to other pages
    const redirect = useHistory();


    // Home Buttons
    const signUp = () => {
        redirect.push("/signup");
    }
    const login = () => {
        redirect.push("/login")
    }

    // Signup Buttons



    const formVehicleRedirect = () => {
        redirect.push("/add-vehicle")
    }

    const logout = () => {
        // Need to close out session and front end logout. Perhaps handling this through context.
        console.log("Logout btn")
    }


    return (
        <>
            <div className={!navType === "userDash" || "newVehicle" || "vehicleDash" ? null : "g__nav-dashboards"}>
                <Navbar className="container navbar justify-content-between flex-column flex-sm-row ">
                    <Navbar.Brand href="/">
                        {navType === "home" || "notFound" ?
                            <img
                                src={LogoDark}
                                className="d-inline-block align-top"
                                alt="Drive Kick Logo"
                            />
                            :
                            <img
                                src={LogoTan}
                                className="d-inline-block align-top"
                                alt="Drive Kick Logo"
                            />
                        }
                    </Navbar.Brand>
                    <Nav>
                        {/* Home */}
                        {navType === "home" ?
                            <div className="g__nav-btn-group">
                                <button
                                    id="signupBtn"
                                    type="button"
                                    className="btn"
                                    onClick={signUp}
                                >
                                    Get Started
                        </button>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={login}
                                >
                                    Login
                        </button>
                            </div> : null
                        }

                        {/* Sign Up */}
                        {navType === "signup" ?
                            <button type="button" className="btn" onClick={login}>Login</button> : null
                        }

                        {navType === "userDash" ?

                            <div className="g__nav-btn-group">
                                {!navType === "newVehicle" ? <Button className="btn" onClick={formVehicleRedirect}><FaPlus />Add New Vehicle</Button> : null}

                                <button
                                    type="button"
                                    className="btn"
                                    onClick={logout}
                                >
                                    Logout
                        </button>
                            </div> : null
                        }
                    </Nav>
                </Navbar>
            </div>
        </>
    );
}

export default GlobalNavBar;