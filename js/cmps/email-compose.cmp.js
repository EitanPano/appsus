export default {
    props: ['note'],
    template: `
    <section class="email-compose">
        <div class="upper-tab flex space-between align-center">
            <p>New Message</p>
            <button class="btn-close" @click="$emit('closed')">x</button>
        </div>
        <form action="" @submit.prevent="sendEmail">
            <input v-model="newEmail.to" type="email" placeholder="Recipient@mail.com">
            <input v-model="newEmail.subject" type="text" placeholder="Subject">
            <div class="flex-fix">
                <textarea v-model="newEmail.body" name="" id=""></textarea>
                <div class="actions">
                    <button class="btn-attach" type="button" title="Attach Image" @click.prevent="toggleAttach"><i class="fas fa-paperclip"></i></button>
                    <input @input="testLog" v-model="newEmail.imgUrl" v-if="isAttached" type="url" placeholder="Image Url">
                    <button class="btn-send" type="submit">Send</button>
                </div>
            </div>
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
                imgUrl: null,
                isStarred: false,
                status: 'inbox',
            },
            isAttached: null
        };
    },
    created() {
        if (this.note) {
            this.newEmail.subject = this.note.info.title;
            this.newEmail.body = this.note.info.txt;
            if (this.note.info.url) this.newEmail.imgUrl = this.note.info.url;
            if (this.note.info.todos) {
                const todos = this.note.info.todos.map((todo) => {
                    return `${todo.isCompleted ? '✔' : '✖'} ${todo.txt}` +'\n'
                });
                this.newEmail.body = todos.join('')
            }
        }
    },
    destroyed() {
        if (this.note) {
            this.newEmail.subject = null;
            this.newEmail.body = null;
            this.newEmail.imgUrl = null;
        }
    },
    methods: {
        sendEmail() {
            console.log(this.newEmail);
            this.$emit('sent', this.newEmail);
        },
        toggleAttach() {
            this.isAttached = !this.isAttached
            console.log(this.isAttached);
        },
        testLog(val) {
            console.log(val);
        }
    },
};
