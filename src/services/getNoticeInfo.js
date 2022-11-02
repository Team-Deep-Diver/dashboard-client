export function getNoticeInfo(groupName, colorCode, notice) {
  return {
    groupName,
    colorCode,
    startDate: notice.period.startDate,
    endDate: notice.period.endDate,
    message: notice.message,
  };
}
