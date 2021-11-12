import { emailService } from '../services/email-service.js';
import { eventBus } from '../services/event-bus-service.js';

export default {
    template:`
        <main v-if="email" class="app-main email-details">
            <div>
                <router-link class="back-to" to="/email">
                <i class="fas fa-long-arrow-alt-left"></i>
                &nbspBack</router-link>
                <h3 class="subject">{{ email.subject }}</h3>
                <p class="from">{{ email.from}}</p>
                <p class="body">{{ email.body }}</p>
                <hr>
                <img class="img" v-if="email.img" :src="email.img" alt="">
            </div>
        </main>
    `,
    data() {
        return {
            email: null
        }
    },
     created() {
        const  emailId  = this.$route.params;
        // console.log(emailId.id);
        emailService.getById(emailId.id).then((email) => {
            this.email = email
        });
        eventBus.$on('setStatus',(status)=>{
            this.$router.push('/email').catch(()=>{})
        })
    },
    destroyed(){
        eventBus.$off('mailStatus')
    }

}