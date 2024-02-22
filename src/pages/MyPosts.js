import React, { useState } from "react";
import Header from "../components/Header";
import { useAppContext } from "../GlobalStateData";
import Posts from "../components/Posts";
import myPostsStyle from "../styles/myposts.module.css";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

export default function MyPosts() {
    let [newTitle, setNewTitle] = useState("");
    let [newBody, setNewBody] = useState("");
    let [showNewPost, setShowNewPost] = useState(false);
    let { email, posts, users, setPosts } = useAppContext();
    let userId;
    let userName = "";
    let postsComponent;
    let filterPostsData = [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            userId = users[i].userId;
            userName = users[i].name;
            userName = "Welcome Mr." + userName;
            break;
        }
    }

    function uploadPost() {
        if (newTitle === "" || newBody === "") {
            NotificationManager.warning("Please fill the details!");
            return;
        }
        let lastIndex = posts.length - 1;
        let oldPost = [...posts];
        let lastId = oldPost[lastIndex].id;
        let newObj = {
            body: newBody,
            title: newTitle,
            userId: userId,
            id: lastId + 1,
        };
        let newPosts = [...oldPost, newObj];
        setPosts(newPosts);
        localStorage.setItem("posts", JSON.stringify(newPosts));
        NotificationManager.success("New Post is Uploaded...");
        setNewTitle("");
        setNewBody("");
    }

    filterPostsData = posts.filter((obj) => obj.userId === userId);
    postsComponent = filterPostsData.map((obj, index) => {
        return (
            <Posts
                title={obj.title}
                body={obj.body}
                id={obj.id}
                key={index}
                modify={true}
            ></Posts>
        );
    });

    return (
        <div>
            <NotificationContainer></NotificationContainer>
            <Header></Header>
            <div className={myPostsStyle.showName}>{userName}</div>
            {email === "" ? (
                ""
            ) : (
                <div className={myPostsStyle.container}>
                    <button onClick={() => setShowNewPost(!showNewPost)}>
                        Create New Post
                    </button>
                    {showNewPost ? (
                        <div className={myPostsStyle.innerContainer}>
                            <input
                                type="text"
                                placeholder="Write your Title..."
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                            ></input>

                            <textarea
                                placeholder="Write your Post..."
                                value={newBody}
                                onChange={(e) => setNewBody(e.target.value)}
                            ></textarea>
                            <button onClick={() => uploadPost()}>
                                Upload Post
                            </button>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            )}
            {email === "" ? (
                <div className={myPostsStyle.showMessage}>
                    Please Sign In first...
                </div>
            ) : (
                postsComponent
            )}
        </div>
    );
}
