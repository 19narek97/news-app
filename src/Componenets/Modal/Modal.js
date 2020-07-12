import React from 'react';

const modal = ({isOpen, onClose, entry}) => {

    let display = {
        display: isOpen ? "block" : "none"
    }

    return (
        <div>
            {
                entry.title ?
                    <div className={`modal fade ${isOpen ? 'show' : null}`} id="exampleModal" tabIndex="-1"
                         style={{...display}} role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div style={{backgroundColor: "#087afc", color: "white"}} className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{entry.title}</h5>
                                    <button style={{cursor: "pointer"}} onClick={() => onClose()} type="button"
                                            className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <img width="150px" height="200px" className="card-img-top"
                                         src={entry.urlToImage ? entry.urlToImage : "https://image.shutterstock.com/image-vector/no-image-available-sign-absence-260nw-373243873.jpg"}
                                         alt="asd"/>
                                    <span className="float-right mt-1"><strong>Author:</strong><a target="_blank"
                                                                                                  href={entry.url}>{entry.author}</a></span>

                                    {
                                        entry.description ?
                                            <>
                                                <h3 align="center" className="mt-5">Description</h3>
                                                <p className="card-text">{entry.description}</p>
                                            </> : null
                                    }
                                    {
                                        entry.content ?
                                            <>
                                                <h3 align="center" className="mt-5">Content</h3>
                                                <p className="card-text">{entry.content}</p>
                                            </> : null
                                    }
                                    <span
                                        className="float-right mt-1"><strong>Published At:</strong> {entry.publishedAt}</span>
                                </div>
                                <div className="modal-footer">
                                    <button style={{cursor: "pointer"}} onClick={() => onClose()} type="button"
                                            className="btn btn-primary">Okay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : null
            }

        </div>
    )
}

export default modal;