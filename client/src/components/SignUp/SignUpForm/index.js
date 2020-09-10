import React, { useState, useEffect } from "react";
import './style.css'
import { useHistory } from "react-router-dom";
import API from "../../../utils/API";

function SignUpForm() {
    const [email, setEmail] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [password, setPassword] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState([]);
    const redirect = useHistory();

    // START Error States ——————————————————————————|
    const [emailError, setEmailError] = useState(false);
    

    const emailValidator = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        ) {
            setEmailError(false);
        } else {
            setEmailError(true);
        }
    }


    // END Error States ——————————————————————————|

    const signupEmailValue = (event) => {
        setEmail(event.target.value);
    };

    const signupFirstNameValue = (event) => {
        setFirstName(event.target.value);
    };

    const signupLastNameValue = (event) => {
        setLastName(event.target.value);
    };

    const signupPasswordValue = (event) => {
        setPassword(event.target.value);
    };

    const signupConfirmPasswordValue = (event) => {
        setConfirmPassword(event.target.value);
    };

    const submitUserSignup = (event) => {
        event.preventDefault();
        // Email Validation
        emailValidator()
        if (emailError) {
            return;
        }
        const userInfo = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password
        };

        //request to server to add a new email/password
        API.signup(userInfo)
            .then((response) => {
                console.log(response);
                if (!response.data.errmsg) {
                    console.log("successful signup");
                    //home for now
                    redirect.push("/add-vehicle")
                } else {
                    console.log("email already taken");
                }
            })
            .catch((error) => {
                console.log("signup error: ");
                console.log(error);
            });
    };

    return (
        <div className="g__form-container">
            <form>
                <h2 className="g__form-title">Sign Up</h2>
                {emailError ? <p className="text-center text-danger">Please make sure your email is formatted correctly.</p> : null}
                <div className="g__label-group">
                    <label className="form-label" htmlFor="firstName">First Name</label>
                    <input
                        className="form-input"
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Jane"
                        value={firstName}
                        onChange={signupFirstNameValue}
                    />
                </div>
                <div className="g__label-group">
                    <label className="form-label" htmlFor="lastName">Last Name</label>
                    <input
                        className="form-input"
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Smith"
                        value={lastName}
                        onChange={signupLastNameValue}
                    />
                </div>
                <hr className="g__form-divider" />
                <div className="g__label-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        className={`form-input ${emailError ? "g__form-input-err" : null}`}
                        type="text"
                        id="email"
                        name="email"
                        placeholder="you@email.com"
                        value={email}
                        onChange={signupEmailValue}
                    />
                </div>
                <div className="g__label-group">
                    <label className="form-label" htmlFor="password">
                        Password
                        </label>
                    <input
                        className="form-input"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={signupPasswordValue}
                    />
                </div>
                <div className="g__label-group">
                    <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                        </label>
                    <input
                        className="form-input"
                        type="password"
                        placeholder="retype password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={signupConfirmPasswordValue}
                    />
                </div>

                <button className="btn g__form-submit-btn" onClick={submitUserSignup} type="submit"
                >Create Account</button>

            </form>
        </div>
    );
}

export default SignUpForm;