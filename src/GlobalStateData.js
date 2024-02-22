import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState("");
    const [comments, setComments] = useState([]);
    const [count] = useState(0);

    useEffect(() => {
        const localStoragePosts = localStorage.getItem("posts");
        const localStorageUsers = localStorage.getItem("users");
        const localStorageEmail = localStorage.getItem("email");
        const localStorageComments = localStorage.getItem("comments");

        if (localStoragePosts && localStorageUsers) {
            setPosts(JSON.parse(localStoragePosts));
            setUsers(JSON.parse(localStorageUsers));
            setEmail(localStorageEmail);
            setComments(JSON.parse(localStorageComments));
        } else {
            const fetchData = async () => {
                let postsApi = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );
                postsApi = await postsApi.json();
                setPosts(postsApi);
                let randomeUsers = [
                    {
                        name: "Haroon",
                        email: "first@gmail.com",
                        password: "1001",
                        userId: 1,
                    },
                    {
                        name: "Hassan",
                        email: "second@gmail.com",
                        password: "1002",
                        userId: 2,
                    },
                    {
                        name: "Ans",
                        email: "third@gmail.com",
                        password: "1003",
                        userId: 3,
                    },
                ];
                setUsers(randomeUsers);
                setEmail("");
                localStorage.setItem("posts", JSON.stringify(postsApi));
                localStorage.setItem("users", JSON.stringify(randomeUsers));
                localStorage.setItem("email", "");
                let newComment = [...comments];
                for (let i = 0; i < postsApi.length; i++) {
                    const id = i + 1;
                    const commentsApi = await fetch(
                        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
                    );
                    const commentsJson = await commentsApi.json();
                    newComment.push(...commentsJson);
                    localStorage.setItem(
                        "comments",
                        JSON.stringify(newComment)
                    );
                    setComments(newComment);
                }
            };
            fetchData();
        }
    }, [count]);

    return (
        <AppContext.Provider
            value={{
                posts,
                setPosts,
                users,
                setUsers,
                email,
                setEmail,
                comments,
                setComments,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
