export const selectStyle = {
    control: (provided) => ({
        ...provided,
        height: '54px',
        borderRadius: '8px',
        backgroundColor: 'rgba(239, 241, 249, 0.6)',
        border: '1px solid #d1e9ff',
        fontSize: '14px',
        '&:hover': { borderColor: '#d1e9ff', boxShadow: 'none' },
        '&:focus': { borderColor: 'transparent', boxShadow: 'none', focusoutline: 'none' },
        '&:active': { borderColor: 'transparent', boxShadow: 'none' },
        borderColor: '#d1e9ff',
        boxShadow: 'none',
        cursor: 'pointer',
    }),

    input: (provided) => ({
        ...provided,
        height: '23px !important',
        padding: '0',
        margin: '20px 0 0 0'
    }),

    indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none'
    }),

    singleValue: (provided) => ({
        ...provided,
        fontSize: '14px',
        margin: '20px 0 0 0'
    }),

    placeholder: (provided) => ({
        ...provided,
        margin: '20px 0 0 0',
        fontSize: '14px'
    }),

    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#050A24'
    }),

    menu: (provided) => ({
        ...provided,
        zIndex: 2,
        fontSize: '14px',
        cursor: 'pointer'
    }),

    option: (provided, { isSelected, isFocused }) => ({
        ...provided,
        background: isSelected
            ? 'linear-gradient(135deg, #1F2A59,rgb(21, 30, 70), #050A26)'
            : (isFocused ? 'linear-gradient(135deg, #f0f0f0, #d1d1d1)' : 'white'),
        color: isSelected ? '#fff' : '#000',
        padding: '10px',
        cursor: 'pointer'
    }),

};
