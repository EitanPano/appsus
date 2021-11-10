import { emailService } from '../services/email-service.js';

export default {
    template:`
        <main class="app-main">
        <router-link class="back-to" to="/email"><< Back</router-link>
            <h3>EMAIL DETAILS...</h3>
            <p>{{ email.from }}</p>
                <p>Senders Main Subject</p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem architecto, nostrum voluptas dolores velit veniam. Alias expedita ea nostrum facere iure magni hic excepturi tempore!
                </p>
        </main>
    `,
    data() {
        return {
            email: null
        }
    },
     created() {
        const { emailId } = this.$route.params;
        emailService.getById(emailId).then((email) => (this.email = email));
    },
}