import { emailService } from '../services/email-service.js';
import { eventBus } from '../services/event-bus-service.js';
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
            <email-folder-list @setStatus="setStatus" @compose="toggleCompose" />
            <email-list @toggleStarred="toggleStarred" @toggleRead="toggleRead" @removed="removeEmail" v-if="emails" :emails="emails" />
            <email-compose v-if="isCompose" @sent="sendEmail" @closed="isCompose = false" />
        </section>
    `,
    data() {
        return {
            emails: null,
            filterBy: {
                status: 'inbox',
                searchStr: '',
                isRead: 'all',
                isStarred: true,
                lables: [],
            },
            isCompose: false,
        };
    },
    created() {
        this.loadEmails();
    },
    methods: {
        toggleCompose(){
            eventBus.$emit('toggleCompose',this.isCompose)
            this.isCompose = !this.isCompose
        },
        loadEmails() {
            console.log('load emails');
            emailService.query(this.filterBy).then((emails) => {
                this.emails = emails;
            });
        },
        toggleStarred(emailId, isStarred) {
            console.log(emailId, isStarred);
            emailService
                .toggleStarred(emailId, isStarred)
                .then(this.loadEmails);
        },
        toggleRead(emailId, isRead) {
            console.log(emailId, isRead);
            emailService.toggleRead(emailId, isRead).then(this.loadEmails);
        },
        sendEmail(newEmail) {
            emailService
                .sendEmail(newEmail)
                .then((emails) => (this.emails = emails));
        },
        removeEmail(emailId) {
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
        setStatus(status) {
            this.filterBy = { ...this.filterBy, status }
            console.log('status from cmp', status);
            this.loadEmails();
        },
    },
    computed: {
        // emailsToShow() {
        //     // if (!this.emails) return
        //     if (this.filterBy.status === 'starred') {
        //         return this.emails.filter((email) => email.isStarred);
        //     }
        //     else return this.emails
        // },
        // emailsToShow() {
        //     if (!this.filterBy) return this.emails;
        //     let emailsToShow = this.emails;
        //     if (this.filterBy.searchStr) {
        //         let searchStr = this.filterBy.searchStr.toLowerCase();
        //         emailsToShow = emailsToShow.filter((email) => {
        //             return (
        //                 email.subject.toLowerCase().includes(searchStr) ||
        //                 email.body.toLowerCase().includes(searchStr)
        //             );
        //         });
        //     }
        //     return emailsToShow;
        // },
    },
};
