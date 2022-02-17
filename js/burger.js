function base() {

    let menuContainer = document.getElementById('menu-container')
    let isOpen = false
    let themes = {
        true: 'dark_theme.css',
        false: 'light_theme.css'
    }
    let index = false;

    document.getElementById('burger-menu-button').onclick = () => {
        change_menu_visible()
    }

    document.getElementById('change-theme').onclick = () => {
        change_theme()
    }

    document.getElementById('change-lang').onclick = () => {
        change_lang()
    }

    function change_menu_visible() {

        menuContainer.classList = isOpen ? 'menu-container menu-active' : 'menu-container'
        isOpen = !isOpen
    }

    function change_theme() {
        let curr_theme = document.getElementById('curr-theme')

        let new_href = curr_theme.href.split('/')

        new_href = new_href.splice(0, new_href.length - 1)
        curr_theme.href = [...new_href, ...[themes[index]]].join('/')

        let footer_links = document.getElementById('footer-links').children
        for (let i = 0; i < footer_links.length; i++) {
            let img = footer_links[i].children[0].children[0]
            img.src = !index ? img.currentSrc.replace('white', 'black') : img.currentSrc.replace('black', 'white')
        }
        let menuImg = document.getElementById('burger-menu-button').children[0]
        menuImg.src = !index ? menuImg.currentSrc.replace('white', 'black') : menuImg.currentSrc.replace('black', 'white')
        document.getElementById('change-theme').children[0].textContent = !index ? 'Light' : 'Dark'

        index = !index
    }

    function change_lang() {
        alert('Простите, но эта функция сейчас недоступна')
    }
}

base()