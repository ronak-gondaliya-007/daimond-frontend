export const giaForm = [
    {
        id: 1,
        type: "ROW",
        childrens: [
            {
                id: 2,
                name: "diamondName",
                label: "Diamond name",
                type: "INPUT",
                placeholder: "Enter Diamond name",
                rule: {
                    required: "*Diamond name is required"
                }
            },
            {
                id: 3,
                name: "refNo",
                label: "RefNo",
                type: "INPUT",
                placeholder: "Enter refNo",
                rule: {
                    required: "*Diamond name is required"
                },
            },
        ],
    },
    {
        id: 7,
        type: "ROW",
        childrens: [
            {
                id: 8,
                name: "carat",
                label: "Carat",
                type: "INPUT",
                placeholder: "Enter carat",
                rule: {
                    required: "*Carat is required",
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Carat"
                    }
                }
            },
            {
                id: 9,
                name: "color",
                label: "color",
                type: "INPUT",
                placeholder: "Enter color"
            },
        ],
    },
    {
        id: 4,
        type: "ROW",
        childrens: [
            {
                id: 5,
                name: "pricePerCarat",
                label: "Price Per Carat",
                type: "INPUT",
                placeholder: "Enter Price Per Carat",
                rule: {
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Price Per Carat"
                    }
                }
            },
            {
                id: 6,
                name: "price",
                label: "Daimond Price",
                type: "INPUT",
                placeholder: "Enter Daimond Price",
                disabled: true,
            }
        ],
    },
    {
        id: 10,
        type: "ROW",
        childrens: [
            {
                id: 11,
                name: "shape",
                label: "shape",
                type: "INPUT",
                placeholder: "Enter shape",
            },
            {
                id: 12,
                name: "size",
                label: "size",
                type: "INPUT",
                placeholder: "Enter size",
            },
        ],
    },
    {
        id: 13,
        type: "ROW",
        childrens: [
            {
                id: 14,
                name: "clarity",
                label: "clarity",
                type: "INPUT",
                placeholder: "Enter clarity",
            },
            {
                id: 15,
                name: "polish",
                label: "polish",
                type: "INPUT",
                placeholder: "Enter polish",
            },
        ],
    },
    {
        id: 16,
        type: "ROW",
        childrens: [
            {
                id: 17,
                name: "symmetry",
                label: "symmetry",
                type: "INPUT",
                placeholder: "Enter symmetry",
            },
            {
                id: 18,
                name: "fl",
                label: "fl",
                type: "INPUT",
                placeholder: "Enter FL",
            },
        ],
    },
    {
        id: 19,
        type: "ROW",
        childrens: [
            {
                id: 20,
                name: "depth",
                label: "depth",
                type: "INPUT",
                placeholder: "Enter depth",
                rule: {
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Depth"
                    }
                }
            },
            {
                id: 21,
                name: "table",
                label: "table",
                type: "INPUT",
                placeholder: "Enter table",
                rule: {
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Table"
                    }
                }
            },
        ],
    },
    {
        id: 22,
        type: "ROW",
        childrens: [
            {
                id: 23,
                name: "measurement",
                label: "measurement",
                type: "MULTI_INPUT",
                placeholder: "Enter measurement"
            },
            {
                id: 24,
                name: "ratio",
                label: "ratio",
                type: "INPUT",
                placeholder: "Enter ratio",
                rule: {
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Ratio"
                    }
                }
            },
        ],
    },
    {
        id: 25,
        type: "ROW",
        childrens: [
            {
                id: 26,
                name: "cartId",
                label: "cart ID",
                type: "INPUT",
                placeholder: "Enter cart ID",
            },
            {
                id: 27,
                name: "certificateNo",
                label: "certificate No",
                type: "INPUT",
                placeholder: "Enter certificate no",
            },
        ],
    },
    {
        id: 28,
        type: "ROW",
        childrens: [
            {
                id: 29,
                name: "location",
                label: "Location",
                type: "LOCATION",
                placeholder: "Select Location",
                isSearchable: true,
                options: [
                    { value: "New York", label: "New York" },
                    { value: "Mumbai", label: "Mumbai" },
                    { value: "Surat", label: "Surat" },
                    { value: "Custom", label: "Custom" },
                ]
            },
            {
                id: 30,
                name: "remarks",
                label: "Remarks",
                type: "TEXTAREA",
                placeholder: "Enter remarks"
            },
        ],
    },
    {
        id: 31,
        type: "ROW",
        childrens: [
            {
                id: 32,
                name: "images",
                label: "Diamond Images",
                type: "IMAGE"
            },
        ],
    }
]

