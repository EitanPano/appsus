import { keepService } from '../services/keep-service.js';
import keepList from '../cmps/keep-list.cmp.js';
import keepAdd from '../cmps/keep-add.cmp.js';
import keepSearch from '../cmps/keep-search.cmp.js';



export default {
    components: {
        keepList,
        keepAdd,
        keepSearch

    },
    template: `
        <section class="keep-app app-main">
            <div class="search-note">
                <keep-search @setFilter="setFilter"/>
            </div>

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
                <keep-list :notes="pinnedNotes"  @remove="removeNote" @color="changeNoteBgc" @pin="togglePin" 
                    @addLabel="addLabel" @removeLabel="removeLabel" @duplicate="duplicateNote"/>
            </section>
            <section class="unpinned-notes">
                <h3>Notes:</h3>  
                <div class="unpinned-notes-container">
                    <keep-list :notes="unpinnedNotes"  @remove="removeNote" @color="changeNoteBgc" @pin="togglePin" 
                        @addLabel="addLabel" @removeLabel="removeLabel" @duplicate="duplicateNote"/>
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
            type: 'noteTxt',
            filterBy: {
                searchStr: '',
                noteType: 'all',
            },
        };
    },
    created() {
        this.loadNotes();
        this.note = keepService.getEmptyNote();
    },
    methods: {
        loadNotes() {
            keepService.query(this.filterBy)
                .then(notes => this.notes = notes.reverse())
        },
        setFilter({searchStr, noteType}) {
            this.filterBy = { ...this.filterBy, searchStr, noteType };
            this.loadNotes();
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
        duplicateNote(note) {
            keepService.duplicateNote(note)
                .then(newNote => {
                    this.notes.unshift(newNote)
                })
        },
        changeNoteBgc(noteId, color) {
            keepService.changeColor(noteId, color)
                .then(updatedNote => {
                    this.notes = this.notes.map(note => note.id === noteId ? updatedNote : note)
                })
        },
        addLabel(noteId, labelName, labelColor) {
            keepService.addLabel(noteId, labelName, labelColor)
                .then(updatedNote => {  
                    this.notes = this.notes.map(note => note.id === noteId ? updatedNote : note)
                })
        },
        removeLabel(noteId, labelIdx) {
            keepService.removeLabel(noteId, labelIdx)
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
