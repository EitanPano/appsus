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
    sendEmail,
    removeEmail,
    toggleRead,
};

function query(filterBy = null) {
    return storageService.query(EMAILS_KEY).then((mails) => {
        if (!filterBy) return mails;
        return mails.filter((mail) => {
            return mail
        });
    });
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function sendEmail(newEmail) {
    newEmail.id = utilService.makeId();
    newEmail.isRead = false;
    newEmail.sentAt = Date.now();
    return storageService.post(EMAILS_KEY, newEmail).then(query);
}

function toggleRead(emailId, isRead) {
    return getById(emailId).then((email) => {
        email.isRead = isRead;
        return storageService.put(EMAILS_KEY, email);
    });
}

function removeEmail(emailId) {
    return storageService.remove(EMAILS_KEY, emailId);
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
            sentAt: 1159139990594,
        },
        {
            id: utilService.makeId(),
            from: 'Shira Mualemz',
            to: 'momo@momo.com',
            subject: 'Would you like to buy our product?',
            body: "Your subscription has ended, please notice you won't be able to use our services from now on.",
            isRead: true,
            sentAt: 1551195130594,
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            isRead: false,
            sentAt: 1544441250594,
        },
    ];
    utilService.saveToStorage(EMAILS_KEY, emails);
}
