import React, { useEffect, useState } from "react";
import commentsStyle from "../styles/comments.module.css";
import { useAppContext } from "../GlobalStateData";

export default function Comments({ comment, name, id, objEmail }) {
    let { email, comments, setComments } = useAppContext();
    let [show, setShow] = useState(false);
    let [edit, setEdit] = useState(false);
    let [editComment, setEditComment] = useState("");

    useEffect(() => {
        if (objEmail === email) {
            setShow(true);
        }
    }, [objEmail, email]);

    function del() {
        let fiteredComments = comments.filter((obj) => obj.id !== id);
        setComments(fiteredComments);
        localStorage.setItem("comments", JSON.stringify(fiteredComments));
    }

    function CompleteEdit() {
        let currentComments = comments.filter((obj) => obj.id === id);
        currentComments = currentComments[0];
        currentComments.body = editComment;
        let commentIndex = comments.findIndex((obj) => obj.id === id);
        let newComments = [...comments];
        newComments[commentIndex] = currentComments;
        setComments(newComments);
        localStorage.setItem("comments", JSON.stringify(newComments));
        setEdit(false);
    }

    return (
        <div className={commentsStyle.container}>
            <h3>{name}</h3>
            <div>{comment}</div>
            {show ? (
                <>
                    <div className={commentsStyle.buttons}>
                        <button
                            onClick={() => {
                                let currentComments = comments.filter(
                                    (obj) => obj.id === id
                                );
                                currentComments = currentComments[0];
                                setEditComment(currentComments.body);
                                setEdit(!edit);
                            }}
                        >
                            Edit Comment
                        </button>
                        <button onClick={() => del()}>Delete Comment</button>
                    </div>
                    {edit ? (
                        <div className={commentsStyle.innerContainer}>
                            <input
                                type="text"
                                value={editComment}
                                onChange={(e) => setEditComment(e.target.value)}
                            ></input>
                            <button onClick={() => CompleteEdit()}>Done</button>
                        </div>
                    ) : (
                        ""
                    )}
                </>
            ) : (
                ""
            )}
        </div>
    );
}
