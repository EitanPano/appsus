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
    changeColor,
    togglePin,
    addLabel,
    removeLabel,
    duplicateNote,
    composeEmail

};

function query(filterBy = {}) {
    return storageService.query(KEEP_KEY).then(notes => {
        if (!filterBy) return notes;

        let searchStr = filterBy.searchStr?.toLowerCase() || '';

        if (filterBy.noteType == 'all') {
            return notes.filter(note => {
                return searchFilter(note, searchStr)
            })
        }
        if (filterBy.noteType === 'notes') {
            return notes.filter(note =>
                note.type === 'noteTxt' && searchFilter(note, searchStr));
        }
        else if (filterBy.noteType === 'lists') {
            return notes.filter(note =>
                note.type === 'noteTodos' && searchFilter(note, searchStr));
        }
        else if (filterBy.noteType === 'image') {
            return notes.filter(note =>
                note.type === 'noteImg' && searchFilter(note, searchStr));
        }
        else if (filterBy.noteType === 'video') {
            return notes.filter(note =>
                note.type === 'noteVideo' && searchFilter(note, searchStr));
        }
    });
}

function searchFilter(note, searchStr) {
    return (
        note.info.title?.toLowerCase().includes(searchStr) ||
        note.info.txt?.toLowerCase().includes(searchStr) ||
        note.info.todos?.some(todo => {
            return todo.txt.toLowerCase().includes(searchStr)
        })
    );
}

function composeEmail(email) {
    const note = {
        id: '',
        type: 'noteTxt',
        isPinned: false,
        info: {
            title: email.subject,
            txt: `from: ${email.from}
            To: ${email.to}
            Sent at: ${_showSentAt(email.sentAt)}
            ${email.body}` 
        },
        labels: [],
        style: {
            backgroundColor: "#fff"
        }
    }
    return storageService.post(KEEP_KEY, note);
}

function remove(noteId) {
    // return Promise.reject('Big balagan!')
    return storageService.remove(KEEP_KEY, noteId);
}

function duplicateNote(note) {
    const newNote = { ...note }
    return storageService.post(KEEP_KEY, newNote);
}

function changeColor(noteId, color) {
    return getById(noteId)
        .then(note => {
            note.style.backgroundColor = color
            return storageService.put(KEEP_KEY, note);
        });
}

function addLabel(noteId, labelName, labelColor) {
    console.log(noteId);
    return getById(noteId)
        .then(note => {
            console.log(note);
            note.labels.push({ name: labelName, color: labelColor })
            return storageService.put(KEEP_KEY, note);
        });
}

function removeLabel(noteId, labelIdx) {
    return getById(noteId)
        .then(note => {
            note.labels.splice(labelIdx, 1)
            return storageService.put(KEEP_KEY, note);
        });
}

function togglePin(noteId) {
    return getById(noteId).then(note => {
        note.isPinned = !note.isPinned;
        return keepService.save(note)
    })
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
            type,
            isPinned: false,
            info: {
                title: "",
                txt: ""
            },
            labels: [],
            style: {
                backgroundColor: "#fff"
            }
        };
    else if (type === 'noteImg' || type === 'noteVideo')
        return {
            id: '',
            type,
            isPinned: false,
            info: {
                url: "",
                title: "",
                txt: ""
            },
            labels: [],
            style: {
                backgroundColor: "#fff"
            }
        };
    else if (type === 'noteTodos')
        return {
            id: "",
            type,
            isPinned: false,
            info: {
                title: "",
                todos: []
            },
            labels: [],
            style: {
                backgroundColor: "#fff"
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
                labels: [
                    {
                        name: "later",
                        color: "#aecbfa"
                    },
                    {
                        name: "important",
                        color: "#aecbfa"
                    }
                ],
                style: {
                    backgroundColor: "#aecbfa"
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
                labels: [
                    {
                        name: "Inspo",
                        color: "#aecbfa"
                    }
                ],
                style: {
                    backgroundColor: "#fbbc04"
                }
            },
            {
                id: "n103",
                type: "noteTodos",
                isPinned: false,
                info: {
                    title: "I am type todos",
                    todos: [
                        { txt: "Driving liscence", isCompleted: false },
                        { txt: "Coding power", isCompleted: true }
                    ]
                },
                labels: [],
                style: {
                    backgroundColor: "#f28b82"
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

function _showSentAt(date) {
    return new Date(date).toLocaleDateString();
}
