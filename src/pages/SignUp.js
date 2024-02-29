import React from "react";
import Header from "../components/Header";
import signInStyle from "../styles/signup.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useAppContext } from "../GlobalStateData";

export default function SignUp() {
    let [userEmail, setUserEmail] = useState("");
    let [userName, setUserName] = useState("");
    let [userPassword, setUserPassword] = useState("");
    let { users, setUsers } = useAppContext();
    let navigate = useNavigate();

    function goToSignInPage() {
        navigate("/signin");
    }

    function SignUp() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (userEmail === "" || userPassword === "" || userName === "") {
            NotificationManager.warning("Please fill the complete details...");
        } else {
            if (userName.length < 3) {
                NotificationManager.warning(
                    "Name lenght should be greater than 3..."
                );
            } else if (!/^[a-zA-Z]+$/.test(userName)) {
                NotificationManager.warning(
                    "Name should not have a number or special Character... "
                );
            } else if (!emailRegex.test(userEmail)) {
                NotificationManager.warning(
                    "Please enter a valid email address..."
                );
            } else if (userPassword.length <= 6) {
                NotificationManager.warning(
                    "Password should be greater than 6 digits..."
                );
            } else {
                for (let i = 0; i < users.length; i++) {
                    if (users[i].email === userEmail) {
                        NotificationManager.warning("User already Exists...");
                        return;
                    }
                }
                let userId = users.length + 1;
                let newUser = {
                    name: userName,
                    email: userEmail,
                    password: userPassword,
                    userId: userId,
                };
                let newData = [...users, newUser];
                setUsers(newData);
                localStorage.setItem("users", JSON.stringify(newData));
                setUserEmail("");
                setUserName("");
                setUserPassword("");
                navigate("/signin");
            }
        }
    }

    return (
        <div>
            <NotificationContainer></NotificationContainer>
            <Header></Header>
            <div className={signInStyle.container}>
                <form
                    className={signInStyle.innerContainer}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <label>Sign Up</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                        }}
                    ></input>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userEmail}
                        onChange={(e) => {
                            setUserEmail(e.target.value);
                        }}
                    ></input>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userPassword}
                        onChange={(e) => {
                            setUserPassword(e.target.value);
                        }}
                    ></input>
                    <button onClick={() => SignUp()}>Sign Up</button>
                </form>
            </div>
            <div className={signInStyle.lowerContainer}>
                <button onClick={() => goToSignInPage()}>
                    SignIn if you have an account!
                </button>
            </div>
        </div>
    );
}
