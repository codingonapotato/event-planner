const monthNames=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
function getDateString(date) {
    return monthNames[date.getMonth()] + ' ' + date.getUTCDate() + ' '  + date.getFullYear() + ' ' + String(date.getUTCHours()).padStart(2,'0') + ":" + String(date.getUTCMinutes()).padStart(2,'0');
}

// EventManager
const dateColors = ['bg-emerald-500', 'bg-rose-500', 'bg-sky-500', 'bg-purple-500'];
const itemColors = ['bg-white', 'bg-slate-100'];

// EventCreator
const eventDescriptors = ['Spectacular', 'Great', 'Amazing', 'Astounding', 'Breathtaking', 'Glorious', 'Magnificent']

export {
    monthNames,
    getDateString,
    dateColors,
    itemColors,
    eventDescriptors
}