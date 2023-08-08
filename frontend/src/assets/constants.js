const monthNames=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
function getDateString(date) {
    return date.getUTCFullYear().toString() + '-' + (date.getMonth()+1).toString().padStart(2, '0') + '-' + date.getUTCDate().toString().padStart(2, '0')
}

function getTimeString(date) {
    return date.getUTCHours().toString().padStart(2, '0') + ":" + date.getUTCMinutes().toString().padStart(2, '0') + ":" + date.getUTCSeconds().toString().padStart(2, '0');
}

function getFullDateString(date) {
    return monthNames[date.getMonth()] + ' ' + date.getUTCDate() + ' '  + date.getFullYear() + ' ' + String(date.getUTCHours()).padStart(2,'0') + ":" + String(date.getUTCMinutes()).padStart(2,'0');
}

// EventManager
const dateColors = ['bg-emerald-500', 'bg-rose-500', 'bg-sky-500', 'bg-purple-500'];
const itemColors = ['bg-white', 'bg-slate-100'];

// EventCreator
const eventDescriptors = ['Spectacular', 'Great', 'Amazing', 'Astounding', 'Breathtaking', 'Glorious', 'Magnificent']

export {
    monthNames,
    getFullDateString,
    dateColors,
    itemColors,
    eventDescriptors,
    getDateString,
    getTimeString
}