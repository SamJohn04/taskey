export function getDateTimeMessage(date?: Date): string {
    if(!date) {
        return "--";
    }
    const currentDate = new Date();
    const diff = date.getTime() - currentDate.getTime();
    const days = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
    if(days > 0) {
        if(days === 1) {
            return diff < 0 ? "yesterday" : "tomorrow";
        }
        if(days < 31) {
            return diff < 0 ? `${days} days ago` : `in ${days} days`;
        } else {
            return date.toDateString();
        }
    }
    const hours = Math.abs(Math.floor(diff / (1000 * 60 * 60)));
    if(hours > 0) {
        if(hours === 1) {
            return diff < 0 ? "an hour ago" : "in an hour";
        }
        return diff < 0 ? `${hours} hours ago` : `in ${hours} hours`;
    }
    const minutes = Math.abs(Math.floor(diff / (1000 * 60)));
    if(minutes > 0) {
        if(minutes === 1) {
            return diff < 0 ? "a minute ago" : "in a minute";
        }
        return diff < 0 ? `${minutes} minutes ago` : `in ${minutes} minutes`;
    }
    return diff < 0 ? "just now" : "now";
}