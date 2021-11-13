export default {
    template: `
        <section class="home-page app-main">
            <section class="home-page-email">
                <div>
                    <p>
                        “What separates good content from great content is a willingness to take risks and push the envelope.
                        <br>— Brian Halligan, CEO & Co-founder, HubSpot
                    </p>
                </div>
                <router-link to="/email">
                    <img src="./img/email_enter.png" alt="asd">    
                </router-link>
            </section>
            <section class="home-page-note">
                <div >
                    <p>
                        “Be aware of the high notes, of the blissful faces and their soft messages, and listen for the silent message of a highly decorated gift.”
                        ― Dejan Stojanovic
                    </p>
                </div>
                <router-link to="/keep">
                    <img src="./img/note_enter.png" alt="asd">    
                </router-link>
            </section>
            <section class="home-page-book">
                <div>
                    <p>
                    “I guess a big part of serious fiction’s purpose is to give the reader, who like all of us is sort of marooned in her own skull, to give her imaginative access to other selves.”
                    – David Foster Wallace
                    </p>
                </div>
                <router-link to="/book">
                    <img class="book-svg" src="./img/book_enter.svg" alt="asd">    
                </router-link>
            </section>
        </section>
    `,
};
