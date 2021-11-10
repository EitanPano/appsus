import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    components: {
        emailPreview,
    },
    template: `
        <main class="email-list">
            <p>Unread: {{ showUnreadCount }}</p>
            <ul>
                <template v-for="email in emails">
                    <email-preview @removed="$emit('removed', $event)" :email="email" />
                </template>
            </ul>

        </main>
    `,
    data() {
        return {
            unreadCount: null,
        };
    },
    created() {
        console.log(this.emails);
    },
    methods: {

    },
    computed: {
        showUnreadCount() {
            const count = this.emails.reduce((acc, email) => {
                return !email.isRead ? acc + 1 : acc;
            }, 0);
            return count;
        },
        showTools() {
            return console.log('hover');
        },
    },
};
