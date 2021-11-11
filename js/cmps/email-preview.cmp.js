export default {
    props: ['email'],
    template: `
        <li :class="showRead" @mouseover="hover = true" @mouseleave="hover = false" >
            <router-link :to="'/email/'+email.id">
                <p>{{ email.from }}</p>
                <p>{{ email.subject }}</p>
                <p>{{ email.body }}</p>
                <div v-if="hover">
                    <button @click.prevent="toggleRead">{{ showRead }}</button>
                    <button @click.prevent="$emit('removed', email.id)">Delete</button> 
                </div>
                <p v-else>{{ showSentAt }}</p>
            </router-link>
        </li>
    `,
    data() {
        return {
            isRead: null,
            hover: false
        }
    },
    methods: {
        toggleRead() {
            this.isRead = !this.isRead;
            this.$emit('toggleRead', this.email.id, this.isRead)

        }
    },
    computed: {
        showRead() {
            return (this.isRead) ? 'read' : 'Unread';
        },
        showSentAt() {
            return new Date(this.email.sentAt).toLocaleDateString()
        }
    }
};
