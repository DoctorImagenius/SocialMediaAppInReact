import React from "react";
import ReactDOM from "react-dom/client";
import indexStyle from "./styles/index.module.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProvider } from "./GlobalStateData";
import MyPosts from "./pages/MyPosts";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
const route = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "/my-posts",
        element: <MyPosts></MyPosts>,
    },
    {
        path: "/signin",
        element: <SignIn></SignIn>,
    },
    {
        path: "/signout",
        element: <SignUp></SignUp>,
    },
    {
        path: "/*",
        element: (
            <div className={indexStyle.Container}>
                <Header></Header>
                <div className={indexStyle.bgRed}>Error 404</div>
            </div>
        ),
    },
]);

root.render(
    <React.StrictMode>
        <AppProvider>
            <RouterProvider router={route}>
                <Home></Home>
            </RouterProvider>
        </AppProvider>
    </React.StrictMode>
);
