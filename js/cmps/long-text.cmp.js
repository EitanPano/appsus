export default {
    props: ['txt'],
    template: `
    <div class="long-text">
        <p>{{textForDisplay}} <span v-if="!expandText && isLongTxt">...</span></p>
        <button v-if="isLongTxt" @click="toggleText">{{textButton}}</button>
    </div>
    `,
    data() {
        return {
            expandText: false,
        }
    },
    methods: {
        toggleText() {
            this.expandText = !this.expandText
        }
    },
    computed: {
        textForDisplay() {
            const textToShow = this.txt.charAt(0).toUpperCase() + this.txt.slice(1);
            return this.expandText ? textToShow : textToShow.slice(0, 100)
        },
        textButton() {
            return this.expandText ? 'less' : 'more'
        },
        isLongTxt() {   
            return this.txt.length > 100
        }
    }

}