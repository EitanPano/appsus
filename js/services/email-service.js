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
    trashEmail,
    removeEmail,
    toggleRead,
    toggleStarred,
};

function query(filterBy = null) {
    return storageService.query(EMAILS_KEY).then((mails) => {
        if (!filterBy) return mails;

        let searchStr = filterBy.searchStr.toLowerCase() || '';

        if (filterBy.isRead !== 'all') {
            let isRead = filterBy.isRead === 'read' ? true : false;
            mails = mails.filter((email) => email.isRead === isRead);
        }
        if (filterBy.status === 'inbox') {
            return mails.filter(
                (mail) => mail.from !== loggedinUser.email && mail.status!== 'trash' && searchFilter(mail, searchStr)
            );
        }
        else if (filterBy.status === 'starred') {
            return mails.filter(
                (mail) => mail.isStarred && searchFilter(mail, searchStr)
            );
        }
        else if (filterBy.status === 'sent') {
            return mails.filter(
                (mail) => mail.from === loggedinUser.email && searchFilter(mail, searchStr)
            );
        }
        if (filterBy.status === 'trash') {
            return mails.filter(
                (mail) => mail.status === 'trash' && searchFilter(mail, searchStr)
            );
        }
        return mails.filter((mail) => {
            return (
                mail.status === filterBy.status && searchFilter(mail, searchStr)
            );
        });
    });
}

function searchFilter(mail, searchStr) {
    return (
        mail.subject.toLowerCase().includes(searchStr) ||
        mail.body.toLowerCase().includes(searchStr)
    );
}

function getById(emailId) {
    return storageService.get(EMAILS_KEY, emailId);
}

function sendEmail(newEmail) {
    newEmail.id = utilService.makeId();
    newEmail.isRead = false;
    newEmail.sentAt = Date.now();
    // console.log(newEmail.imgUrl);
    return storageService.post(EMAILS_KEY, newEmail).then((res)=>query());
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

function trashEmail(emailId) {
    return getById(emailId).then((email) => {
        email.status = 'trash';
        return storageService.put(EMAILS_KEY, email)
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
            subject: 'It was a big pleasure doing business with you!',
            body: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
            imgUrl: 'https://www.americanmanufacturing.org/wp-content/uploads/2019/11/GettyImages-handshake-1050280678.jpg',
            sentAt: 1636800030594,
            isRead: true,
            isStarred: true,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Shira Mualemz',
            to: 'momo@momo.com',
            subject: 'Would you like to buy our product?',
            body: "Your subscription has ended, please notice you won't be able to use our services from now on.",
            
            sentAt: 1636800030594 - (100000000),
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
            sentAt: 1636800030594 - (100000000 *2),
            isRead: false,
            isStarred: false,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            sentAt: 1636800030594 - (100000000 *4),
            isRead: false,
            isStarred: false,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            sentAt: 1636800030594 - (100000000 *5),
            isRead: false,
            isStarred: true,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            sentAt: 1636800030594 - (100000000 *6),
            isRead: false,
            isStarred: false,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            sentAt: 1636800030594 - (100000000 *8),
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
            sentAt: 1636800030594 - (100000000 *11),
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
            sentAt: 1636800030594 - (100000000 *13),
            isRead: false,
            isStarred: false,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            sentAt: 1636800030594 - (100000000 *15),
            isRead: false,
            isStarred: false,
            status: 'inbox',
        },
        {
            id: utilService.makeId(),
            from: 'Avihai Mochi',
            to: 'momo@momo.com',
            subject: 'Hello Poopybutt',
            body: 'You may wipe better in order to not really change the subject',
            sentAt: 1636800030594 - (100000000 *15),
            isRead: false,
            isStarred: false,
            status: 'inbox',
        },
    ];
    utilService.saveToStorage(EMAILS_KEY, emails);
}
