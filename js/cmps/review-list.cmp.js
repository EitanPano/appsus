import reviewPreview from './review-preview.cmp.js'

export default {
    props: ['reviews'],
    components: {
        reviewPreview
    },
    template: `
    <section class="review-list">
        <h2>Readers Reviews</h2>
        <ul>
            <template v-for="review in reviews">
                <review-preview @removed="remove" :key="review.id":review="review" />
            </template>
        </ul>
    </section>
    `,
    methods: {
        remove(review) {
            this.$emit('removed', review)
        }
    },
}