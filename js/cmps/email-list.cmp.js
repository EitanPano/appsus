import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    components: {
        emailPreview
    },
    template:`
        <main>
            <h3>EMAIL LIST...</h3>
            <p>unread: {{ showUnreadCount }}</p>
            <ul>
                <template v-for="email in emails">
                    <email-preview :email="email" />
                </template>
            </ul>

        </main>
    `,
    data() {
        return {
            unreadCount: 0
        }
    },
    created() {
        console.log(this.emails);
    },
    computed: {
        showUnreadCount() {
            // const emails = this.emails
            const count = this.emails.reduce((acc, email) => {
                return (!email.isRead) ? acc + 1 : acc}, 0)
                console.log(count);
            return count
        }
    }
}