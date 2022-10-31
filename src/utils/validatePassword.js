export function validatePassword(password) {
  const regex = /(?=.*\d)(?=.*[a-zA_Z])/;
  return regex.test(password);
}
