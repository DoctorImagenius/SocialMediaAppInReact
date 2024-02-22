import postStyle from "../styles/posts.module.css";
import { useAppContext } from "../GlobalStateData";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useState } from "react";
import Comments from "./Comments";

export default function Posts({ title, body, id, modify = false }) {
    let { posts, setPosts, comments, email, setComments, users } =
        useAppContext();
    let [showComments, setShowComments] = useState(false);
    let [myComment, setMyComment] = useState("");
    let commentComponents = [];

    function del() {
        NotificationManager.success("Deleted...");
        let afterDeletePosts = posts.filter((obj) => obj.id !== id);
        setPosts(afterDeletePosts);
        localStorage.setItem("posts", JSON.stringify(afterDeletePosts));
    }

    function editComment() {
        let newTitle = prompt("Enter New Title please...");
        let newBody = prompt("Enter Your Post Here...");
        if (newBody === "" && newTitle === "") {
            NotificationManager.info("No Change...");
            return;
        }
        let editbleObj = posts.filter((obj) => obj.id === id);
        let newObj = editbleObj[0];
        if (newTitle) {
            newObj.title = newTitle;
        }
        if (newBody) {
            newObj.body = newBody;
        }

        let newPosts = [...posts];
        const objectIndex = newPosts.findIndex((obj) => obj.id === id);
        newPosts[objectIndex] = newObj;
        setPosts(newPosts);
        localStorage.setItem("posts", JSON.stringify(posts));
        NotificationManager.success("Updated Successfully...");
    }

    function submitComment() {
        if (myComment === "") {
            NotificationManager.error("Wwrite something in the comment Box!");
            return;
        }
        let lastIndex = comments.length - 1;
        let commentId = comments[lastIndex].id;
        commentId = commentId + 1;
        let userName = "";
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                userName = users[i].name;
                break;
            }
        }
        console.log(myComment, email, commentId, userName, id);
        let commentObj = {
            body: myComment,
            email: email,
            id: commentId,
            name: userName,
            postId: id,
        };
        let newComments = [...comments, commentObj];
        setComments(newComments);
        localStorage.setItem("comments", JSON.stringify(newComments));
        setMyComment("");
    }

    if (comments) {
        let myComments = comments.filter((obj) => obj.postId === id);
        commentComponents = myComments.map((obj) => {
            return (
                <Comments
                    comment={obj.body}
                    key={obj.id}
                    name={obj.name}
                    id={obj.id}
                    objEmail={obj.email}
                ></Comments>
            );
        });
    }

    return (
        <div>
            <NotificationContainer></NotificationContainer>
            <div className={postStyle.container}>
                <div className={postStyle.containerTitle}>
                    {modify ? (
                        <button onClick={() => editComment()}>Edit</button>
                    ) : (
                        ""
                    )}
                    <div>{title}</div>
                    {modify ? (
                        <button onClick={() => del()}>Delete</button>
                    ) : (
                        ""
                    )}
                </div>
                <div className={postStyle.containerBody}>{body}</div>
                <button
                    onClick={() => {
                        setShowComments(!showComments);
                    }}
                >
                    {showComments ? "Hide Comments" : "Show Comments"}
                </button>
                {showComments ? (
                    <div>
                        {commentComponents[0] ? (
                            commentComponents
                        ) : (
                            <Comments
                                name={"This post have no comment yet!"}
                                key={1000}
                            ></Comments>
                        )}
                        {email === "" ? (
                            ""
                        ) : (
                            <div className={postStyle.innerContainer}>
                                <input
                                    type="text"
                                    placeholder="Write your Comment"
                                    value={myComment}
                                    onChange={(e) =>
                                        setMyComment(e.target.value)
                                    }
                                ></input>
                                <button onClick={() => submitComment()}>
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
