export default {
    props: ['review'],

    template: `
        <li class="review-preview flex space-between">
            <div class="review-info">
                <p>{{ review.name }}</p>
                <p>{{ review.rating }}</p>
                <p>{{ review.date }}</p>
            </div>
            <p v-if="review.text" class="review-text text-left">{{ review.text }}</p>
            <button @click="remove(review)">x</button>
        </li>
    `,
    created() {
        console.log(this.review);
    },
    methods: {
        remove(review) {
            this.$emit('removed', review);
        }
    }
}