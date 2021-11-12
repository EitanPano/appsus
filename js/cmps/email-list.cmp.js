import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    components: {
        emailPreview,
    },
    template: `
        <main class="email-list">
            <div>
                <p>Unread: {{ showUnreadCount }}</p>
                <div>
                    <button @click="sortByDate">{{ showDateOrder }}</button>
                    <button @click="sortByABC">A - Z</button>
                </div>
            </div>
            <ul>
                <template v-for="email in emails">
                    <email-preview
                        @toggleStarred="toggleStarred"
                        @toggleRead="toggleRead"
                        @removed="$emit('removed', $event)"
                        :email="email" />
                </template>
            </ul>

        </main>
    `,
    data() {
        return {
            unreadCount: null,
            sortBy: null,
        };
    },
    methods: {
        toggleStarred(emailId, isStarred) {
            this.$emit('toggleStarred',emailId, isStarred);
        },
        toggleRead(emailId, isRead) {
            this.$emit('toggleRead', emailId, isRead);
        },
        sortByDate() {
            if (this.sortBy === 'date') {
                (this.sortBy = null),
                    this.emails.sort((a, b) => b.sentAt - a.sentAt);
            } else {
                this.sortBy = 'date';
                this.emails.sort((a, b) => a.sentAt - b.sentAt);
            }
        },
        sortByABC() {
            if (this.sortBy === 'ABC') {
                this.sortBy = null;
                this.emails.sort((a, b) =>
                    a.from.toLowerCase() < b.from.toLowerCase() ? -1 : 1);
            } else {
                this.sortBy = 'ABC';
                this.emails.sort((a, b) =>
                    b.from.toLowerCase() < a.from.toLowerCase() ? -1 : 1);
            }
        },
    },
    computed: {
        // sortedEmails() {
        //     return (this.sortByDate)
        //     ? this.emails.sort((a, b) => a.sentAt - b.sentAt)
        //     : this.emails.sort((a, b) => b.sentAt - a.sentAt)
        // },
        showDateOrder() {
            return this.sortByDate ? 'New' : 'Old';
        },
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
