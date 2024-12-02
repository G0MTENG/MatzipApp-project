type parseReturnType = [string, string, string];
const parseDate = (date: Date | string): parseReturnType => {
  if (date instanceof Date) {
    return [
      date.getFullYear().toString(),
      (date.getMonth() + 1).toString().padStart(2, '0'),
      date.getDate().toString().padStart(2, '0'),
    ];
  } else {
    return date.split('T')[0].split('-') as parseReturnType;
  }
};

export const formatDate = (date: Date | string, seperator: string = '') => {
  const [y, m, d] = parseDate(date);
  if (seperator === '') {
    return `${y}년 ${m}월 ${d}일`;
  } else {
    return `${y}${seperator} ${m}${seperator} ${d}`;
  }
};
