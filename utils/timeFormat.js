// 格式化时间并且增加时区
function formatDate(date) {
  date = date.toISOString()
  const arr = date.split("T");
  const d = arr[0];
  const darr = d.split('-');
  const t = arr[1];
  const tarr = t.split('.000');
  const marr = tarr[0].split(':');
  const dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
  return formatDateTime(dd);
}
function formatDateTime(date) {
  let time = new Date(Date.parse(date));
  time.setTime(time.setHours(time.getHours() + 8));
  let Y = time.getFullYear() + '-';
  let M = addZero(time.getMonth() + 1) + '-';
  let D = addZero(time.getDate()) + ' ';
  let h = addZero(time.getHours()) + ':';
  let m = addZero(time.getMinutes()) + ':';
  let s = addZero(time.getSeconds());
  return Y + M + D + h + m + s;
}
function addZero(num) {
  return num < 10 ? '0' + num : num;
}

module.exports = {
  formatDate
}
