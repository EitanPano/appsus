import { keepService } from '../services/keep-service.js';


export default {
    components: {
        keepService
    },
    props: ['type', 'noteToEdit'],
    template: `
        <section class="keep-add">
            <i v-if="!noteToEdit" class="far fa-times-circle hoverable" @click="close"></i>
            <input type="text" ref="titleInput" v-model="note.info.title" placeholder="Title"/>
            <div v-if="note.type === 'noteTxt'">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..."/>
                <div >
                    <ul v-for="(label, idx) in note.labels" class="labels-container">
                        <li class="note-label" :style="{'background-color': label.color}" @mouseover="isLabel=true" @mouseout="isLabel=false">
                            {{label.name}}
                            <i v-show="isLabel" @click="removeLabel(note.id, idx)" class="fas fa-times fa-xs"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="note.type === 'noteImg' || note.type === 'noteVideo'">
                <input type="text" v-model="note.info.txt" placeholder="Take a note..."/>
                <input type="text" v-model="note.info.url" :placeholder="placeholderText"/>
                <div >
                    <ul v-for="(label, idx) in note.labels" class="labels-container">
                        <li class="note-label" :style="{'background-color': label.color}" @mouseover="isLabel=true" @mouseout="isLabel=false">
                            {{label.name}}
                            <i v-show="isLabel" @click="removeLabel(note.id, idx)" class="fas fa-times fa-xs"></i>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="note.type === 'noteTodos'">
                <div class="todoList" style="display:flex; flex-direction:column;">
                    <div>
                        <input type="text" v-model="todoTxt" @keyup.enter="addTask" placeholder="New task">
                        <i class="fas fa-plus" @click="addTask"></i>
                    </div>
                    <input v-for="todo in note.info.todos" type="text" :value="todo.txt" @keyup.enter="addTask" placeholder="New task">
                </div>
                <div >
                <ul v-for="(label, idx) in note.labels" class="labels-container">
                    <li class="note-label" :style="{'background-color': label.color}" @mouseover="isLabel=true" @mouseout="isLabel=false">
                        {{label.name}}
                        <i v-show="isLabel" @click="removeLabel(note.id, idx)" class="fas fa-times fa-xs"></i>
                    </li>
                </ul>
            </div>
            </div>
            <button @click="saveNote" class="add-btn">{{buttonText}}</button>
        </section>
    `,
    data() {
        return {
            note: null,
            todoTxt: '',
            isLabel: false
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
    computed: {
        buttonText() {
            return this.note.id ? 'Edit Note' : 'Add Note';
        },
        placeholderText(){
            return this.note.type === 'noteImg' ? 'Enter image URL' : this.note.type === 'noteVideo' ? 'Enter video URL' : ''
        }
    },
    methods: {
        getNote(type) {
            this.note = keepService.getEmptyNote(type)
        },
        saveNote() {
            keepService.save(this.note)
            .then(note => {
                this.$emit('addNote', note)
            });
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
        removeLabel(noteId, labelIdx) {
            keepService.removeLabel(noteId, labelIdx)
                .then(note => {
                    this.$emit('addNote', note)
                });
        }
    }
}