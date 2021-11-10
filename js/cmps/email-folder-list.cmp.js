export default {

    template: `
        <aside class="email-folder-list">
            <div @click="$emit('compose')" class="btn-compose">
                <p class="plus">+</p>
                <p>Compose</p>
            </div>
            <h3>EMAIL ASIDE...</h3>
        </aside>
    `,
};