export const parcelStockForm = [
    {
        id: 1,
        type: "ROW",
        childrens: [
            {
                id: 2,
                name: "diamondName",
                label: "Diamond name",
                type: "INPUT",
                placeholder: "Enter Diamond name",
                rule: {
                    required: "*Diamond name is required"
                }
            },
            {
                id: 3,
                name: "refNo",
                label: "RefNo",
                type: "INPUT",
                placeholder: "Enter refNo",
                rule: {
                    required: "*Diamond name is required"
                },
            },
        ],
    },
    {
        id: 7,
        type: "ROW",
        childrens: [
            {
                id: 8,
                name: "carat",
                label: "Carat",
                type: "INPUT",
                placeholder: "Enter carat",
                rule: {
                    required: "*Carat is required",
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Carat"
                    }
                }
            },
            {
                id: 9,
                name: "color",
                label: "color",
                type: "INPUT",
                placeholder: "Enter color",
            },
        ],
    },
    {
        id: 13,
        type: "ROW",
        childrens: [
            {
                id: 14,
                name: "cost",
                label: "Cost",
                type: "INPUT",
                placeholder: "Enter Cost",
                rule: {
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Cost"
                    }
                }
            },
            {
                id: 15,
                name: "costPerCarat",
                label: "Cost Per Carat",
                type: "INPUT",
                placeholder: "Enter Cost Per Carat",
                rule: {
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Cost Per Carat"
                    }
                }
            },
        ],
    },
    {
        id: 10,
        type: "ROW",
        childrens: [
            {
                id: 11,
                name: "clarity",
                label: "clarity",
                type: "INPUT",
                placeholder: "Enter clarity",
            },
            {
                id: 12,
                name: "pic",
                label: "Pic",
                type: "INPUT",
                placeholder: "Enter Pic",
                rule:{
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Price Per Carat"
                    }
                }
            },
        ],
    },
    {
        id: 4,
        type: "ROW",
        childrens: [
            {
                id: 5,
                name: "pricePerCarat",
                label: "Price Per Carat",
                type: "INPUT",
                placeholder: "Enter Price Per Carat",
                rule: {
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Price Per Carat"
                    }
                }
            },
            {
                id: 6,
                name: "rapPrice",
                label: "Rap Price",
                type: "INPUT",
                placeholder: "Enter Rap Price",
                rule:{
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Price Per Carat"
                    }
                }
            }
        ],
    },
]

export const looseStockForm = [
    {
        id: 1,
        type: "ROW",
        childrens: [
            {
                id: 2,
                name: "diamondName",
                label: "Diamond name",
                type: "INPUT",
                placeholder: "Enter Diamond name",
                rule: {
                    required: "*Diamond name is required"
                }
            },
            {
                id: 3,
                name: "refNo",
                label: "RefNo",
                type: "INPUT",
                placeholder: "Enter refNo",
                rule: {
                    required: "*Diamond name is required"
                },
            },
        ],
    },
    {
        id: 7,
        type: "ROW",
        childrens: [
            {
                id: 8,
                name: "carat",
                label: "Carat",
                type: "INPUT",
                placeholder: "Enter carat",
                rule: {
                    required: "*Carat is required",
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Carat"
                    }
                }
            },
            {
                id: 9,
                name: "color",
                label: "color",
                type: "INPUT",
                placeholder: "Enter color"
            },
        ],
    },
    {
        id: 10,
        type: "ROW",
        childrens: [
            {
                id: 11,
                name: "clarity",
                label: "clarity",
                type: "INPUT",
                placeholder: "Enter clarity",
            },
            {
                id: 12,
                name: "pic",
                label: "Pic",
                type: "INPUT",
                placeholder: "Enter Pic",
                rule:{
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Price Per Carat"
                    }
                }
            },
        ],
    },
    {
        id: 4,
        type: "ROW",
        childrens: [
            {
                id: 5,
                name: "pricePerCarat",
                label: "Price Per Carat",
                type: "INPUT",
                placeholder: "Enter Price Per Carat",
                rule: {
                    pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Price Per Carat"
                    }
                }
            },
            {
                id: 6,
                name: "rapPrice",
                label: "Rap Price",
                type: "INPUT",
                placeholder: "Enter Rap Price",
                disabled: true,
                rule: {
                   pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "*Invalid Price Per Carat"
                    }
                }
            }
        ],
    },
]

export const stockFilterForms = [
    {
        id: 1,
        name: "carat",
        label: "Carat",
        type: "INPUT",
        placeholder: "Enter carat"
    },
    {
        id: 2,
        name: "shape",
        label: "shape",
        type: "SELECT",
        placeholder: "Enter shape"
    },
    {
        id: 3,
        name: "location",
        label: "Location",
        type: "SELECT",
        placeholder: "Select Location",
        isSearchable: true,
        options: []
    },
    {
        id: 4,
        name: "status",
        label: "Status",
        type: "SELECT",
        placeholder: "Select status",
        isSearchable: true,
        options: [
            { value: "Available", label: "Available", _id: 'available' },
            { value: "On Memo", label: "On Memo", _id: 'onMemo' },
            { value: "Sold", label: "Sold", _id: 'sold' },
        ]
    },
];

export const stockFilterForm = [
    {
        id: 101,
        type: "ROW",
        childrens: [
            {
                id: 102,
                name: "location",
                label: "Location",
                type: "SELECT",
                placeholder: "Select Location",
                isSearchable: true,
                formGroup: "!mb-2",
                options: [
                    { value: "All", label: "All" },
                    { value: "New York", label: "New York" },
                    { value: "Mumbai", label: "Mumbai" },
                    { value: "Surat", label: "Surat" }
                ]
            },
        ],
    },
    {
        id: 103,
        type: "ROW",
        childrens: [
            {
                id: 104,
                name: "shape",
                label: "Shape",
                type: "SELECT",
                placeholder: "Select Shape",
                isSearchable: true,
                formGroup: "!mb-2",
                options: [
                    { value: "All", label: "All" },
                    { value: "Round", label: "Round" },
                    { value: "Round 1", label: "Round 2" }
                ]
            },
        ],
    },
    {
        id: 105,
        type: "ROW",
        childrens: [
            {
                id: 106,
                name: "status",
                label: "Status",
                type: "SELECT",
                placeholder: "Select Status",
                isSearchable: true,
                formGroup: "!mb-5",
                options: [
                    { value: "All", label: "All" },
                    { value: "Draft", label: "Draft" },
                ]
            },
        ],
    },
    {
        id: 105,
        type: "ROW",
        childrens: [
            {
                id: 106,
                name: "carat",
                label: "Carat",
                type: "INPUT",
                placeholder: "Enter Range",
                isSearchable: true,
                formGroup: "!mb-5"
            },
        ],
    },
]