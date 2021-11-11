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
            <h3>KEEP APP...</h3>
            <keep-add  />
            
            <keep-list :notes="notes" @remove="removeNote" @color="changeNoteBgc"/>
        </section>
    `,
     data() {
        return {
            notes: null,
            filterBy: null,
            noteToEdit: null
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
            keepService.getById(noteId)
                .then(note => {
                    note.style.backgroundColor = color
                    console.log(note);
                    keepService.save(note)
                    .then(note => this.$router.go());
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
        }
    }
    
};
