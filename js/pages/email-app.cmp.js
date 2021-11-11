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
        emailCompose,
    },
    template: `
        <section class="email-app app-main">
            <email-filter @changed="setFilter" />
            <email-folder-list @compose="isCompose = !isCompose" />
            <email-list @toggleRead="toggleRead" @removed="removeEmail" v-if="emails" :emails="emailsToShow" />
            <email-compose v-if="isCompose" @sent="sendEmail" @closed="isCompose = false" />
        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: null,
            isCompose: false,
        };
    },
    created() {
        this.loadEmails();
    },
    methods: {
        loadEmails() {
            emailService.query().then((emails) => (this.emails = emails));
        },
        toggleRead(emailId, isRead) {
            console.log(emailId, isRead);
            emailService.toggleRead(emailId, isRead)
                .then(this.loadEmails)
        },
        sendEmail(newEmail) {
            emailService
                .sendEmail(newEmail)
                .then((emails) => (this.emails = emails));
        },
        removeEmail(emailId) {
            emailService.removeEmail(emailId)
                .then(() => {
                    this.emails = this.emails.filter(email => email.id !== emailId)
                })
            console.log(emailId);
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
            // this.filterBy.status = 'inbox'
            console.log(this.filterBy);
        },
    },
    computed: {
        emailsToShow() {
            if (!this.filterBy) return this.emails;

            let emailsToShow = this.emails
			if (this.filterBy.status !== 'all') {
				let isRead = (this.filterBy.status === 'read') ? true : false;
				emailsToShow = emailsToShow.filter(email => email.isRead === isRead)
			}
			if (this.filterBy.searchStr) {
				let searchStr = this.filterBy.searchStr.toLowerCase()
				emailsToShow = emailsToShow.filter(email => {
					return (
						email.subject.toLowerCase().includes(searchStr) ||
						email.body.toLowerCase().includes(searchStr)
					)
				})
			}
            return emailsToShow;
        },
    }
};
