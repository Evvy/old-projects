
const experienceToLevel = (level) => {
    let summation = 0
    for (let x = 1; x <= level - 1; x++) {
        summation += Math.floor(x + 300 * Math.pow(2, x / 7))
    }
    return Math.floor(summation * .25)
}

const experienceNeeded = (currentExperience, targetLevel, multiplier) => {
    return Math.floor((experienceToLevel(targetLevel) - currentExperience) / multiplier)
}

const itemsNeeded = (unitExperience, experienceNeeded) => {
    return Math.ceil(experienceNeeded / unitExperience)
}

const getFormData = form => {
    const formData = [];
    [...form.elements].forEach(element => {
        if (element.nodeName !== 'INPUT') return
        if (element.hasAttribute('disabled')) return
        if (element.name === 'btnradio' && !element.checked) return
        formData.push(parseInt(element.value))
    })
    return formData
}

const showResult = (result) => {
    const [experience, level] = result
    const p = document.querySelector('p#result')
    p.style.margin = '0'
    p.innerText = `It takes ${experience} action(s) to achieve level ${level}.`
}

const form = document.querySelector('form#calculator')
form.addEventListener('submit', event => {
    event.preventDefault()
    const [currentExperience, targetLevel, unitExperience, multiplier] = getFormData(form)
    const expNeeded = experienceNeeded(currentExperience, targetLevel, multiplier)
    showResult([itemsNeeded(unitExperience, expNeeded), targetLevel])
})
