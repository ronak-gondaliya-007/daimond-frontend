import React from "react";
import "../../../assets/css/delete.css";

const DeletePopup = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h3>Confirm Deletion</h3>
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                <div className="popup-actions">
                    <button className="cancel-button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="delete-button">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePopup;
