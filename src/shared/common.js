export const emailCheck = (email) => {
  //정규식 패턴
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
  return _reg.test(email);

}

export const passwordCheck = (pw) => {
  
  return pw.length < 9 ? false : true;
}