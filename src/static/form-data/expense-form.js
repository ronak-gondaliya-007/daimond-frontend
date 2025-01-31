export const expenseForm = [
    {
        id: 1,
        type: "ROW",
        childrens: [
            {
                id: 2,
                name: "category",
                label: "Category",
                type: "SELECT",
                placeholder: "Select Category",
                rule: {
                    required: "*Category is required"
                },
                options: [
                    { value: "Banking Charge", label: "Banking Charge" },
                    { value: "Shipping Charge", label: "Shipping Charge" },
                ]
            },
            {
                id: 3,
                name: "invoiceNumber",
                label: "Invoice Number",
                type: "INPUT",
                placeholder: "Enter Invoice Number",
                rule: {
                    required: "*Invoice Number is required"
                },
            },
        ],
    },
    {
        id: 4,
        type: "ROW",
        childrens: [
            {
                id: 5,
                name: "amount",
                label: "Expenes Amount",
                type: "INPUT",
                placeholder: "Enter Expenes Amount",
                rule: {
                    required: "*Expenes Amount is required",
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Expenes Amount"
                    }
                }
            },
            {
                id: 6,
                name: "expenseDate",
                label: "Date Of Expenese",
                type: "DATEPICKER",
                placeholder: "Select Date Of Expenese",
                rule: {
                    required: "*Date Of Expenese is required"
                }
            },
        ],
    },
    {
        id: 7,
        type: "ROW",
        childrens: [
            {
                id: 8,
                name: "description",
                label: "Description/Notes",
                type: "TEXTAREA",
                placeholder: "Enter Description or Notes"
            },
        ],
    }
];