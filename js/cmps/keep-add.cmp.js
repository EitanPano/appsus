import { keepService } from '../services/keep-service.js';


export default {
    components: {
        keepService
    },
    props: ['type', 'noteToEdit'],
    template: `
        <section class="keep-add">
            <i class="far fa-times-circle hoverable" @click="close"></i>
            <input type="text" ref="titleInput" v-model="note.info.title" placeholder="Title"/>
            <div v-if="note.type === 'noteTxt'">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..."/>
               
            </div>
            <div v-if="note.type === 'noteImg'">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..."/>
                <input type="text" v-model="note.info.url" placeholder="Enter image URL"/>
            </div>
            <div v-if="note.type === 'noteTodos'">
                <div class="todoList" style="display:flex; flex-direction:column;">
                    <div>
                        <input type="text" v-model="todoTxt" @keyup.enter="addTask" placeholder="New task">
                        <i class="fas fa-plus" @click="addTask"></i>
                    </div>
                        <input v-for="todo in note.info.todos" type="text" :value="todo.txt" @keyup.enter="addTask" placeholder="New task">
                </div>
            </div>
            <button @click="add" class="add-btn">Add Note</button>
        </section>
    `,
    data() {
        return {
            note: null,
            todoTxt: ''
        };
    },
    created() {
        if(!this.noteToEdit) {
            this.getNote(this.type);
        } else {
            this.note = this.noteToEdit;
        }
    },
    mounted() {
        this.$refs.titleInput.focus()  
    },
    methods: {
        getNote(type) {
            this.note = keepService.getEmptyNote(type)
        },
        add() {
           this.$emit('add', this.note);
        },
        close() {
            this.$emit('close')
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