import Api from '../scripts/Api.js'

const switcher = document.querySelector('.switch-block__switcher')
const filterInput = [...document.querySelectorAll('.filter__input')]
const main = document.querySelector('.main')
const body = document.querySelector('.body')

const header = document.querySelector('.header')
const contentVacationList = document.querySelector('.content__list')
const checkFullTime = document.querySelector('.filter__input_full-time')
const inputLocation = document.querySelector('.filter__input_location')
const commonFilter = document.querySelector('.filter__input_common')
const btnSearch = [...document.querySelectorAll('.filter__input_submit')]
const btnModal = document.querySelector('.filter__input_modal')

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

const api = new Api()

function addVacation(item) {
    return contentVacationList.append(item)
}

function drawCards() {
    api.getData()
        .then(res => {
            contentVacationList.innerHTML = ''
            return filterData(res)
        })
        .then(res => res.forEach(item => {
            addVacation(createVacation(item))
            checkTheme()   
        }))
         
}
// получение стартовых данных


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



function vacationHover(item, mouse, colorName) {
    item.querySelector('.content__vacation').addEventListener(mouse, (evt) => {
        evt.target.style.color = colorName
    })
}
function checkTheme() {
    if(switcher.classList.contains('switch-block__switcher_on')){
        filterInput.forEach(item => {
            item.style.backgroundColor = "#19202D"
            item.style.color = "#fff"
        })
        
        document.querySelectorAll('#content-item').forEach(item => {
            item.querySelector('.content__vacation').style.color = "#fff"
            item.style.backgroundColor = "#19202D"
            vacationHover(item, 'mouseover', "#6E8098")
            vacationHover(item, 'mouseout', "#fff")
        })
        body.style.backgroundColor = "#121721"
        header.style.backgroundColor = "#121721"
        
    } else {
        filterInput.forEach(item => {
            item.style.backgroundColor = "#fff"
            item.style.color = "#19202D"
        })
        document.querySelectorAll('#content-item').forEach(item => {
            item.querySelector('.content__vacation').style.color = "#19202D"
            item.style.backgroundColor = "#fff"
            vacationHover(item, 'mouseover', "#6E8098")
            vacationHover(item, 'mouseout', "#19202D")
        })

        body.style.backgroundColor = "#F4F6F8"
        header.style.backgroundColor = "#F2F2F2"
    }
}

switcher.addEventListener('click', (evt) => {
    evt.target.classList.toggle('switch-block__switcher_on')
    checkTheme()
})

btnSearch.forEach(item => item.addEventListener('click', (evt) => {    
    evt.preventDefault()
    drawCards()
}))

// btnModal.addEventListener(() => {
// })


drawCards()
