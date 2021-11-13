// import { eventBus } from '../services/event-bus-service.js';
import { utilService } from '../services/util-service.js';
import keepPreview from "./keep-preview.cmp.js";
import keepAdd from "./keep-add.cmp.js";

export default {
    components: {
        keepPreview,
        keepAdd,
    },
    props: ["notes"],
    template: `
        <section class="keep-list">
            <ul class="keep-list-container">
            <li v-for="(note,idx) in notes" :key="note.id" class="note-preview-container" :style="{'background-color': note.style.backgroundColor}"  @mouseover="hoveredNoteIdx = idx" @mouseout="hoveredNoteIdx = -1">
                <keep-preview :note="note" />
                <div v-if="idx === editedNoteIdx && isEdit" class="keep-edit">
                    <keep-add :noteToEdit="note"  @addNote="addNote" @close="isEdit=false"/>
                </div>
                <div class="actions" v-show="idx === hoveredNoteIdx" >
                    <i title="Pin note" class="fas fa-thumbtack" @click="pin(note.id)"  @mouseover="isColors=false"></i>
                    <div class="right-actions">
                        <i title="Add label" class="fas fa-tag" @mouseover="manageActions"></i>
                        <i title="Change note color" class="fas fa-palette info colors dropdown" @mouseover="isColors=false">
                            <div class="dropdown-content" v-show="isColors" @mouseout="isColors=false">
                                <span @click="color(note.id, $event)" class="" style="background-color: #ffffff;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #f28b82;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #fbbc04;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #fff475;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #ccff90;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #a7ffeb;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #cbf0f8;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #aecbfa;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #d7aefb;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #fdcfe8;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #e6c9a8;"> &nbsp; </span>
                                <span @click="color(note.id, $event)" class="" style="background-color: #e8eaed;"> &nbsp; </span>
                            </div>  
                        </i>
                        <i title="Edit note" class="fas fa-edit" @mouseover="isColors=false" @click="openEdit(idx)"></i>    
                        <i title="Compose as Email" @click="composeNote(note)" class="fas fa-paper-plane"></i>
                        <i title="Delete note" class="far fa-trash-alt" @click="remove(note.id)"></i>
                    </div>
                </div>
            </li>
        </ul>
        </section>
    `,
    data() {
        return {
            hoveredNoteIdx: -1,
            editedNoteIdx: -1,
            isEdit: false,
            isColors: false,
            isLabels: false
        };
    },
    computed: {},
    methods: {
        addNote() {
            this.isEdit = false;
            this.editedNoteIdx = -1;    
        },
        remove(noteId) {
            this.$emit("remove", noteId);
        },
        color(noteId, e) {
            const color = e.srcElement.style.backgroundColor;
            this.$emit("color", noteId, color);
        },
        pin(noteId) {
            this.$emit("pin", noteId);
        },
        openEdit(idx) {
            this.isEdit = true;
            this.editedNoteIdx = idx;
        },
        manageActions() {
            isColors = false;
            isLabels = true;
        },
        composeNote(note) {
            utilService.saveToStorage('noteToCompose', note)
            this.$router.push('/email')
            // eventBus.$emit('composeNote', note, true)
        },
    }
    
};
