const formatNumber = (value, max) => {
  if (!max) {
    max = 99;
  }

  if (value && value > max) {
    return `${value}+`;
  }

  return value;
};

export default formatNumber;
