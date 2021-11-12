import { keepService } from '../services/keep-service.js';
import keepList from '../cmps/keep-list.cmp.js';
import keepAdd from '../cmps/keep-add.cmp.js';



export default {
    components: {
        keepList,
        keepAdd,

    },
    template: `
        <section class="keep-app app-main">
            <input type="text" placeholder="Title" @click="getNote('noteTxt')"/>
            
            <!-- <button @click="getNote('noteTxt')">noteTxt</button> -->
            <button @click="getNote('noteImg')">noteImg</button>
            <button @click="getNote('noteTodos')">noteTodos</button>

            <div v-if="isClicked" class="keep-edit">
                <button @click="isClicked=false">dgd</button>
                <keep-add :type="type"  @add="addNote"/>
                
            </div>
            <section class="pinned-notes" v-if="pinnedNotes.length>0">
                <h3>Pinned Notes:</h3>  
                <keep-list :notes="pinnedNotes"  @remove="removeNote" @color="changeNoteBgc" @pin="togglePin" />
            </section>
            <section class="unpinned-notes">
                <h3>Notes:</h3>  
                <div class="unpinned-notes-container">
                    <keep-list :notes="unpinnedNotes"  @remove="removeNote" @color="changeNoteBgc" @pin="togglePin" />
                </div>
            </section>
        </section>
    `,
    data() {
        return {
            notes: [],
            filterBy: null,
            isClicked: false,
            note: null,
            type: 'noteTxt'
        };
    },
    created() {
        this.loadNotes();
        this.note = keepService.getEmptyNote();
    },
    methods: {
        loadNotes() {
            keepService.query()
                .then(notes => this.notes = notes)
        },
        getNote(type) {
            this.note = keepService.getEmptyNote(type)
            this.type = type
            this.isClicked = true
        },
        removeNote(id) {
            keepService.remove(id)
                .then(() => {
                    // const msg = {
                    //     txt: 'Deleted succesfully',
                    //     type: 'success'
                    // };
                    // eventBus.$emit('showMsg', msg);
                    this.notes = this.notes.filter(note => note.id !== id)

                })
                .catch(err => {
                    console.log('err', err);
                    // const msg = {
                    //     txt: 'Error. Please try later',
                    //     type: 'error'
                    // };
                    // eventBus.$emit('showMsg', msg);
                });
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        changeNoteBgc(noteId, color) {
            keepService.changeColor(noteId, color)
                .then(updatedNote => {
                    this.notes = this.notes.map(note => note.id === noteId ? updatedNote : note)
                })

        },
        addNote(newNote) {
            keepService.save(newNote)
            .then(note => {
                this.notes.push(note)
                this.isClicked = false;
            });
        },
        togglePin(noteId) {
            keepService.togglePin(noteId)
                .then(updatedNote => {
                    this.notes = this.notes.filter(note => note.id !== noteId)
                    this.notes.unshift(updatedNote);
                })

        }
    },
    computed: {
        notesToShow() {
            if (!this.filterBy) return this.notes;
            const searchStr = this.filterBy.title
            const notesToShow = this.notes.filter(note => {
                return note.info.title.toLowerCase().includes(searchStr)
            });
            return notesToShow;
        },
        pinnedNotes() {
            return this.notes.filter(note => note.isPinned)
        },
        unpinnedNotes() {
            return this.notes.filter(note => !note.isPinned)
        }
    },


};
