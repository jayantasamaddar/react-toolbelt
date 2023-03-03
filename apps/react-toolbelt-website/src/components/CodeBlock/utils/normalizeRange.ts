export const normalizeRange = (numString: string) => {
  try {
    const [start, end] = numString.replaceAll(' ', '').split(',');
    if (
      typeof parseInt(start) === 'number' &&
      typeof parseInt(end) === 'number'
    ) {
      return `${start},${end}`;
    }
  } catch (e) {
    return undefined;
  }
};
