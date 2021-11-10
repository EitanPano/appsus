
const noteTxt = {
    props: ['data'],
    template: `
        <div class="note note-txt">
            <h4>
                {{data.title}}
            </h4>
            <p>
                {{data.txt}}
            </p>
        </div>
    `,
    data() {
        return {
           
        };
    },
    methods: {
        
    }
};
const noteImg = {
    props: ['data'],
    template: `
        <div class="note note-img">
            <img :src= "data.url">
            <h4>
                {{data.title}}
            </h4>
            <p>
                {{data.txt}}
            </p> 
        </div>
    `
};
const noteTodos = {
    props: ['data'],
    template: `
        <div class="note note-todos">
            <h4>
                {{data.title}}
            </h4>
            <ul>
                <li v-for="todo in data.todos">
                {{todo.txt}}
                </li>
            </ul>
        </div>
    `
};


export default {
    components: {
        noteTxt,
        noteImg,
        noteTodos
    },
    props: ['note'],
    template:`
        <section class="keep-preview">
        <div >
            <component 
                        :is="note.type" 
                        :data="note.info" 
                        >
            </component>
        </div>

        </section>
    `,
    created() {
        console.log(this.note);
    }
  
}