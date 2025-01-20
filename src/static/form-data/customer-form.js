export const customerForm = [
    {
        id: 3,
        type: "ROW",
        childrens: [
            {
                id: 4,
                name: "customerName",
                label: "Customer Name",
                type: "INPUT",
                placeholder: "Enter customer name",
                rule: {
                    required: "*Customer Name is required"
                }
            },
            {
                id: 5,
                name: "companyName",
                label: "Company Name",
                type: "INPUT",
                placeholder: "Enter company name",
                rule: {
                    required: "*Company name is required"
                },
            },
        ],
    },
    {
        id: 6,
        type: "ROW",
        childrens: [
            {
                id: 7,
                name: "contactNumber",
                label: "Contact Number",
                type: "PHONE_INPUT",
                placeholder: "Enter contact number",
                rules: {
                    required: "Contact number is required",
                }
            },
            {
                id: 8,
                name: "email",
                label: "Email Address",
                type: "INPUT",
                placeholder: "Enter Email"
            },
        ]
    },
    {
        id: 9,
        type: "ROW",
        childrens: [
            {
                id: 10,
                name: "address",
                label: "Address",
                type: "TEXTAREA",
                placeholder: "Enter address",
                rule: {
                    required: "*Address is required"
                }
            },
        ],
    },
]

export const vendorForm = [
    {
        id: 3,
        type: "ROW",
        childrens: [
            {
                id: 4,
                name: "customerName",
                label: "Vendor Name",
                type: "INPUT",
                placeholder: "Enter vendor name",
                rule: {
                    required: "*Vendor Name is required"
                }
            },
            {
                id: 5,
                name: "companyName",
                label: "Company Name",
                type: "INPUT",
                placeholder: "Enter company name",
                rule: {
                    required: "*Company name is required"
                },
            },
        ],
    },
    {
        id: 6,
        type: "ROW",
        childrens: [
            {
                id: 7,
                name: "contactNumber",
                label: "Contact Number",
                type: "PHONE_INPUT",
                placeholder: "Enter contact number",
                rules: {
                    required: "Contact number is required",
                }
            },
            {
                id: 8,
                name: "email",
                label: "Email Address",
                type: "INPUT",
                placeholder: "Enter Email"
            },
        ]
    },
    {
        id: 9,
        type: "ROW",
        childrens: [
            {
                id: 10,
                name: "address",
                label: "Address",
                type: "TEXTAREA",
                placeholder: "Enter address",
                rule: {
                    required: "*Address is required"
                }
            },
        ],
    },
]