import headerStyle from "../styles/header.module.css";
import { Link } from "react-router-dom";
import { useAppContext } from "../GlobalStateData";

function Header() {
    let { email, setEmail } = useAppContext();

    return (
        <>
            <div className={headerStyle.header}>
                <div className={headerStyle.leftContainer}>
                    <li>
                        <Link to={"/"}>Posts</Link>
                    </li>
                    <li>
                        <Link to={"/my-posts"}>My-Posts</Link>
                    </li>
                </div>
                <div className={headerStyle.rightContainer}>
                    <li>
                        <Link
                            to={"/signin"}
                            onClick={() => {
                                if (email !== "") {
                                    setEmail("");
                                    localStorage.setItem("email", "");
                                }
                            }}
                        >
                            {email === "" ? "Sign In" : "Sign Out"}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to={"/signout"}
                            className={email ? headerStyle.displayNone : ""}
                        >
                            Sign Up
                        </Link>
                    </li>
                </div>
            </div>
        </>
    );
}

export default Header;
