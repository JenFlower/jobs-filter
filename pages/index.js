const switcher = document.querySelector('.switch-block__switcher')
const filter = document.querySelector('.filter')
const filterInput = [...document.querySelectorAll('.filter__input')]
const main = document.querySelector('.main')
const header = document.querySelector('.header')
const vacations = [...document.querySelectorAll('.content__item')]

function vacationHover(item, mouse, colorName) {
    item.querySelector('.content__vacation').addEventListener(mouse, (evt) => {
        evt.target.style.color = colorName
    })
}

switcher.addEventListener('click', (evt) => {
    console.log('click')
    evt.target.classList.toggle('switch-block__switcher_on')

    if(evt.target.classList.contains('switch-block__switcher_on')) {
        filterInput.forEach(item => {
            item.style.backgroundColor = "#19202D"
            item.style.color = "#fff"
        })
        vacations.forEach(item => {
            item.querySelector('.content__vacation').style.color = "#fff"
            item.style.backgroundColor = "#19202D"

            vacationHover(item, 'mouseover', "#6E8098")
            vacationHover(item, 'mouseout', "#fff")
        })
        main.style.backgroundColor = "#121721"
        header.style.backgroundColor = "#121721"
        
    } else {
        filterInput.forEach(item => {
            item.style.backgroundColor = "#fff"
            item.style.color = "#19202D"
        })
        vacations.forEach(item => {
            item.querySelector('.content__vacation').style.color = "#19202D"
            item.style.backgroundColor = "#fff"

            vacationHover(item, 'mouseover', "#6E8098")
            vacationHover(item, 'mouseout', "#19202D")
        })

        main.style.backgroundColor = "#F4F6F8"
        header.style.backgroundColor = "#F2F2F2"
    }
})