import { parseISO, formatDistanceToNow } from "date-fns";

function TimeAgo({ timestamp }) {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span title={timestamp} className="text-slate-300">
      &nbsp; <i>{timeAgo}</i>
    </span> 
  );
}

export default TimeAgo;
