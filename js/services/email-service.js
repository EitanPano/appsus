import { utilService } from './util-service.js';
import { storageService } from './async-storage-service.js';

const loggedinUser = {
    email: 'momo@momo.com',
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
    toggleStarred,
};

function query(filterBy = null) {
    return storageService.query(EMAILS_KEY).then((mails) => {
        let searchStr = filterBy.searchStr.toLowerCase();
        if (!filterBy) return mails;
        console.log(mails);
        console.log(`filterBy.status`, filterBy.status)
        console.log(`filterBy.isStarred`, filterBy.isStarred)

        if (filterBy.isRead !== 'all') {
            let isRead = filterBy.isRead === 'read' ? true : false;
            mails = mails.filter((email) => email.isRead === isRead);
        }
        console.log(filterBy);
        if (filterBy.status === 'starred') {
            return mails.filter((mail) => mail.isStarred);
        }
        
        return mails.filter((mail) => {
            return  (

                mail.status === filterBy.status &&
                (mail.subject.toLowerCase().includes(searchStr) ||
                    mail.body.toLowerCase().includes(searchStr))
            );
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

function toggleStarred(emailId, isStarred) {
    return getById(emailId).then((email) => {
        email.isStarred = isStarred;
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
            sentAt: 1159139990594,
            isRead: false,
            isStarred: false,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Shira Mualemz',
            to: 'momo@momo.com',
            subject: 'Would you like to buy our product?',
            body: "Your subscription has ended, please notice you won't be able to use our services from now on.",
            sentAt: 1551195130594,
            isRead: true,
            isStarred: false,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            sentAt: 1544441250594,
            isRead: false,
            isStarred: true,
            status: 'inbox',
        },
    ];
    utilService.saveToStorage(EMAILS_KEY, emails);
}
