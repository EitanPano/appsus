export default {
    template: `
        <div class="email-filter">
            <label>🔍<input @input.lazy="changeFilter" v-model="filterBy.searchStr" type="search" placeholder="Search mail"></label>
            <select v-model="filterBy.status" @change="changeFilter">
                <option value="all">All</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
            </select>
        </div>
    `,
    data() {
        return{
            filterBy: {
                searchStr: '',
                status: 'all'
            }
        }
    },
    methods: {
        changeFilter() {
           this.$emit('changed', this.filterBy) 
        }
    }
};