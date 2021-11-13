import appHeader from './cmps/app-header.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';
// import userMsg from './cmps/user-msg.cmp.js';

import { router } from './routes.js'


const options = {
    el: '#app',
    router,
    components: {
        appHeader,
        appFooter,
        // userMsg
    },
    template: `
    <section>
        <!-- <user-msg /> -->
        <app-header />
        <router-view />
        <app-footer />
    </section>
    `,
    data() {
        return {};
    },
    created() {},
    destroyed() {},
    methods: {},
    computed: {},
};

new Vue(options);
