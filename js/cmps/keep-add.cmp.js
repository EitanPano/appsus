import { keepService } from '../services/keep-service.js';

export default {
    components: {
        keepService
    },
    props: [],
    template: `
        <section class="keep-add">
            <button @click="getNote('noteTxt')">noteTxt</button>
            <!-- <div v-if="note.type === 'noteTxt'"> -->
              <div>  
            <input type="text" v-model="note.info.title" placeholder="Title"/>
            <input type="text" v-model="note.info.txt" placeholder="Take a note..."/>
            <button @click="save">+</button>
            </div>
            <button @click="getNote('noteImg')">noteImg</button>
            <input type="text" v-model="note.info.url" placeholder="Enter image URL"/>
            
            
            <button @click="getNote(noteTodos)">noteTodos</button> -->
               

                

        </section>
    `,
    data() {
        return {
           
            note: null,

        };
    },
    created() {
        this.note = keepService.getEmptyNote()
    },
    methods: {
        getNote(type) {
            this.note = keepService.getEmptyNote(type)
        },
        save() {
            keepService.save(this.note)
                .then(car => this.$router.go());
        },
   

    },
}