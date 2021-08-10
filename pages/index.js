import Api from '../scripts/Api.js'

const switcher = document.querySelector('.switch-block__switcher')
const filter = document.querySelector('.filter')
const filterInput = [...document.querySelectorAll('.filter__input')]
const main = document.querySelector('.main')
const header = document.querySelector('.header')
const vacations = Array.from(document.querySelectorAll('#content-item'))
const contentVacationList = document.querySelector('.content__list')
const checkFullTime = document.querySelector('.filter__input_full-time')
const inputLocation = document.querySelector('.filter__input_location')
const commonFilter = document.querySelector('.filter__input_common')
// const btnSearch = document.querySelector('.filter__submit_common')
const btnSearch = [...document.querySelectorAll('.filter__input_submit')]
// console.log(btnSearch)
function createVacation(item) {
    const templateVacation = document.querySelector('#content-template').content.querySelector('#content-item')
    const vacation = templateVacation.cloneNode(true)
    const vacationImage = vacation.querySelector('.content__image')
    vacationImage.src = item.img
    const time = vacation.querySelector('.content__posted_time')
    time.textContent = item.time
    const clock = vacation.querySelector('.content__posted_clock')
    clock.textContent = item.clock
    const shedule = vacation.querySelector('.content__shedule')
    shedule.textContent = item.graphik
    const vacationName = vacation.querySelector('.content__vacation')
    vacationName.textContent = item.vacation
    const company = vacation.querySelector('.content__company')
    company.textContent = item.company
    const location = vacation.querySelector('.content__location')
    location.textContent = item.location

    return vacation
}

// todo
// не работает слайс

const api = new Api()

function addVacation(item) {
    return contentVacationList.append(item)
}

function getStartedData() {
    api.getData()
        .then(res => {
            return renderCountData(res, 0, 12)
        })
        .then(res => res.forEach(item => {
            addVacation(createVacation(item))
        }))
}
getStartedData()



// количество отображаемых карточек
function renderCountData(res, from, to = 5) {
    contentVacationList.innerHTML = ''
    // res.forEach(item => {
    //     addVacation(createVacation(item))
    // })
    return res.slice(from, to)
}

function actualFilterStatus() {
    return {
        fulltime: checkFullTime.checked,
        location: inputLocation.value,
        common: commonFilter.value
    }
}

function filterData(res) {
    if(actualFilterStatus().fulltime) {
        return res.filter(x => 
            (x.vacation.toUpperCase().includes(actualFilterStatus().common.toUpperCase()) || x.company.toUpperCase().includes(actualFilterStatus().common.toUpperCase())) &&
            x.location.toUpperCase().includes(actualFilterStatus().location.toUpperCase()) &&
            x.graphik === 'Full Time')
    }
    else {
        return res.filter(x => 
            (x.vacation.toUpperCase().includes(actualFilterStatus().common.toUpperCase()) || x.company.toUpperCase().includes(actualFilterStatus().common.toUpperCase())) &&
            x.location.toUpperCase().includes(actualFilterStatus().location.toUpperCase()) )
    }
    
}



btnSearch.forEach(item => item.addEventListener('click', (evt) => {
    evt.preventDefault()
    api.getData()
        .then(res => filterData(res))
        .then(res => renderCountData(res, 0, 12))
}))

function vacationHover(item, mouse, colorName) {
    item.querySelector('.content__vacation').addEventListener(mouse, (evt) => {
        evt.target.style.color = colorName
    })
}



switcher.addEventListener('click', (evt) => {
    evt.target.classList.toggle('switch-block__switcher_on')
    // console.log(vacations)
    if(evt.target.classList.contains('switch-block__switcher_on')) {
        filterInput.forEach(item => {
            item.style.backgroundColor = "#19202D"
            item.style.color = "#fff"
        })
        document.querySelectorAll('#content-item').forEach(item => {
            item.querySelector('.content__vacation').style.color = "#fff"
            item.style.backgroundColor = "#19202D"
            // console.log(item)
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
        // console.log(vacations)
        document.querySelectorAll('#content-item').forEach(item => {
            item.querySelector('.content__vacation').style.color = "#19202D"
            item.style.backgroundColor = "#fff"
            // console.log(item)
            vacationHover(item, 'mouseover', "#6E8098")
            vacationHover(item, 'mouseout', "#19202D")
        })

        main.style.backgroundColor = "#F4F6F8"
        header.style.backgroundColor = "#F2F2F2"
    }
})


