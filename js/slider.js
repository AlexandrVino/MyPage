function base() {

    let children = document.getElementById('slider-wrapper').children // берем слайдеры

    // расположение слайдеров
    let indexes = []
    for (let i = 0; i < children.length; i++) {
        indexes[i] = i
    }
    indexes = [indexes[indexes.length - 1], ...indexes.slice(0, -1)]

    let start_time = Date.now() // старт скрипта (чтобы не дать пользователю тыкать чаще, чем проходит анимация слайдера)
    let screenWidth, koef, kost

    resizeWindow(0)

    // подключаем функции при нажатии (стрелочки - право/лево)
    document.getElementById('prev').onclick = () => {
        change_pos(-2)
    }
    document.getElementById('next').onclick = () => {
        change_pos(2)
    }

    window.addEventListener('resize', resizeWindow)

    // ставил слайдеры
    set_slides_pos(children)

    function set_slides_pos(slides, pos = 0) {

        /*
        * функция движения слайдеров
        */

        for (let i = 0; i < indexes.length; i++) {

            slides[indexes[i]].classList = 'slider'
            if (pos === 0) {
                slides[indexes[i]].style.left = (i - 1) * koef + (screenWidth < 540 ? -260 : 0) + kost + 'px'
            } else {
                let start_pos = slides[indexes[i]].style.left.replace('px', '')
                let end_pos = (i - 1) * koef + (screenWidth < 540 ? -260 : 0) + kost
                animate(slides[indexes[i]], start_pos, end_pos)
            }

        }

        // изменяем классы слайдеров (чтобы не видеть, как с левого конца какой-либо слайдер двигается вправый)
        children[indexes[1]].classList = 'slider first'
        children[indexes[2]].classList = 'slider active'
        children[indexes[3]].classList = 'slider last'
        children[indexes[pos > 0 ? 0 : 4]].classList = 'slider first'
        children[indexes[pos < 0 ? 0 : 4]].classList = 'slider'
    }

    function animate(slide, start_pos, end_pos) {
        // функция анимашки из точки А в В
        slide.style.transform = `translate(${end_pos - start_pos + 'px'}, 0px)`
    }

    function change_pos(pos) {
        // функция, реагирущая на клик
        if (Date.now() - start_time > 700) {
            start_time = Date.now()
            indexes = pos > 0 ? indexes.slice(1, indexes.length).concat([indexes[0]]) : [indexes[indexes.length - 1], ...indexes.slice(0, -1)]
            children[indexes[indexes.length - 1]].style.left = -270 + 'px'
            set_slides_pos(children, pos)
        }
    }

    function resizeWindow(pos=1) {

        screenWidth = window.screen.width
        koef = 767 < screenWidth && screenWidth < 1000 ? 220 : 270
        kost = 767 < screenWidth && screenWidth < 1000 ? 10 : 5

        if (539 < screenWidth && screenWidth < 768) {
            koef = 160
            kost = -5
        }

        if (screenWidth < 540) {
            kost = 0
        }

        if (360 < screenWidth && screenWidth < 540) {
            document.getElementById('page_header').style.width = screenWidth - 12 + 'px'
        } else (
            document.getElementById('page_header').style.width = null
        )

        set_slides_pos(children, pos)
    }
}

base()