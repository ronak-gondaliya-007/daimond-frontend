import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

const customStyles = {
    control: (provided) => ({
        ...provided, height: '54px', borderRadius: '8px', backgroundColor: 'rgba(239, 241, 249, 0.6)', border: '1px solid #d1e9ff', fontSize: '14px',
        '&:hover': { borderColor: '#d1e9ff', boxShadow: 'none' },
        '&:focus': { borderColor: 'transparent', boxShadow: 'none', focusoutline: 'none' },
        '&:active': { borderColor: 'transparent', boxShadow: 'none' },
    }),
    input: (provided) => ({ ...provided, height: '23px !important', padding: '0', margin: '20px 0 0 0', }),
    singleValue: (provided) => ({ ...provided, fontSize: '14px', margin: '20px 0 0 0' }),
    placeholder: (provided) => ({ ...provided, margin: '20px 0 0 0', fontSize: '14px' }),
    dropdownIndicator: (provided) => ({ ...provided, color: '#050A24' }),
    menu: (provided) => ({ ...provided, zIndex: 2, fontSize: '14px', }),
    option: (provided, state) => ({
        ...provided,
        background: state.isSelected ? 'linear-gradient(135deg, #1F2A59,rgb(21, 30, 70), #050A26)' : state.isFocused ? 'linear-gradient(135deg, #f0f0f0, #d1d1d1)' : 'white',
        color: state.isSelected ? '#fff' : '#000',
        padding: '10px'
    }),
};

const LocationField = ({
    id,
    label,
    control,
    name,
    formGroup = "",
    options,
    rule = { required: true },
    errors,
    placeholder = "Select Options",
    isSearchable = false,
}) => {
    const [inputVisible, setInputVisible] = useState(false);
    const [customOptions, setCustomOptions] = useState(options);
    const [customLocation, setCustomLocation] = useState('');

    const handleCustomLocationChange = (inputValue) => {
        setCustomLocation(inputValue);
    };

    const handleAddCustomLocation = (onChange) => {
        if (customLocation.trim() && !customOptions.some(option => option.value === customLocation)) {
            const newLocation = { label: customLocation, value: customLocation };
            setCustomOptions(prevOptions => [newLocation, ...prevOptions]);
            onChange(customLocation);
        }
        setCustomLocation('');
        setInputVisible(false);
    };

    const handleCustomOptionSelection = (selectedOption) => {
        if (selectedOption && selectedOption.value === 'Custom') {
            setCustomLocation('');
            setInputVisible(true);
        }
    };

    const handleKeyPress = (e, onChange) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddCustomLocation(onChange);
        }
    };

    return (
        <div className={`form-group mb-[16px] ${formGroup}`}>
            <label htmlFor={id}>{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rule}
                render={({ field: { onChange, value } }) => (
                    <>
                        <Select
                            id={id}
                            value={customOptions.find(option => option.value === value) || null}
                            onChange={(selectedOption) => {
                                onChange(selectedOption ? selectedOption.value : '');
                                handleCustomOptionSelection(selectedOption);
                            }}
                            className={`custom-select ${errors?.[name] ? 'error' : ''}`}
                            styles={customStyles}
                            options={customOptions}
                            placeholder={placeholder}
                            isSearchable={isSearchable}
                        />

                        {inputVisible && (
                            <div className='custom-location relative flex flex-row items-center'>
                                <label className='custom-label mr-4 text-lg'>Custom Location</label>
                                <input
                                    className={`input-field w-full py-2 px-3 rounded-md border ${customLocation === '' ? "error" : ""}`}
                                    type="text"
                                    value={customLocation}
                                    onChange={(e) => handleCustomLocationChange(e.target.value)}
                                    onKeyDown={(e) => handleKeyPress(e, onChange)}
                                    placeholder="Enter custom location"
                                />
                                <button className='absolute right-2 px-4 py-1 bg-[#1E1E1E] text-white rounded-md' onClick={() => handleAddCustomLocation(onChange)}>Add</button>
                                {customLocation === '' && (
                                    <span className="error-text">*Custom location is required</span>
                                )}
                            </div>
                        )}
                    </>
                )}
            />
            {!!errors?.[name] && <span className="error-text" style={{ bottom: '75px' }}>{errors[name].message}</span>}
        </div>
    )
}

export default LocationField;