import React from "react";
import { useAppContext } from "../GlobalStateData";
import Header from "../components/Header";
import Posts from "../components/Posts";

export default function Home() {
    let { posts } = useAppContext();
    let postsComponents;

    postsComponents = posts.map((obj, index) => {
        return (
            <Posts
                title={obj.title}
                body={obj.body}
                id={obj.id}
                key={index}
            ></Posts>
        );
    });

    return (
        <div>
            <Header></Header>
            {postsComponents}
        </div>
    );
}
