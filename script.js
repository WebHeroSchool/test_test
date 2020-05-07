let body = document.body;
let url = window.location.toString();
let preloader = document.getElementById('preloader');
let nowDate = new Date();
let requestInfo, requestDate;

let getName =(url)=>{
let urlSeparation = url.split('=');
  console.log(urlSeparation);
  let userName = urlSeparation[1];
  if ( userName == undefined ){
    userName = 'KsuBurn';
  }
  return userName;
}
let name = getName(url);



let getNowDate = new Promise((resolve, reject) => {
  setTimeout(() => nowDate ? resolve(nowDate) : reject ('Время не определенно'), 2000)
});

function dataRequest(){
  let info = fetch(`https://api.github.com/users/${getName(url)}`);
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(info);
      reject('error');
    }, 3000)
  })
  return promise;
}

Promise.all([ dataRequest(),getNowDate ])
  .then(([request, date]) =>{
    requestInfo = request;
    requestDate = date;
  })
  .then(res=>requestInfo.json())
  .then(showUserInfo => {

        let userLogin = showUserInfo.login
    let userPhoto = showUserInfo.avatar_url
    let userDescription = showUserInfo.bio;
    let userUrl = showUserInfo.html_url;

    let addUserLogin = () => {
      let elementForLogin = document.createElement('h1');
      elementForLogin.innerHTML = userLogin;
      body.appendChild(elementForLogin);
    }

    let addUserInfo = () => {
      let elemenForInfo = document.createElement('p');
      elemenForInfo.innerHTML = userDescription;
      body.appendChild(elemenForInfo);
    }

    let addUserPhoto = () => {
      let elementForPhoto = document.createElement('img');
      let newString = document.createElement('br');
      elementForPhoto.src = userPhoto
      body.appendChild(newString);
      body.appendChild(elementForPhoto);
    }

    let addUserUrl = () => {
      let elementForUrl = document.createElement('a');
      let text = document.createTextNode('Profile');
      let newString = document.createElement('br');
      elementForUrl.href = userUrl;
      elementForUrl.appendChild(text);
      body.appendChild(newString);
      body.appendChild(elementForUrl);
    }

    let addNowDate = () => {
      let elementForDate = document.createElement('p');
      elementForDate.innerHTML = requestDate;
      body.appendChild(elementForDate);
    }

    preloader.style.display = 'none';
    addUserLogin();
    addUserInfo();
    addUserPhoto();
    addUserUrl();
    addNowDate();
  })
  .catch(err => alert(err + 'Информация о пользователе не доступна'));