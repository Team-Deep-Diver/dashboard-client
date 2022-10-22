export function validateCardForm(cardInput, type) {
  const { category, startDate, endDate, colorCode } = cardInput;
  const errors = [];

  if (type === "modify") {
    if (!category || !colorCode) {
      errors.push({ message: "필수 항목을 채워주세요." });
    }
  }

  if (type === "create") {
    if (!category || !startDate || !endDate || !colorCode) {
      errors.push({ message: "필수 항목을 채워주세요." });
    }

    if (new Date(startDate) > new Date(endDate)) {
      errors.push({ message: "입력한 끝 날짜가 시작 날짜보다 빠릅니다." });
    }
  }

  return errors;
}
