export default {
    props: ['book'],
    template: `
    <div class="img-frame img-container">
        <img :src="book.thumbnail" />
        <img class="sale-tag" :src="showSale">
    </div>
    `,
    computed: {
        showSale() {
            if (this.book.listPrice.isOnSale) return '../../img/sale.svg';
            else return '';
        },
    }
};
