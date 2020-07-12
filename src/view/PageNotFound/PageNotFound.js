import React from "react";
import classes from "./PageNotFound.module.css"
import {Link} from "react-router-dom"

export default function PageNotFound(props) {
    return (
        <div id={classes["notfound"]}>
            <div className={classes["notfound"]}>
                <div className={classes["notfound-404"]}>
                    <h1>404</h1>
                </div>
                <h2>Oops! This Page Could Not Be Found</h2>
                <p>Sorry but the page you are looking for does not exist.</p>
                <Link to="/">Go To Homepage</Link>
            </div>
        </div>

    )
}