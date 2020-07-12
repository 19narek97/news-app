import React from "react";
import classes from "./Card.module.css";

export default function Card(props) {
    const {urlToImage,title,description,author} = props.article;
    return (
        <div key={Math.random()} className={`${classes["cardStyle"]} card ml-4 `} style={{width:'18rem',height:"30rem"}}>
            <img width="150px" height="200px" className="card-img-top" src={urlToImage ? urlToImage : "https://image.shutterstock.com/image-vector/no-image-available-sign-absence-260nw-373243873.jpg"} alt="asd"/>
                <div style={{display:"grid"}} className="card-body">
                    <h5 className="card-title">{title && title.length > 50 ? title.slice(0,50) + "..." : title}</h5>
                    <p className={`${classes["card-text"]}`}>{description && description.length > 50 ? description.slice(0,50) + "..." : description}</p>
                    <p><strong>Author:</strong> {author}</p>
                </div>
            <button onClick={() => props.onOpenModal(props.article)}  className={`${classes["btnRead"]} btn btn-primary`}>Read</button>
        </div>
    )
}