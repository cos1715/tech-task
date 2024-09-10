function getDateInfo(date: string) {
  const tempDate = new Date(date);
  tempDate.setUTCHours(0, 0, 0, 0);

  tempDate.setDate(tempDate.getDate() + 4 - (tempDate.getUTCDay() || 7));

  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));

  const weekNo = Math.ceil(
    ((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );

  return { year: tempDate.getUTCFullYear(), weekNo };
}

export default getDateInfo;
