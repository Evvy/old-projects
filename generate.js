const dates = document.querySelectorAll('input[id^="date"]');
dates.forEach(date => {
    date.value = new Date().toISOString().split('T')[0];
});


const raids = [
    { id: 'kara',  title: 'Karazhan',                image: 'images/karazhan.jpg'},
    { id: 'gm',    title: 'Gruul and Magtheridon',   image: 'images/gruul-mag.jpg'},
    { id: 'ssc',   title: 'Serpentshrine Cavern',    image: 'images/serpentshrine-cavern.jpg'},
    { id: 'tk',    title: 'Tempest Keep',            image: 'images/tempest-keep.jpg'}
];


const retrieveRaidById = (id) => {
    const raidInfo = raids.find(raid => {
        return raid.id === id;
    })
    return raidInfo;
};

const formatDate = (date) => {
    return date.toString().split("-").reverse().join("-");
}

const getDataFromForm = (form) => {
    const formData = [];
    [...form.elements].forEach((item, i) => {
        if (item.nodeName == 'INPUT') {
            formData.push(item.value);
        }
    });
    formatedDate = formatDate(formData[0]);
    formData.splice(0, 1, formatedDate);
    return formData;
};


const forms = document.querySelectorAll('form');
forms.forEach((form, i) => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        const [date, time, description] = getDataFromForm(form);
        const { title, image } = retrieveRaidById(event.target.id);
        const output = generateCommand(date, time, description, title, image);
        navigator.clipboard.writeText(output).then(function() {
          event.target.elements[3].innerText = 'Added to clipboard ✅';
        }, function(error) {
          event.target.elements[3].innerText = 'Something went wrong ❌';
        });
    });
});

const generateCommand = (date, time, description, title, image) => {
    const TEMPLATE_ID = 3;
    let command = `!quickcreate [template:${TEMPLATE_ID}][time:${time}][description:${description}][image:${location.href}/${image}][title:${title}][date:${date}]`;
    return command
};
