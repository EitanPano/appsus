export default {
    template: `
    <header class="app-header">
        <!-- <h1><a class="logo" href=""></a></h1> -->
        <div class="logo"></div>
        <nav>
            <ul class="main-nav" :class="menuOpen" @click="toggleMenu">
                <li><router-link to="/" exact><i class="fas fa-home"></i></router-link></li>
                <li><router-link to="/email"><i class="far fa-envelope"></i></router-link></li>
                <li><router-link to="/keep"><i class="far fa-sticky-note"></i></router-link></li>
                <li><router-link to="/book"><i class="fas fa-book"></i></router-link></li>
                <li><router-link to="/about"><i class="far fa-address-card"></i></router-link></li>
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
