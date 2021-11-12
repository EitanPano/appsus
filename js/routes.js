import homePage from './pages/home-page.cmp.js';
import emailApp from './pages/email-app.cmp.js';
import keepApp from './pages/keep-app.cmp.js';
import emailDetails from './pages/email-details.cmp.js';
import keepDetails from './pages/keep-details.cmp.js';
import emailInbox from './cmps/email-inbox.cmp.js';


const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp,
        children: [
            {
                path: '',
                component: emailInbox
            },
            {
                path: ':id',
                component: emailDetails
            }   
        ]
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/keep/:noteId',
        component: keepDetails
    },
];

export const router = new VueRouter({ routes });
