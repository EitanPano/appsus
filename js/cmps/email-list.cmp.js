import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    components: {
        emailPreview,
    },
    template: `
        <main class="email-list">
            <div class="sort-bar flex align-center space-between">
                <p>Unread: {{ showUnreadCount }}</p>
                <div class="tools">
                    <p>Sort :&nbsp</p>
                    <button class="btn-date" @click="sortByDate">{{ sortDateBtn }}</button>
                    <button class="btn-abc" @click="sortByABC"><i :class="abcIcon"></i></button>
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
                    a.subject.toLowerCase() < b.subject.toLowerCase() ? -1 : 1);
            } else {
                this.sortBy = 'ABC';
                this.emails.sort((a, b) =>
                    b.subject.toLowerCase() < a.subject.toLowerCase() ? -1 : 1);
            }
        },
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
        sortDateBtn() {
            return (this.sortBy === 'date') ? 'New' : 'Old';
        },
        abcIcon() {
            return (this.sortBy === 'ABC') ? 'fas fa-sort-alpha-down-alt' : 'fas fa-sort-alpha-down';
        }
    },
};
