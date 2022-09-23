export const emailValidator = email => {
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  return regEmail.test(email);
};

export const passwordLengthValidator = (password, minLength) => {
  return password.length >= minLength;
};
