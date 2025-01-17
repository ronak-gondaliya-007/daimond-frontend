export const stockForm = [
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
                name: "refno",
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
        id: 4,
        type: "ROW",
        childrens: [
            {
                id: 5,
                name: "vendorId",
                label: "Vendor",
                type: "SELECT",
                placeholder: "Select Vendor",
                isSearchable: true,
                rule: {
                    required: "*Vendor is required"
                },
                options: []
            },
            {
                id: 6,
                name: "location",
                label: "Location",
                type: "LOCATION",
                placeholder: "Select Location",
                isSearchable: true,
                rule: {
                    required: "*Location is required"
                },
                options: [
                    { value: "New York", label: "New York" },
                    { value: "Mumbai", label: "Mumbai" },
                    { value: "Surat", label: "Surat" },
                    { value: "Custom", label: "Custom" },
                ]
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
                    required: "*Carat is required"
                }
            },
            {
                id: 9,
                name: "color",
                label: "color",
                type: "INPUT",
                placeholder: "Enter color",
                rule: {
                    required: "*Color is required"
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
                name: "shape",
                label: "shape",
                type: "INPUT",
                placeholder: "Enter shape",
                rule: {
                    required: "*Shape is required"
                }
            },
            {
                id: 12,
                name: "size",
                label: "size",
                type: "INPUT",
                placeholder: "Enter size",
                rule: {
                    required: "*Size is required"
                }
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
                rule: {
                    required: "*Clarity is required"
                }
            },
            {
                id: 15,
                name: "polish",
                label: "polish",
                type: "INPUT",
                placeholder: "Enter polish",
                rule: {
                    required: "*Polish is required"
                }
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
                rule: {
                    required: "*Symmetry is required"
                }
            },
            {
                id: 18,
                name: "fl",
                label: "fl",
                type: "INPUT",
                placeholder: "Enter FL",
                rule: {
                    required: "*FL is required"
                }
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
                    required: "*Depth is required"
                }
            },
            {
                id: 21,
                name: "table",
                label: "table",
                type: "INPUT",
                placeholder: "Enter table",
                rule: {
                    required: "*Table is required"
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
                    required: "*Ratio is required"
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
                rule: {
                    required: "*Cart ID is required"
                }
            },
            {
                id: 27,
                name: "certificateNo",
                label: "certificate No",
                type: "INPUT",
                placeholder: "Enter certificate no",
                rule: {
                    required: "*Certificate no ID is required"
                }
            },
        ],
    },
    {
        id: 28,
        type: "ROW",
        childrens: [
            {
                id: 29,
                name: "images",
                label: "Diamond Images",
                type: "IMAGE",
                rule: {
                    required: "*Images are required."
                }
            },
        ],
    },
    {
        id: 30,
        type: "ROW",
        childrens: [
            {
                id: 31,
                name: "remarks",
                label: "Remarks",
                type: "TEXTAREA",
                placeholder: "Enter remarks",
                rule: {
                    required: "*Remarks is required"
                }
            },
        ],
    }
]