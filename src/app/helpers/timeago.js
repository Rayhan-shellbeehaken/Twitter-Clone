import { formatDistanceToNow } from "date-fns";

export default function timeAgo(date) {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
}