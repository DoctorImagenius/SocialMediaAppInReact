import React from "react";
import Header from "../components/Header";
import signInStyle from "../styles/signin.module.css";
import { useState } from "react";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useAppContext } from "../GlobalStateData";

export default function SignIn() {
    let [userEmail, setUserEmail] = useState("");
    let [password, setPassword] = useState("");
    let { users, setEmail } = useAppContext();

    function SignIn() {
        if (userEmail === "" && password === "") {
            NotificationManager.warning("Please fill the details...");
        } else {
            for (let i = 0; i < users.length; i++) {
                if (
                    users[i].email === userEmail &&
                    users[i].password === password
                ) {
                    NotificationManager.success("Sign In Successfully...");
                    setUserEmail("");
                    setPassword("");
                    setEmail(userEmail);
                    localStorage.setItem("email", userEmail);
                    return;
                }
                if (
                    users[i].email === userEmail &&
                    users[i].password !== password
                ) {
                    NotificationManager.error("Incorrect Password...");
                    setPassword("");
                    return;
                }
            }
            NotificationManager.warning("User is not Exist...");
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
                    <label>Sign In</label>
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
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    ></input>
                    <button onClick={() => SignIn()}>Sign In</button>
                </form>
            </div>
        </div>
    );
}
