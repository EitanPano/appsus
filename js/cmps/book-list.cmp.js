import bookPreview from './book-preview.cmp.js';

export default {
    props: ['books'],
    components: {
        bookPreview,
    },
    template: `
    <ul class="book-list">
        <li v-for="book in books" :key="book.id" class="book-preview">
            <book-preview :book="book"></book-preview>
        </li>
    </ul>
    `,
    methods: {
        select(book) {
            this.$emit('selected', book);
        },
    },
    mounted() {
        window.scrollTo(0, 0);
    },
};
