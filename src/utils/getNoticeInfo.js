export function getNoticeInfo(groupName, colorCode, notice) {
  if (Array.isArray(notice)) {
    const notices = notice.map((data) => {
      return {
        groupName,
        colorCode,
        startDate: data.period.startDate,
        endDate: data.period.endDate,
        message: data.message,
      };
    });

    return notices;
  }

  return {
    groupName,
    colorCode,
    startDate: notice.period.startDate,
    endDate: notice.period.endDate,
    message: notice.message,
  };
}
