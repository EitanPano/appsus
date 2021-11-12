export default {
    props: ['email'],
    template: `
        <li :class="showRead" @mouseover="hover = true" @mouseleave="hover = false" >
            <router-link :to="'/email/'+email.id">
                <div class="list-main">
                    <button @click.prevent="toggleStar"><i :class="showStarred" aria-hidden="true"></i></button>
                    <p class="from">{{ email.from }}</p>
                </div>
                <div class="list-content">
                    <p class="subject">{{ email.subject }} &nbsp-&nbsp</p>
                    <p class="body">{{ email.body }}</p>
                </div>
                <div v-if="hover">
                    <button @click.prevent="toggleRead"><i :class="readBtn"></i></button>
                    <button @click.prevent="$emit('removed', email.id)"><i class="fas fa-trash"></i></button> 
                </div>
                <p v-else>{{ showSentAt }}</p>
            </router-link>
        </li>
    `,
    data() {
        return {
            isRead: null,
            hover: false,
        };
    },
    created() {
        this.isRead = this.email.isRead;
    },
    methods: {
        toggleRead() {
            this.isRead = !this.isRead;
            this.$emit('toggleRead', this.email.id, this.isRead);
        },
        toggleStar() {
            console.log(!this.email.isStarred);
            console.log(this.isStarred);
            // this.isStarred = !this.isStarred
            this.email.isStarred = !this.email.isStarred
            this.$emit('toggleStarred', this.email.id, this.email.isStarred);
        },
    },
    computed: {
        showStarred() {
            return this.email.isStarred ? 'fa fa-star txt-gold' : 'far fa-star';
        },
        readBtn() {
            return (this.isRead) ? 'fas fa-envelope-open-text' : 'fas fa-envelope';
        },
        showSentAt() {
            return new Date(this.email.sentAt).toLocaleDateString();
        },
        showRead() {
            return (this.email.isRead) ? 'read' : 'unread'
        }
    },
};
