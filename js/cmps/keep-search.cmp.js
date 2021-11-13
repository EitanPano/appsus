
export default {
    components: {
        
    },
    props: [],
    template: `
        <section class="keep-search">
            <label>🔍<input @input.lazy="changeFilter" v-model="filterBy.searchStr" type="search" placeholder="Search note"></label>
                <select v-model="filterBy.noteType" @change="changeFilter">
                    <option value="all">All</option>
                    <option value="notes">Notes</option>
                    <option value="lists">Lists</option>
                    <option value="image">Notes with image</option>
                    <option value="video">Notes with video</option>
                </select>   
        </section>
    `,
    data() {
        return {
            filterBy: {
                searchStr: '',
                noteType: 'all',
            },
        };
    },
    methods: {
        changeFilter() {
            this.$emit('setFilter', this.filterBy)
        },
    },

}