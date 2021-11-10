import { emailService } from '../services/email-service.js';

import emailFilter from '../cmps/email-filter.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';


export default {
    name: 'emailApp',
    components: {
        emailList,
        emailFolderList,
        emailFilter,
        emailCompose
    },
    template: `
        <section class="email-app app-main">
            <email-filter />
            <email-folder-list @compose="isCompose = !isCompose" />
            <email-list v-if="emails" :emails="emails" />
            <email-compose v-if="isCompose" @sent="sendEmail" @closed="isCompose = false" />
        </section>
    `,
    data() {
        return {
            emails: null,
            isCompose: false
        };
    },
    created() {
        this.loadEmails();
    },
    methods: {
        loadEmails() {
            emailService.query().then((emails) => (this.emails = emails));
        },
        sendEmail(newEmail) {
            emailService.sendEmail(newEmail)
                .then(emails => this.emails = emails);
        }
    },
};
