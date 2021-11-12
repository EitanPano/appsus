// import { emailService } from '../services/email-service.js';
import { eventBus } from '../services/event-bus-service.js';
import emailFilter from '../cmps/email-filter.cmp.js';
import emailFolderList from '../cmps/email-folder-list.cmp.js';
import emailList from '../cmps/email-list.cmp.js';
import emailCompose from '../cmps/email-compose.cmp.js';

export default {
    name: 'emailApp',
    components: {
        emailList,
        emailFolderList,
        emailFilter,
        emailCompose,
    },
    template: `
        <section class="email-app app-main">
            <email-folder-list @setStatus="setStatus" @compose="toggleCompose" />
            <router-view></router-view>
        </section>
    `,
    data() {
        return {
            status: 'inbox',
            isCompose: null,
        };
    },
    created() {
    },
    methods: {
        toggleCompose(){
            this.isCompose = !this.isCompose
            eventBus.$emit('toggleCompose',this.isCompose)
        },
        setStatus(status) {
            // this.$router.push(`/email/${status}`).catch(()=>{})
            eventBus.$emit('setStatus',status)
            this.status =  status 
        },
    }
};
