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
                    <div className="rows-detail">
                        <div className="item-detail">
                            <div className="key">Diamond name</div>
                            <div className="value">{item.name}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">ID</div>
                            <div className="value">{item.id}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">Carat</div>
                            <div className="value">{item.carat}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">Color</div>
                            <div className="value">{item.color}</div>
                        </div>
                    </div>

                    <div className="rows-detail">
                        <div className="item-detail">
                            <div className="key">Clarity</div>
                            <div className="value">{item.clarity}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">Polish</div>
                            <div className="value">{item.polish}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">Symmetry</div>
                            <div className="value">{item.symmetry}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">Depth</div>
                            <div className="value">{item.depth}</div>
                        </div>
                    </div>

                    <div className="rows-detail">
                        <div className="item-detail">
                            <div className="key">Fluorescence</div>
                            <div className="value">{item.fluorescence}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">Table</div>
                            <div className="value">{item.table}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">Ratio</div>
                            <div className="value">{item.ratio}</div>
                        </div>
                        <div className="item-detail">
                            <div className="key">Certificate No</div>
                            <div className="value">{item.certificateNo}</div>
                        </div>
                    </div>

                    {item.images && item.images.length > 0 && (
                        <div className="popup-images">
                            <div className="key">Images</div>
                            <div className="value">
                                {item.images.map((img, index) => (
                                    <img key={index} src={img} alt={`diamond-img-${index}`} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="remark-detail">
                        <div className="remark-key">Remark</div>
                        <div className="remark-value">{item.remark}</div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DetailPopup;
