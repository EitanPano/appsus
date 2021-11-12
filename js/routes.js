// import bookApp from './pages/book-app.cmp.js';
import homePage from './pages/home-page.cmp.js';
import emailApp from './pages/email-app.cmp.js';
import keepApp from './pages/keep-app.cmp.js';
import emailDetails from './pages/email-details.cmp.js';
import keepDetails from './pages/keep-details.cmp.js';
// import aboutPage from './pages/about-page.cmp.js';
// import aboutTeam from './pages/about-team.cmp.js';
// import aboutService from './pages/about-service.cmp.js';






const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/email',
        component: emailApp
    },
    {
        path: '/email/:emailId',
        component: emailDetails
    },
    {
        path: '/keep',
        component: keepApp
    },
    {
        path: '/keep/:noteId',
        component: keepDetails
    },
    // {
    //     path: '/about',
    //     component: aboutPage,
    //     children: [
    //         {
    //             path: '/about/team',
    //             component: aboutTeam
    //         },
    //         {
    //             path: '/about/service',
    //             component: aboutService
    //         },
    //     ]
    // },

    // {
    //     path: '/book',
    //     component: bookApp
    // },
];

export const router = new VueRouter({ routes });
