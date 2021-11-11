import { keepService } from '../services/keep-service.js';


export default {
    components: {
        keepService
    },
    props: [],
    template: `
        <section class="keep-add">
            <input type="text" v-model="note.info.title" placeholder="Title"/>
            <div v-if="note.type === 'noteTxt'">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..." @click=""/>
            </div>
            <div v-if="note.type === 'noteImg'">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..." @click=""/>
                <input type="text" v-model="note.info.url" placeholder="Enter image URL"/>
            </div>
            <div v-if="note.type === 'noteTodos'">
                <div class="todoList" style="display:flex; flex-direction:column;">
                    <div>
                        <input type="text" v-model="todoTxt" @keyup.enter="addTask" placeholder="New task">
                        <button @click="addTask" class="button"><i class="fa fa-plus"></i> Add</button>
                    </div>
                        <input v-for="todo in note.info.todos" type="text" :value="todo.txt" @keyup.enter="addTask" placeholder="New task">
                </div>
            </div>
            <button @click="add">+</button>
            <button @click="getNote('noteTxt')">noteTxt</button>
            <button @click="getNote('noteImg')">noteImg</button>
            <button @click="getNote('noteTodos')">noteTodos</button>
        </section>
    `,
    data() {
        return {
            note: null,
            todoTxt: ''
        };
    },
    created() {
        this.note = keepService.getEmptyNote()
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