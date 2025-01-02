import React from "react";
import "../../../assets/css/popup.css";

import { diamondDetail } from "../../../constant";
import closeIcon from "../../../assets/images/close.svg";

const DetailPopup = ({ data, onClose }) => {
    const item = diamondDetail;
    if (!data) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-header">
                    <h2>Details</h2>
                    <button className="popup-close">
                        <img src={closeIcon} alt="Close Icon" onClick={onClose} />
                    </button>
                </div>
                <div className="popup-details">
                    <p><strong>Diamond name and Id:</strong> {item['Diamond name and Id']}</p>
                    <p><strong>ID:</strong> {item.id}</p>
                    <p><strong>Carat:</strong> {item.carat}</p>
                    <p><strong>Color:</strong> {item.color}</p>

                    <p><strong>Clarity:</strong> {item.clarity}</p>
                    <p><strong>Polish:</strong> {item.polish}</p>
                    <p><strong>Symmetry:</strong> {item.symmetry}</p>
                    <p><strong>Depth:</strong> {item.depth}</p>

                    <p><strong>Fluorescence:</strong> {item.fluorescence}</p>
                    <p><strong>Table:</strong> {item.table}</p>
                    <p><strong>Ratio:</strong> {item.ratio}</p>
                    <p><strong>Certificate No:</strong> {item.certificateNo}</p>

                    {item.images && item.images.length > 0 && (
                        <div className="popup-images">
                            {item.images.map((img, index) => (
                                <img key={index} src={img} alt={`diamond-img-${index}`} />
                            ))}
                        </div>
                    )}

                    <p><strong>Remark:</strong> {item.remark}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailPopup;
