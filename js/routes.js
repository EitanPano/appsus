import homePage from './pages/home-page.cmp.js';
import emailApp from './pages/email-app.cmp.js';
import keepApp from './pages/keep-app.cmp.js';
import emailDetails from './pages/email-details.cmp.js';
// import keepDetails from './pages/keep-details.cmp.js';
import emailInbox from './cmps/email-inbox.cmp.js';
import bookApp from './pages/book-app.cmp.js';
import bookDetails from './pages/book-details.cmp.js';
// import aboutPage from './pages/about-page.cmp.js';
// import aboutTeam from './pages/about-team.cmp.js';


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
        component: keepApp,
    },
    {
        path: '/book',
        component: bookApp
    },
    {
        path: '/book/:bookId',
        component: bookDetails
    },
    // {
    //     path: '/about',
    //     component: aboutPage,
    //     children: [
    //         {
    //             path: '/about/team',
    //             component: aboutTeam
    //         },
    //     ]
    // },

];

export const router = new VueRouter({ routes });
