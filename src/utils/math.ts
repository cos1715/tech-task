const formatMoney = (value: number) => {
  const ceil = Math.ceil(value * 100) / 100;
  return ceil.toFixed(2);
};

export default formatMoney;
