window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    // Sets the date input to today's date.
    const date = document.querySelector('input[id^="form-date"]')
    date.value = new Date().toISOString().split('T')[0]
});

// Toggles between a prefilled state or an empty state for the description input using a checkbox.
const descriptionCheckBox = document.querySelector('#form-description-checkbox')
const formDescription = document.querySelector('#form-description')
descriptionCheckBox.addEventListener('click', event => {
    descriptionCheckBox.checked ? formDescription.value = 'Invites starts at 19:00 - Bring consumables! 1 SR per person (MS > OS)' : formDescription.value = ''
})

// Gets form data and passes into a generate function that then returns the output to the user's clipboard.
const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault()
    // Retrieve image path based on what tab holds the 'active' class.
    const imagePath = document.querySelector('.tab-content .active.show > img').src
    const data = [imagePath, ...getFormData(form)]
    addToClipboard(generateCommand(data))
})

/*
    Filters through all form elements and checks if they match with element type of 'input'.
    If the element is of type 'input', it calls a validate function that needs to return with a valid value.
    If the element type is 'date', then it'll get formatted from yyyy-mm-dd to dd-mm-yyyy.
    Finally the values are pushed into an array and returned.
*/
const getFormData = form => {
    const formData = [];
    [...form.elements].filter(element => {
        if (['input'].includes(element.tagName.toLowerCase())) {
            if (validateFormElement(element) === undefined) return
            if (element.type === 'date') {
                formData.push(formatDate(element.value))
            } else {
                formData.push(element.value)
            }
        }
    })
    return formData
}


/*
    Checks if form elements meet the criterias below:
    Element DOES NOT contain:
        - An undefined value.
            * Used to avoid invalid form elements.
        - A null value.
            * Used to avoid invalid form elements.
        - The attribute 'disabled'.
            * Used to check if a given input/button is disabled.
        - The type of 'submit'.
            * Skips the main form submit button.
    Element DOES NOT have the correct class for the correct type:
        - Is a type of radio, but does not have the class of 'active'.
            * Makes sure that only the radio input with an active class is submitted.
*/
const validateFormElement = element => {
    if (element.hasAttribute('disabled')) return
    if (element.getAttribute('type') === 'submit') return
    if (element.getAttribute('type') === 'checkbox') return
    if (element.getAttribute('type') === 'radio' && !element.classList.contains('active')) return
    return element
}

// Reverses the date value from 'yyyy-mm-dd' to 'dd-mm-yyyy'.
const formatDate = date => {
    return date.toString().split("-").reverse().join("-")
}

// Takes a data parameter and destructures it to individual pieces and placed into the template literal.
const generateCommand = (data) => {
    const TEMPLATE_ID = 3;
    const [image, title, date, time, description] = data
    return `/quickcreate arguments:
        [template:${TEMPLATE_ID}]
        [time:${time}]
        [description:${description}]
        [image:${image}]
        [title:${title}]
        [date:${date}]
    `
};

// Takes an output and writes it to the user's clipboard.
const addToClipboard = output => {
    try {
        navigator.clipboard.writeText(output).then(function() {
            console.log('Success: Saved the output to the clipboard.')
            let timerInterval
            Swal.fire({
              title: 'Success!',
              icon: 'success',
              html: '<strong>The command has been copied to your clipboard.<br>To access it press CTRL + V.</strong><br><br>This window will auto-close in <b></b> seconds.',
              timer: 10000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                  b.textContent = (Swal.getTimerLeft() / 1000).toFixed()
                }, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
              }
            })
        })
    } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong when copying the command to your clipboard! \n Please try to generate a new command.',
          footer: 'Completely stuck? Hit Nimy up on Discord.'
        })
        console.log(`${error}: Couldn\'t save output to the clipboard.`)
    }
}
