import React from "react";
import Header from "../components/Header";
import signInStyle from "../styles/signup.module.css";
import { useState } from "react";
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

    function SignUp() {
        if (userEmail === "" && userPassword === "") {
            NotificationManager.warning("Please fill the details...");
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
            NotificationManager.success("Sign Up Successfully...");
            setUserEmail("");
            setUserName("");
            setUserPassword("");
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
        </div>
    );
}
