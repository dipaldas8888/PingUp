import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import isToday from 'dayjs/plugin/isToday.js';
import isYesterday from 'dayjs/plugin/isYesterday.js';

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);

export const formatMessageTime = (date) => dayjs(date).format('h:mm A');

export const formatLastSeen = (date) => {
  const d = dayjs(date);
  if (d.isToday()) return `Today at ${d.format('h:mm A')}`;
  if (d.isYesterday()) return `Yesterday at ${d.format('h:mm A')}`;
  return d.format('MMM D, YYYY');
};

export const formatRelative = (date) => dayjs(date).fromNow();
