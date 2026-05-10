import { format } from 'timeago.js';

export default function formatTimeAgo(dateString:string) {
    const date:any = new Date(dateString);
    if (isNaN(date)) {
        return '';
    }

    return format(date);
};