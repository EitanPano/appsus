import { utilService } from '../services/util-service.js';

export default {
    props: ['books'],
    template: `
    <div class="google-book-search flex">
        <label for="" class="search"><i class="fas fa-search"></i><input @input="onSearch" v-model="term" type="search" placeholder="Search google books"></label>
        <ul v-if="books && term">
            <template v-for="book in books">
                <li :key="book.id">
                    <p>{{ book.volumeInfo.title }}</p>
                    <button @click="addBook(book.id)">+</button>
                </li>
            </template>
        </ul>
    </div>
    `,
    data() {
        return {
            term: '',
            onSearch: utilService.debounce(this.search),
        };
    },
    methods: {
        search() {
            if (this.term <= 2) return;
            this.$emit('search', this.term);
        },
        addBook(bookId) {
            const book = this.books.find(book => bookId === book.id);
            this.$emit('added', book);
        }

    },
};
