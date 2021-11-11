import keepPreview from './keep-preview.cmp.js';


export default {
    components: {
        keepPreview,
        
    },
    props: ['notes'],
    template:`
        <section class="keep-list">
          
            <ul class="note-list-container flex">
            <li v-for="note in notes" :key="note.id" class="note-preview-container" :style="{'background-color': note.style.backgroundColor}">
                <keep-preview :note="note" />
                
                <div class="actions">
                    <button @click="remove(note.id)" >X</button>
                    <!-- <input type="color" name="noteBgc" @change="color(note.id)"> -->
                    <i title="Change note color" class="fas fa-palette info colors dropdown">
                    <div class="dropdown-content">
                    <span @click="color(note.id, $event)" class="" style="background-color: #ffffff;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #f28b82;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #fbbc04;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #fff475;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #ccff90;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #a7ffeb;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #cbf0f8;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #aecbfa;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #d7aefb;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #fdcfe8;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #e6c9a8;"> &nbsp; </span>
                    <span @click="color(note.id, $event)" class="" style="background-color: #e8eaed;"> &nbsp; </span>
                </div>
            </i>
                    
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
        },
        color(noteId, e){
            const color = e.srcElement.style.backgroundColor;
            this.$emit('color', noteId, color)
        }
    },
}