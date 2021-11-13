import starSystem from '../cmps/star-system.cmp.js';

export default {
    components: {
        starSystem,
    },
    template: `
    <form class="review-add">
        <h2>Review This Book</h2>
        <star-system @rated="setRating"/>
        <label class="input-container" for=""><input v-model="review.name" type="text" placeholder="Reader's name"></label>
        <label class="input-container" for="">Read at: <input v-model="review.date" type="date"></label>
        <textarea v-model="review.text" rows="4" cols="50" placeholder="Enter your revew right here..." maxlength="220">
        </textarea>
        <button @click.prevent="addReview">Submit</button>
    </form>
    `,
    data() {
        return {
            review: {
                name: '',
                rating: null,
                date: null,
                text: '',
            },
        };
    },

    methods: {
        addReview() {
            if (!this.review.name || !this.review.rating) return;
            this.review.date = this.review.date ? this.review.date : new Date().toLocaleDateString();
            this.$emit('add', this.review);
        },
        setRating(val) {
            this.review.rating = val;
        },
    },
};
