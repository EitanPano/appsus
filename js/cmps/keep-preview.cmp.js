import { keepService } from '../services/keep-service.js'; 

const noteTxt = {
    props: ['data'],
    template: `
        <div class="note note-txt">
            <h4>
                {{data.info.title}}
            </h4>
            <p>
                {{data.info.txt}}
            </p>
        </div>
    `,
    data() {
        return {
           
        };
    },
    methods: {
        
    }
};
const noteImg = {
    props: ['data'],
    template: `
        <div class="note note-img">
            <img :src= "data.info.url">
            <h4>
                {{data.info.title}}
            </h4>
            <p>
                {{data.info.txt}}
            </p> 
        </div>
    `
};
const noteTodos = {
    props: ['data'],
    template: `
        <div class="note note-todos">
            <h4>
                {{data.info.title}}
            </h4>
            <ul>
                <li v-for="(todo,idx) in data.info.todos">
                    <input type="checkbox" :id="'todo-'+data.id+'-'+idx" :checked="todo.isCompleted" @click="onToggleCompleted(todo)">
                    <label :for="'todo-'+data.id+'-'+idx" :class="{'line-through': todo.isCompleted}" v-if=""> {{todo.txt }}</label>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {

        }
    },
    methods: {
        onToggleCompleted(todo) {
            todo.isCompleted = !todo.isCompleted;
        }
    },
};
const noteVideo = {
    props: ['data'],
    template: `
        <div class="note note-video">
            <iframe width="100%" :src="data.info.url" allowfullscreen></iframe>
            <h4>
                {{data.info.title}}
            </h4>
            <p>
                {{data.info.txt}}
            </p> 
        </div>
    `
};


export default {
    components: {
        noteTxt,
        noteImg,
        noteTodos,
        noteVideo
    },
    props: ['note'],
    template:`
        <section class="keep-preview">
        <div class="keep-preview-container">
            <component 
                        :is="note.type" 
                        :data="note" 
                        >
            </component>
            <div >
                <ul v-for="(label, idx) in note.labels" class="labels-container">
                    <li class="note-label" :style="{'background-color': label.color}" @mouseover="isLabel=true" @mouseout="isLabel=false">
                        {{label.name}}
                        <i v-show="isLabel" @click="removeLabel(note.id, idx)" class="fas fa-times fa-xs"></i>
                    </li>
                </ul>
            </div>
        </div>

        </section>
    `,
    data() {
        return {
            isLabel: false
        }
    },
    methods: {
        removeLabel(noteId, labelIdx) {
            this.$emit ('removeLabel', noteId, labelIdx)
        }
    },
    computed: {
       
    }
  
}