import React from 'react';

interface IModalProps {
    modalTitle: string,
    submitTitle: string,
    onModalClose: () => void,
    onModalSubmit: () => void,
    onDeleteZone?: () => void
}

const Modal: React.FC<IModalProps> = (props) => {
    const {modalTitle, onModalClose, children, onModalSubmit, submitTitle, onDeleteZone} = props;
    return (
        <>
            <div
                className='background'
                onClick={onModalClose}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    zIndex: 100,
                    left: 0,
                    top: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                }}
            />
            <div className="modal" id="exampleModal" aria-labelledby="exampleModalLabel"
                 style={{display: "block", height: '25rem'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{modalTitle}</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    onClick={onModalClose}/>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                    onClick={onModalClose}>Close
                            </button>
                            {onDeleteZone ? <button type="button" className="btn btn-danger"
                                                    onClick={onDeleteZone}>Delete</button> : null}
                            <button type="button" className="btn btn-primary"
                                    onClick={onModalSubmit}>{submitTitle}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export {Modal}