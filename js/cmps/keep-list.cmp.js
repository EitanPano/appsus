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
                <!-- <router-link :to="'/keep/'+note.id"> -->
                <keep-preview @click.native="openEdit(idx)" :note="note" />
                <!-- </router-link> -->
                
                <article :note="note" class="keep-edit" v-if="idx === editedNoteIdx && isEdit">
                    <div>
                    <button @click="isEdit=false">dgd</button>
                        <keep-add :note="note" :isEdit="isEdit"/>

                    </div>
                    
                </article>
                <div class="actions" v-show="idx === hoveredNoteIdx" >
                    <div class="pin-action">
                        <i title="Pin note" class="fas fa-thumbtack" @click="pin(note.id)"  @mouseover="isColors=false"></i>
                    </div>
                    <div class="right-actions">
                        <i title="Change note color" class="fas fa-palette info colors dropdown" @mouseover="isColors=true">
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
                        <i title="Edit note" class="fas fa-edit" @mouseover="isColors=false"></i>    
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
            isEdit: null,
            isColors: false,
        };
    },
    computed: {},
    methods: {
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
    },
};
