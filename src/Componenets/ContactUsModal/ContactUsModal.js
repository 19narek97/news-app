import React from 'react';

const ContactUsModal = ({isOpen, onClose, handelChange,sendContactUs,errorMsg}) => {

    let display = {
        display: isOpen ? "block" : "none"
    }

    return (
        <div>
            <div className={`modal fade ${isOpen ? 'show' : null}`} id="exampleModal" tabIndex="-1"
                 style={{...display}} role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div style={{backgroundColor: "#087afc", color: "white"}} className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Contact Us</h5>
                            <button style={{cursor: "pointer"}} onClick={() => onClose()} type="button"
                                    className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {errorMsg ? <div className="alert alert-danger" role="alert">
                                {errorMsg}
                            </div> : null}
                            <input onChange={handelChange} type="text" id="name" className="form-control" placeholder="Name"
                                   aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <input onChange={handelChange} type="text" id="email" className="form-control mt-3" placeholder="Email"
                                   aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                            <textarea onChange={handelChange} id="message" placeholder="Message" className="form-control mt-3" aria-label="With textarea"/>
                        </div>
                        <div className="modal-footer">
                            <button style={{cursor: "pointer"}} onClick={() => onClose()} type="button"
                                    className="btn btn-danger">Cancel
                            </button>
                            <button style={{cursor: "pointer"}} onClick={() => sendContactUs()} type="button"
                                    className="btn btn-primary">Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ContactUsModal;