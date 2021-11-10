import { emailService } from '../services/email-service.js';

import emailList from '../cmps/email-list.cmp.js';

export default {
    name: 'emailApp',
    components: {
        emailList,
    },
    template: `
        <section class="home-page app-main">
            <h3>EMAIL APP...</h3>
            <email-list v-if="emails" :emails="emails" />
        </section>
    `,
    data() {
        return {
            emails: null,
        };
    },
    created() {
        this.loadEmails();
    },
    methods: {
        loadEmails() {
            emailService.query().then((emails) => (this.emails = emails));
        },
    },
};
