const switcher = document.querySelector('.switch-block__switcher')
const filter = document.querySelector('.filter')
const filterInput = [...document.querySelectorAll('.filter__input')]
const main = document.querySelector('.main')
const header = document.querySelector('.header')


switcher.addEventListener('click', (evt) => {
    console.log('click')
    evt.target.classList.toggle('switch-block__switcher_on')

    if(evt.target.classList.contains('switch-block__switcher_on')) {
        filterInput.forEach(item => {
            item.style.backgroundColor = "#19202D"
            item.style.color = "#fff"
        })

        main.style.backgroundColor = "#121721"
        header.style.backgroundColor = "#121721"
        
    } else {
        filterInput.forEach(item => {
            item.style.backgroundColor = "#fff"
            item.style.color = "#19202D"
        })

        main.style.backgroundColor = "#F4F6F8"
        header.style.backgroundColor = "#F4F6F8"
    }
})