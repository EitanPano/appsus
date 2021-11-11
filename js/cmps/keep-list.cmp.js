import keepPreview from './keep-preview.cmp.js';


export default {
    components: {
        keepPreview,
        
    },
    props: ['notes'],
    template:`
        <section class="keep-list">
          
            <ul class="note-list-container flex">
            <li v-for="note in notes" :key="note.id" class="note-preview-container" >
                <keep-preview :note="note" />
                
                <div class="actions">
                    <button @click="remove(note.id)" >X</button>
                    
                    <!-- <router-link :to="'/note/'+note.id + '/edit'" >Edit</router-link> -->
                </div>
            </li>
        </ul>

        </section>
    `,
     data() {
        return {
           
        };
    },
    methods: {
        remove(noteId) {
            this.$emit('remove', noteId);
            console.log();
        },
        
    },
}