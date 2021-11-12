
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


export default {
    components: {
        noteTxt,
        noteImg,
        noteTodos
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
        </div>

        </section>
    `,
    created() {
        
    },
    computed: {
       
    }
  
}