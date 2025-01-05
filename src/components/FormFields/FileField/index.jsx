import React, { useState } from 'react';
import deleteIcon from 'assets/images/delete.svg';
import addIcon from 'assets/images/add.svg';

function FileField() {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const newImages = [...images];
        newImages.push(URL.createObjectURL(e.target.files[0]));
        setImages(newImages);
    };

    const handleImageRemove = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    return (
        <div className="diamond-images">
            <h2>Diamond Images</h2>
            <div className="image-container">
                {images.map((image, index) => (
                    <div className="image-item" key={index}>
                        <img src={image} alt={`Diamond Image ${index + 1}`} />
                        <button onClick={() => handleImageRemove(index)}>
                            <img src={deleteIcon} alt="Delete" />
                        </button>
                    </div>
                ))}
                <label htmlFor="image-upload" className="add-image-button">
                    <img src={addIcon} alt="Add Image" />
                </label>
            </div>
            <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
            />
        </div>
    );
}

export default FileField;