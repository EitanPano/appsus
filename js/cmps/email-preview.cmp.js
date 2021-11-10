export default {
    props: ['email'],
    template: `
        <li>
            <label>{{showRead}}<input v-model="isRead" type="checkbox" /></label>
            <label><input type="checkbox" /></label>
            <router-link :to="'/email/'+email.id">
                <h3>EMAIL PREVIEW...</h3>
                <p>{{ email.from }}</p>
                <p>Senders Main Subject</p>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem architecto, nostrum voluptas dolores velit veniam. Alias expedita ea nostrum facere iure magni hic excepturi tempore!
                </p>
            </router-link>
        </li>
    `,
    data() {
        return {
            isRead: null
        }
    },
    computed: {
        showRead() {
            return (this.isRead) ? 'read' : 'unread';
        }
    }
};
