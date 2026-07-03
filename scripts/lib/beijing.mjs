/** 北京时间日期键 YYYY-MM-DD */
export function beijingDateKey(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}

/** 自 epoch 起的天数（北京时间零点） */
export function beijingDayIndex(epoch, date = new Date()) {
  const key = beijingDateKey(date);
  const [y, m, d] = key.split('-').map(Number);
  const today = Date.UTC(y, m - 1, d);
  const [ey, em, ed] = epoch.split('-').map(Number);
  const start = Date.UTC(ey, em - 1, ed);
  return Math.floor((today - start) / 86400000);
}
