import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const KEEP_KEY = 'notes';
_createNotes();


export const keepService = {
    query,
    remove,
    save,
    getEmptyNote,
    getById,
    add
};

function query(filterBy = {}) {
    return storageService.query(KEEP_KEY)
        .then(notes => {
            if (filterBy.topNotes) {
                notes = notes.slice(0, 2);
            }
            return notes;
        });
}

function remove(noteId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(KEEP_KEY, noteId);
}

function add(note) {

}

function save(note) {
    if (note.id) return storageService.put(KEEP_KEY, note);
    else return storageService.post(KEEP_KEY, note);
}

function getById(noteId) {
    return storageService.get(KEEP_KEY, noteId);
}

function getNextNoteId(noteId) {
    return query()
        .then(notes => {
            const idx = notes.findIndex(note => note.id === noteId);
            return (idx === notes.length - 1) ? notes[0].id : notes[idx + 1].id;
        });
}

function getEmptyNote(type = 'noteTxt') {
    if (type === 'noteTxt')
        return {
            id: '',
            type: "noteTxt",
            isPinned: true,
            info: {
                title: "",
                txt: ""
            },
            labels: [],
            style: {
                backgroundColor: "#00d"
            }
        };
    else if (type === 'noteImg')
        return {
            id: '',
            type: "noteImg",
            isPinned: false,
            info: {
                url: "",
                title: "",
                txt: ""
            },
            labels: [],
            style: {
                backgroundColor: "#00d"
            }
        };
    else if (type === 'noteTodos')
        return {
            id: "",
            type: "noteTodos",
            isPinned: false,
            info: {
                title: "",
                todos: [
                    { txt: "", doneAt: null },
                    { txt: "", doneAt: 187111111 }
                ]
            },
            labels: [],
            style: {
                backgroundColor: "#00d"
            }
        }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(KEEP_KEY);
    if (!notes || !notes.length) {
        notes = [
            {
                id: "n101",
                type: "noteTxt",
                isPinned: true,
                info: {
                    title: "I am type txt",
                    txt: "Fullstack Me Baby!"
                },
                labels: ["later", "important"],
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n102",
                type: "noteImg",
                isPinned: false,
                info: {
                    url: "https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__480.jpg",
                    title: "I am type img",
                    txt: ""
                },
                labels: ["inspo"],
                style: {
                    backgroundColor: "#00d"
                }
            },
            {
                id: "n103",
                type: "noteTodos",
                isPinned: false,
                info: {
                    title: "I am type todos",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                labels: ["important"],
                style: {
                    backgroundColor: "#00d"
                }
            }
        ];

        utilService.saveToStorage(KEEP_KEY, notes);
    }
    return notes;
}

function _createNote(vendor, maxSpeed = 250) {
    const note = {
        id: utilService.makeId(),
        vendor,
        maxSpeed,
    };
    return note;
}