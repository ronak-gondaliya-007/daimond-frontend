export const customerForm = [
    {
        id: 1,
        type: "ROW",
        childrens: [
            {
                id: 2,
                name: "userType",
                label: "User Type",
                type: "SELECT",
                placeholder: "Select User Type",
                options: [
                    { value: "none", label: "Select Role" },
                    { value: "sales", label: "Sales" },
                    { value: "finance", label: "Finance" }
                ],
                formGroup: "w_50"
            },
        ],
    },
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
                placeholder: "Enter Email",
                rule: {
                    required: "*Email is required"
                },
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