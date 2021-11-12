import { keepService } from '../services/keep-service.js';

export default {
    template: `
        <article class="keep-details app-main">

            <h1>HELLO NOTE DETAILS</h1>
            <p v-if="note">{{ note.id }}</p>
        </article>
    `,
    data() {
        return {
            note: null,
        };
    },
    created() {
        const { noteId } = this.$route.params;
        keepService.getById(noteId).then((note) => {
            this.note = note
            console.log(note);
        });
    },
};
