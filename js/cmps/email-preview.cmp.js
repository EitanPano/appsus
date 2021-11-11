export default {
    props: ['email'],
    template: `
        <li :class="showRead" @mouseover="hover = true" @mouseleave="hover = false" >
            <router-link :to="'/email/'+email.id">
                <button @click.prevent="toggleStar"><i :class="showStarred" aria-hidden="true"></i></button>
                <!-- <i @click.prevent="toggleStar" class="fa fa-star" aria-hidden="true"></i> -->
                <p class="from">{{ email.from }}</p>
                <p class="subject">{{ email.subject }}</p>
                <p class="body">{{ email.body }}</p>
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
            isStarred: null,
            hover: false,
        };
    },
    methods: {
        toggleRead() {
            this.isRead = !this.isRead;
            this.$emit('toggleRead', this.email.id, this.isRead);
        },
        toggleStar() {
            this.isStarred = !this.isStarred;
            console.log('starred', this.email.id, this.isStarred);
            this.$emit('starred', this.email.id, this.isStarred);
        },
    },
    computed: {
        showStarred() {
            return (this.isStarred) ? 'fa fa-star txt-gold': 'far fa-star'; 
        },
        showRead() {
            return (this.isRead) ? 'read' : 'Unread';
        },
        showSentAt() {
            return new Date(this.email.sentAt).toLocaleDateString();
        },
    },
};
