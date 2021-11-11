export default {

    template: `
        <aside class="email-folder-list">
            <div @click="$emit('compose')" class="btn-compose">
                <p class="plus">+</p>
                <p>Compose</p>
            </div>
            <p @click="$emit('setStatus', 'inbox')">Inbox</p>
            <p @click="$emit('setStatus', 'starred')">Starred</p>
            <p @click="$emit('setStatus', 'sent')">Sent</p>
            <p @click="$emit('setStatus', 'trash')">Trash</p>
        </aside>
    `,
    methods: {

    }
};
