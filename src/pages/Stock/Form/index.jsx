import React, { useState } from 'react';
import Sidebar from 'components/layout/sidebar/Sidebar';
import Navbar from 'components/navbar'; 
import 'assets/css/form.css';
import InputField from 'components/FormFields/InputField';
import TextAreaField from 'components/FormFields/TextAreaField';
import FileField from 'components/FormFields/FileField';

const StockForm = ({ data }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState(null);

    const inputFields = [
        { id: 'diamond-name-id', label: 'Diamond name and Id' },
        { id: 'refno', label: 'RefNo' },
        { id: 'carat', label: 'Carat' },
        { id: 'color', label: 'Color' },
        { id: 'shape', label: 'Shape' },
        { id: 'size', label: 'Size' },
        { id: 'clarity', label: 'Clarity' },
        { id: 'polish', label: 'Polish' },
        { id: 'symmetry', label: 'Symmetry' },
        { id: 'fl', label: 'FL' },
        { id: 'depth', label: 'Depth' },
        { id: 'table', label: 'Table' },
        { id: 'measurement', label: 'Measurment' },
        { id: 'ratio', label: 'Ratio' },
        { id: 'cart-id', label: 'Cart ID' },
        { id: 'certificate-no', label: 'Certificate No' },
    ];
    const textAreaFields = [{ id: 'remarks', label: 'Remarks' }];
    const imageFields = [{ id: 'images', label: 'Images' }];

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create form data for image upload
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);

        try {
            console.log('Product created successfully!');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    return (
        <div>
            <Sidebar />
            <div className="main-content">
                <Navbar title={'Management'} name={'Stock'} action={'Edit'} />
                <div className="body-content">
                    <form className='form-row' onSubmit={handleSubmit}>
                        {inputFields.map((field, index) => (
                            <InputField id={field.id} label={field.label} />
                        ))}
                        {imageFields.map((field, index) => (
                            <FileField id={field.id} label={field.label} />
                        ))}
                        {textAreaFields.map((field, index) => (
                            <TextAreaField id={field.id} label={field.label} />
                        ))}
                    </form>
                    <div className='form-button'>
                        <button className='reset-button' type="reset">
                            <label htmlFor="Reset">Reset</label>
                        </button>
                        <button className='submit-button' type="submit">
                            <label htmlFor="Reset">Submit</label>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockForm;