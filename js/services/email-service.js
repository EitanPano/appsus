import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus',
};

const EMAIL_KEY = 'emails';
_createEmails();

export const emailService = {
    loggedinUser,
    query,
    getById,
};

function query() {
    return storageService.query(EMAIL_KEY);
}

function getById(emailId) {
    return storageService.get(EMAIL_KEY, emailId);
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_KEY);
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
            body: 'Your subscription has ended, please notice you won\'t be able to use our services from now on.',
            isRead: false,
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
    utilService.saveToStorage(EMAIL_KEY, emails);
}
