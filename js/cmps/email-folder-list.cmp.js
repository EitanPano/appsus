export default {
    template: `
        <aside class="email-folder-list">
            <div @click="$emit('compose')" class="btn-compose">
                <p class="plus">+</p>
                <p>Compose</p>
            </div>
            <a href="" autofocus @click.prevent="$emit('setStatus', 'inbox')"><i class="fas fa-inbox"></i>Inbox</a>
            <a href="" @click.prevent="$emit('setStatus', 'starred')"><i class="fas fa-star"></i>Starred</a>
            <a href="" @click.prevent="$emit('setStatus', 'sent')"><i class="fas fa-paper-plane"></i>Sent</a>
            <a href="" @click.prevent="$emit('setStatus', 'trash')"><i class="fas fa-trash"></i>Trash</a>
        </aside>
    `,
};
