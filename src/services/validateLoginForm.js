import { validateEmail } from "./validateEmail";
import { validatePassword } from "./validatePassword";

export function validateLoginForm(loginValues) {
  const { email, password } = loginValues;
  const errors = [];

  if (!email || !password) {
    errors.push({ message: "* 모든 항목을 입력해주세요." });
  }

  if (!validateEmail(email)) {
    errors.push({ message: "* 이메일 형식에 맞지 않습니다." });
  }

  if (password?.length < 8 || !validatePassword(password)) {
    errors.push({
      message: "* 비밀번호는 숫자, 영문자 포함 8자 이상이어야 합니다.",
    });
  }

  return errors;
}
