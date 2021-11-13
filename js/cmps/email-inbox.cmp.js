import { emailService } from '../services/email-service.js';
import { eventBus } from '../services/event-bus-service.js';
import { utilService } from '../services/util-service.js';
import emailFilter from './email-filter.cmp.js';
import emailList from './email-list.cmp.js';
import emailCompose from './email-compose.cmp.js';

export default {
    template: `
    <section>
        <email-filter @changed="setFilter" />
        <email-list @toggleStarred="toggleStarred" @toggleRead="toggleRead" @removed="removeEmail" v-if="emails" :emails="emails" />
        <email-compose v-if="isCompose" :note="note" @sent="sendEmail" @closed="isCompose = false" />
    </section>`,
    data() {
        return {
            emails: null,
            filterBy: {
                status: 'inbox',
                searchStr: '',
                isRead: 'all',
                lables: [],
            },
            isCompose: false,
            note: utilService.loadFromStorage('noteToCompose') || null
        };
    },
    created() {
        this.loadEmails();
        eventBus.$on('toggleCompose', () => {
            this.isCompose = !this.isCompose;
        });
        eventBus.$on('setStatus', (status) => {
            this.filterBy.status = status;
            this.loadEmails();
        });
        if (this.note) this.isCompose = !this.isCompose
    },
    watch: {
        '$route.params.mailStatus'(mailStatus) {
            this.filterBy.status = mailStatus;
            this.loadEmails();
        },
    },
    methods: {
        loadEmails() {
            emailService.query(this.filterBy).then((emails) => {
                this.emails = emails;
            });
        },
        sendEmail(newEmail) {
            newEmail.from = emailService.loggedinUser.email;
            emailService.sendEmail(newEmail).then((emails) => {
                console.log('emails', emails);
                utilService.saveToStorage('noteToCompose', null)
                this.note = null;
                this.emails = emails;
                this.isCompose = !this.isCompose
            });
        },
        removeEmail(emailId) {
            if (this.filterBy.status !== 'trash') {
                emailService.trashEmail(emailId).then((res) => {
                    this.loadEmails();
                });
            } else
                emailService.removeEmail(emailId).then(() => {
                    this.emails = this.emails.filter(
                        (email) => email.id !== emailId
                    );
                });
            console.log(emailId);
        },
        setFilter({ searchStr, isRead }) {
            this.filterBy = { ...this.filterBy, searchStr, isRead };
            this.loadEmails();
        },
        toggleStarred(emailId, isStarred) {
            emailService
                .toggleStarred(emailId, isStarred)
                .then(this.loadEmails);
        },
        toggleRead(emailId, isRead) {
            console.log(emailId, isRead);
            emailService.toggleRead(emailId, isRead).then(this.loadEmails);
        },
    },
    components: {
        emailList,
        emailFilter,
        emailCompose,
    },
};
