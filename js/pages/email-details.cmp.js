import { emailService } from '../services/email-service.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
        <main v-if="email" class="app-main email-details">
            <div>
                <div>
                    <router-link class="back-to" to="/email">
                    <i class="fas fa-long-arrow-alt-left"></i>
                    &nbspBack</router-link>
                    <div>                   
                        <button @click.prevent="toggleRead(email.id, email.isRead)"><i :class="readBtn"></i></button>
                        <button @click.prevent="toggleStarred(email.id, email.isStarred)"><i :class="showStarred" aria-hidden="true"></i></button>
                        <button @click.prevent="removeEmail(email.id)"><i class="fas fa-trash"></i></button> 
                    </div>
                    <p>{{ showSentAt }}</p>
                </div>
                <h3 class="subject">{{ email.subject }}</h3>
                <p class="from">{{ email.from}}</p>
                <p class="body">{{ email.body }}</p>
                <hr>
                <img class="img" v-if="email.imgUrl" :src="email.imgUrl" alt="">
            </div>
        </main>
    `,
    data() {
        return {
            email: null,
        };
    },
    created() {
        const emailId = this.$route.params;
        emailService.getById(emailId.id).then((email) => {
            this.email = email;
        });
        eventBus.$on('setStatus', (status) => {
            this.$router.push('/email').catch(() => {});
        });
    },
    destroyed() {
        eventBus.$off('mailStatus');
    },
    methods: {
        toggleRead(emailId, isRead) {
            isRead = !isRead;
            emailService.toggleRead(emailId, isRead).then(() => {
                const emailId = this.$route.params;
                emailService
                    .getById(emailId.id)
                    .then((email) => (this.email = email));
            });
        },
        removeEmail(emailId) {
            if (this.email.status !== 'trash') {
                emailService.trashEmail(emailId).then(() => {
                    this.$router.push('/email');
                });
            } else
                emailService.removeEmail(emailId).then(() => {
                    this.$router.push('/email');
                });
        },
        toggleStarred(emailId, isStarred) {
            isStarred = !isStarred
            emailService.toggleStarred(emailId, isStarred).then(() => {
                const emailId = this.$route.params;
                emailService.getById(emailId.id)
                    .then((email) => (this.email = email));
            });
        },
    },
    computed: {
        readBtn() {
            return this.email.isRead
                ? 'fas fa-envelope-open-text'
                : 'fas fa-envelope';
        },
        showStarred() {
            return this.email.isStarred ? 'fa fa-star txt-gold' : 'far fa-star';
        },
        showSentAt() {
            return new Date(this.email.sentAt).toLocaleDateString();
        },
    },
};
