const timeAgo = (date, format) => {
  date = new Date(date).getTime();

  const timeNow = parseInt(new Date().getTime(), 10);
  const d = (timeNow - date) / 1000;
  const dDays = parseInt(d / 86400, 10);
  const dHours = parseInt(d / 3600, 10);
  const dMinutes = parseInt(d / 60, 10);

  if (dDays > 0) {
    return `${dDays}天前`;
  } else if (dDays <= 0 && dHours > 0) {
    return `${dHours}小时前`;
  } else if (dHours <= 0 && dMinutes > 0) {
    return `${dMinutes}分钟前`;
  }

  return '刚刚';
};

export default timeAgo;
