import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus',
};

const EMAILS_KEY = 'emails';
_createEmails();

export const emailService = {
    loggedinUser,
    query,
    getById,
    sendEmail
};

function query() {
    return storageService.query(EMAILS_KEY);
}

function getById(emailId) {
    return storageService.get(EMAILS_KEYS, emailId);
}

function sendEmail(newEmail) {
    newEmail.id = utilService.makeId();
    newEmail.isRead = false;
    return storageService.post(EMAILS_KEY, newEmail)
    .then(query);
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAILS_KEY);
    if (emails && emails.length) return;

    emails = [
        {
            id: utilService.makeId(),
            from: 'Nissim Kochi',
            to: 'momo@momo.com',
            subject: 'Hello Mr.Someone',
            body: 'Please contribute to our nigerian prince',
            isRead: false,
            sentAt: 1551133930594,
        },
        {
            id: utilService.makeId(),
            from: 'Shira Mualemz',
            to: 'momo@momo.com',
            subject: 'Hello Mr.Someone',
            body: "Your subscription has ended, please notice you won't be able to use our services from now on.",
            isRead: true,
            sentAt: 1551133930594,
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            isRead: false,
            sentAt: 1551133930594,
        },
    ];
    utilService.saveToStorage(EMAILS_KEY, emails);
}
