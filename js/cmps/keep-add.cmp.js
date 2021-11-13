import { keepService } from '../services/keep-service.js';


export default {
    components: {
        keepService
    },
    props: ['type'],
    template: `
        <section class="keep-add">
            <input type="text" v-model="note.info.title" placeholder="Title"/>
            <div v-if="type === 'noteTxt'">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..."/>
               
            </div>
            <div v-if="type === 'noteImg'">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..."/>
                <input type="text" v-model="note.info.url" placeholder="Enter image URL"/>
            </div>
            <div v-if="type === 'noteTodos'">
                <div class="todoList" style="display:flex; flex-direction:column;">
                    <div>
                        <input type="text" v-model="todoTxt" @keyup.enter="addTask" placeholder="New task">
                        <button @click="addTask" class="button"><i class="fa fa-plus"></i> Add</button>
                    </div>
                    <input v-for="todo in note.info.todos" type="text" :value="todo.txt" @keyup.enter="addTask" placeholder="New task">
                </div>
            </div>
            <button @click="add">+</button>
        </section>
    `,
    data() {
        return {
            note: null,
            todoTxt: ''
        };
    },
    created() {
        if(!this.id) {
            this.getNote(this.type);
        } else {
            this.getNoteById(this.id);
        }
    },
    methods: {
        getNote(type) {
            this.note = keepService.getEmptyNote(type)
        },
        add() {
           this.$emit('add', this.note);
        },
        addTask(){
            if(this.todoTxt === '') return;
            this.note.info.todos.push({
                txt: this.todoTxt, 
                isCompleted: false
            })
            this.todoTxt = ''
        },
    }
}