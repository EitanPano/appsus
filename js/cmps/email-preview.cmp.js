export default {
    props: ['email'],
    template: `
        <li @mouseover="hover = true" @mouseleave="hover = false" >
            <router-link :to="'/email/'+email.id">
                <p>{{ email.from }}</p>
                <p>{{ email.subject }}</p>
                <p>{{ email.body }}</p>
                <div v-if="hover">
                    <button @click.prevent="isRead = !isRead">{{ showRead }}</button>
                    <button @click.prevent="$emit('removed', email.id)">Delete</button>
                    
                </div>
            </router-link>
        </li>
    `,
    data() {
        return {
            isRead: null,
            hover: false
        }
    },
    computed: {
        showRead() {
            return (this.isRead) ? 'Read' : 'Unread';
        }
    }
};
