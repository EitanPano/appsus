export default {
    template: `
    <header class="app-header">
        <h1><a class="logo" href="">Appsus</a></h1>
        <nav>
            <ul class="main-nav" :class="menuOpen" @click="toggleMenu">
                <li><router-link to="/" exact>Home</router-link></li>
                <li><router-link to="/mail">Mail</router-link></li>
                <li><router-link to="/keep">Keep</router-link></li>
                <!-- <li><router-link to="/book">Books</router-link></li> -->
                <li><router-link to="/about">About</router-link></li>
            </ul>
        </nav>
        <div class="burger-menu" @click="toggleMenu" :class="menuOpen">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </header>
    `,
    data() {
        return {
            isMenuOpen: false,
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
    },
    computed: {
        menuOpen() {
            return this.isMenuOpen ? 'menu-open' : '';
        },
    },
};
