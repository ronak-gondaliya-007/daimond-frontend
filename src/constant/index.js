import icon from '../assets/images/icon.svg';
import icon1 from '../assets/images/icon-1.svg';
import icon2 from '../assets/images/icon-2.svg';
import icon3 from '../assets/images/icon-3.svg';
import icon4 from '../assets/images/icon-4.svg';

export const sections = [
    {
        title: 'All',
        items: [
            { name: 'Dashboard', slug: "/", icon: icon },
            { name: 'Purchase', slug: "/purchase", icon: icon1 },
            { name: 'Sell/Invoice', slug: "/sell-invoice", icon: icon4 }
        ]
    },
    {
        title: 'Management',
        items: [
            { name: 'Memo', slug: "/memo", icon: icon2 },
            { name: 'Stock', slug: "/stock", icon: icon3 },
            { name: 'Payment', slug: "/payment", icon: icon3 },
            { name: 'Expense', slug: "/expense", icon: icon3 },
            { name: 'Customer', slug: "/customer", icon: icon3 },
            { name: 'Roles & Permission', slug: "/roles-permission", icon: icon3 }
        ]
    },
    {
        title: 'Other',
        items: [
            { name: 'Reports & Analytics', slug: "/reports-analytics", icon: icon2 }
        ]
    }
];