import { bookService } from '../services/book-service.js';

import bookFilter from '../cmps/book-filter.cmp.js';
import bookList from '../cmps/book-list.cmp.js';
import bookAdd from '../cmps/book-add.cmp.js';

export default {
    name: 'book-app',
    components: {
        bookFilter,
        bookList,
        bookAdd
    },
    template: `
    <section class="book-app app-main">
        <book-add v-if="googleBooks" @added="addBook" @search="getGoogleBooks" :books="googleBooks" />
        <book-filter @filtered="setFilter" />
        <book-list :books="booksToShow"/>
    </section>
    `,
    data() {
        return {
            books: bookService.query(),
            filterBy: null,
            googleBooks: {}
        };
    },
    created() {
        this.loadBooks();
    },
    methods: {
        addBook(googleBook) {
            // console.log(book);
            bookService.addGoogleBook(googleBook)
                .then(this.loadBooks)
        },
        getGoogleBooks(bookTitle) {
            bookService.searchBook(bookTitle)
                .then(books => {
                    this.googleBooks = books;
                    console.log(books);
                })
        },
        loadBooks() {
            bookService.query().then((books) => (this.books = books));
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;

            const searchStr = this.filterBy.title.toLowerCase();
            const minPrice = this.filterBy.priceMin
                ? this.filterBy.priceMin
                : 0;
            const maxPrice = this.filterBy.priceMax
                ? this.filterBy.priceMax
                : Infinity;

            const booksToShow = this.books.filter((book) => {
                return (
                    book.title.toLowerCase().includes(searchStr) &&
                    book.listPrice.amount >= minPrice &&
                    book.listPrice.amount <= maxPrice
                );
            });
            return booksToShow;
        },
    },
};
