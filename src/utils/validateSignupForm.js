import { validateEmail } from "../services/validateEmail";
import { validatePassword } from "../services/validatePassword";

export function validateSignupForm(
  signupValues,
  selectedRole,
  duplicationCheckCount
) {
  const { nickname, email, password, passwordConfirm, groupName } =
    signupValues;
  const errors = [];

  if (
    selectedRole === "MEMBER" &&
    (!nickname || !email || !password || !passwordConfirm)
  ) {
    errors.push({ message: "* 모든 항목을 입력해주세요." });
  }

  if (
    selectedRole === "ADMIN" &&
    (!nickname || !email || !password || !passwordConfirm || !groupName)
  ) {
    errors.push({ message: "* 모든 항목을 입력해주세요." });
  }

  if (
    (selectedRole === "MEMBER" && duplicationCheckCount < 1) ||
    (selectedRole === "ADMIN" && duplicationCheckCount < 2)
  ) {
    errors.push({ message: "* 중복 확인해주세요." });
  }

  if (nickname?.length < 2) {
    errors.push({ message: "* 닉네임은 최소 2자 이상 입력해주세요." });
  }

  if (!validateEmail(email)) {
    errors.push({ message: "* 이메일 형식에 맞지 않습니다." });
  }

  if (password?.length < 8 || !validatePassword(password)) {
    errors.push({
      message: "* 비밀번호는 숫자, 영문자 포함 8자 이상이어야 합니다.",
    });
  }

  if (password !== passwordConfirm) {
    errors.push({ message: "* 비밀번호가 일치하지 않습니다." });
  }

  if (groupName?.length < 2) {
    errors.push({ message: "* 그룹명은 최소 2자 이상 입력해주세요." });
  }

  return errors;
}
