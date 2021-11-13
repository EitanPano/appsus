import { bookService } from '../services/book-service.js';
import { eventBus } from '../services/event-bus-service.js';

import imgFrame from '../cmps/img-frame.cmp.js';
import longText from '../cmps/long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import reviewList from '../cmps/review-list.cmp.js';

export default {
    components: {
        imgFrame,
        reviewList,
        reviewAdd,
        longText,
    },
    template: `
    <section v-if="book" class="book-details app-main">
        <main class="main-container">
            <router-link class="back-to" to="/book"><< Back</router-link>
            <div class="main-frame flex">
                <router-link :to="'/book/'+prevBookId"><</router-link>
                <img-frame :book="book"/>
                <router-link :to="'/book/'+nextBookId">></router-link>
            </div>
            <div class="initial-details">
                <p>{{ titleToShow }}</p>
                <p>By {{ book.authors }}</p>
                <p :class="priceColor">{{ priceToShow }}</p>
            </div>
        </main>
        
        <hr>
        
        <div class="book-summary">
            <p>{{ bookAge }}</p>
            <p>Catagories: {{ book.categories }}</p>
            <long-text  :txt="book.description" />
        </div>
        
        <hr>
        
        <div class="book-description">
            <p>Languages: {{ book.language }}</p>
            <p>Publish: {{ book.publishedDate }}</p>
            <p>Pages: {{ book.pageCount }}</p>
            <p>{{ readingLevel }}</p>
            <p>Subtitles: {{ book.subtitle }}</p>
        </div>

        <hr>

        <review-list :reviews="book.reviews" @removed="deleteReview" />

        <review-add @add="addReview" />
        
    </section>
    `,
    data() {
        return {
            book: null,
            prevBookId: null,
            nextBookId: null,
            bookReview: null,
        };
    },
    methods: {
        addReview(review) {
            bookService.addReview(this.book.id, review).then((book) => {
                const msg = {
                    txt: 'Book ' + this.book.title + ' was successfully added',
                    link: '/book/' + this.book.id,
                    type: 'success',
                };
                eventBus.$emit('showMsg', msg);
                this.book = book;
                this.$router.push({ path: `/book` });
            })
            .catch(err => {
                const msg = {
                    txt: 'Something went wrong, Please try again later',
                    type: 'error',
                };
                eventBus.$emit('showMsg', msg);
            })
        },
        deleteReview(review) {
            bookService.removeReview(this.book.id, review.id).then((book) => {
                const msg = {
                    txt: review.name + "'s review has been removed",
                    type: 'success',
                };
                eventBus.$emit('showMsg', msg);
                this.book = book;
            });
        },
    },
    watch: {
        '$route.params.bookId': {
            handler() {
                const { bookId } = this.$route.params;
                bookService.getById(bookId)
                    .then(book => this.book = book);
                bookService.getNextBookId(bookId)
                    .then(bookId => this.nextBookId = bookId);
                bookService.getPrevBookId(bookId)
                    .then(bookId => this.prevBookId = bookId);
            },
            immediate: true
        }
    },

    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId).then((book) => (this.book = book));
    },

    computed: {
        titleToShow() {
            return this.book.title.replace(/(?:^|\s)\S/g, (a) => { return a.toUpperCase()});
        },
        readingLevel() {
            const pageCount = this.book.pageCount;
            if (pageCount > 500) return 'Long Reading';
            if (pageCount < 100) return 'Light Reading';
            else return 'Decent Reading';
        },
        bookAge() {
            // console.log(this.book);
            const publishedDate = this.book.publishedDate;
            const currYear = new Date().getFullYear();
            const yearsDiff = currYear - publishedDate;
            if (yearsDiff > 10) return 'Veteran Book';
            else if (yearsDiff < 1) return 'New Book!';
        },
        priceToShow() {
            const lang = this.book.language;
            const amount = this.book.listPrice.amount;
            const currency = this.book.listPrice.currencyCode;
            return new Intl.NumberFormat(lang, {
                style: 'currency',
                currency,
            }).format(amount);
        },
        priceColor() {
            if (this.book.listPrice.amount > 150) return 'expensive';
            else if (this.book.listPrice.amount < 20) return 'cheap';
        },
    },
    mounted() {
        window.scrollTo(0, 0);
    },
};
