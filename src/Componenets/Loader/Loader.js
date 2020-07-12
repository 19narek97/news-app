import React from 'react';
import classes from "./Loader.module.css";

function Loader() {
    return (
        <div className={`${classes["loader"]} ${classes["center"]} col-sm-12`}>
            <i className="fa fa-cog fa-spin" />
        </div>
    );
}

export default Loader;
