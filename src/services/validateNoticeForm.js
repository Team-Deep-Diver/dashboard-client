export function validateNoticeForm(notice) {
  const { startDate, endDate, groupNotice } = notice;
  const errors = [];

  if (!startDate || !endDate || !groupNotice) {
    errors.push({ message: "모든 항목을 채워주세요." });
  }

  if (new Date(startDate) > new Date(endDate)) {
    errors.push({ message: "입력한 끝 날짜가 시작 날짜보다 빠릅니다." });
  }

  return errors;
}
