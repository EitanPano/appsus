import imgFrame from '../cmps/img-frame.cmp.js';

export default {
    components: {
        imgFrame,
    },
    props: ['book'],
    template: `
    <article class="book-card">
        <router-link :to="'/book/'+book.id">
            <img-frame :book="book" :src="book.thumbnail"/>
            <p>{{ titleToShow }}</p>
            <p>{{ priceToShow }}</p>
        </router-link>
    </article>
    `,
    computed: {
        priceToShow() {
            const lang = this.book.language;
            const amount = this.book.listPrice.amount;
            const currency = this.book.listPrice.currencyCode;
            return (new Intl.NumberFormat('en', { style: 'currency', currency}).format(amount));
        },
        titleToShow() {
            return this.book.title.replace(/(?:^|\s)\S/g, (a) => { return a.toUpperCase()});
        }
    }
}