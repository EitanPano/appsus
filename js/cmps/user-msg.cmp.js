import { eventBus } from '../services/event-bus-service.js';

export default {
    template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{showSign}}</p>
            <p>{{msg.type}}</p>
            <p>{{msg.txt}}</p>
            <router-link v-if="msg.link" :to="msg.link">Check it Out</router-link>
        </div>
    </transition>
    `,
    data() {
        return {
            msg: null,
        };
    },
    created() {
        eventBus.$on('showMsg', this.showMsg);
    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        },
    },
    destroyed() {
        eventBus.$off('showMsg', this.showMsg);
    },
    computed: {
        showSign() {
            return (this.msg.type === 'success') ? '✔' : '❌';
        }
    }
};
