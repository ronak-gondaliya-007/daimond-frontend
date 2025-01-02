import React from "react";
import "../../../assets/css/popup.css";

import { diamondDetail } from "../../../constant";

const DetailPopup = ({ data, onClose }) => {
    const item = diamondDetail;
    if (!data) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={onClose}>
                    &times;
                </button>
                <h2>Detail</h2>
                <div className="popup-details">
                    <p><strong>Name:</strong> {item.name}</p>
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
                    {/* Render images if available */}
                    {item.images && item.images.length > 0 && (
                        <div className="popup-images">
                            {item.images.map((img, index) => (
                                <img key={index} src={img} alt={`diamond-img-${index}`} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPopup;
