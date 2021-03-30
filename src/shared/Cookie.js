//cookie 가져오기
const getCookie = (name) => {
  let value = "; " + document.cookie; //내 쿠키가 처음에 올 경우를 대비 ;
  let parts = value.split(`; ${name}=`);
  //a = bb; b=cc;
  if (parts.length === 2) {
    return parts.pop().split(';').shift();
  }
  
}

//cookie 저장하기
//이름,설정값,만료일
const setCookie = (name, value, exp = 5) => {

  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`

}

//cookie 삭제하기 
const deleteCookie = (name) => {
  
  let date = new Date('2020-01-01').toUTCString();
  document.cookie = name + "=; expires=" + date;

}

export { getCookie, setCookie, deleteCookie };