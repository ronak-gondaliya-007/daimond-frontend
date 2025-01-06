export const userForm = [
    {
        id: 1,
        type: "ROW",
        childrens: [
            {
                id: 2,
                name: "firstName",
                label: "First Name",
                type: "INPUT",
                placeholder: "Enter First Name",
                rule: {
                    required: "*First Name is required"
                }
            },
            {
                id: 3,
                name: "lastName",
                label: "Last Name",
                type: "INPUT",
                placeholder: "Enter Last Name",
                rule: {
                    required: "*Last Name is required"
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
                name: "email",
                label: "Email",
                type: "INPUT",
                placeholder: "Enter Email",
                rule: {
                    required: "*Email is required"
                },
            },
            {
                id: 6,
                name: "phone",
                label: "Phone",
                type: "PHONE_INPUT",
                placeholder: "Enter Phone",
                rules: {
                    required: "Phone number is required",
                }
            },
        ]
    },
    {
        id: 7,
        type: "ROW",
        childrens: [
            {
                id: 8,
                name: "role",
                label: "Role",
                type: "SELECT",
                options: [
                    { value: "admin", label: "Admin" },
                    { value: "user", label: "User" }
                ]
            },
            {
                id: 9,
                name: "password",
                label: "Password",
                type: "INPUT",
                placeholder: "Enter Password",
                rule: {
                    required: "*Password is required"
                },
            }
        ]
    }
]