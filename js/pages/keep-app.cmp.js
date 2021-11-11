import { keepService } from '../services/keep-service.js';
import keepList from '../cmps/keep-list.cmp.js';
import keepAdd from '../cmps/keep-add.cmp.js';


export default {
    components: {
        keepList,
        keepAdd
    },
    template:`
        <section class="keep-app app-main">
            
            <keep-add  @add="addNote"/>
            <section class="pinned-notes" v-if="pinnedNotes.length>0">
                <h3>Pinned Notes:</h3>  
                <keep-list :notes="pinnedNotes"  @remove="removeNote" @color="changeNoteBgc" @pin="togglePin" />
            </section>
            <section class="unpinned-notes">
                <h3>Notes:</h3>  
                <keep-list :notes="unpinnedNotes"  @remove="removeNote" @color="changeNoteBgc" @pin="togglePin" />
            </section>
        </section>
    `,
     data() {
        return {
            notes: [],
            filterBy: null,
            
        };
    },
    created() {
        this.loadNotes();
    },
    methods: {
        loadNotes() {
            keepService.query()
                .then(notes => this.notes = notes)
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
                .then(note => this.notes.push(note));
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
