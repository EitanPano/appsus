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
            <div class="add-container">
                <div class="add-note-actions">
                    <input ref="noteTxt" class="noteTxt" type="text" placeholder="Take a note..." @click="getNote('noteTxt')"/> 
                    <div class="fas-box" style="font-size: 0.5rem;">
                        <i class="far fa-check-square fa-3x hoverable" title="New list" @click="getNote('noteTodos')"></i>
                        <i class="far fa-images fa-3x hoverable" title="New note with image" @click="getNote('noteImg')"></i>
                        <i class="fab fa-youtube fa-3x hoverable" title="New note with video" @click="getNote('noteVideo')"></i>
                    </div>              
                    <div v-if="isClicked" class="keep-edit">
                        <keep-add :type="type"  @addNote="addNote" @close="isClicked=false"/>
                    </div>
                </div>
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
                .then(notes => this.notes = notes.reverse())
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
            this.$refs.noteTxt.value = ''
            this.notes.unshift(newNote)
            this.isClicked = false;
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
