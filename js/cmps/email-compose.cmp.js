export default {
    template: `
    <section class="email-compose">
        <div class="upper-tab flex space-between align-center">
            <p>New Message</p>
            <button class="btn-close" @click="$emit('closed')">x</button>
        </div>
        <form action="" @submit.prevent="sendEmail">
            <input v-model="newEmail.to" type="text" placeholder="Recipients">
            <input v-model="newEmail.subject" type="text" placeholder="Subject">
            <textarea v-model="newEmail.body" name="" id=""></textarea>
            <button>Send</button>
        </form>
    </section>
    `,
    data() {
        return {
            newEmail: {
            from: null,
            to: null,
            subject: null,
            body: null,
            isStarred: false,
            status: 'inbox',
            }
        }
    },
    methods: {
        sendEmail() {
            this.$emit('sent', this.newEmail)
        }
    }
};
