const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
  container.classList.remove('right-panel-active');
});

const login_id = document.querySelector('#login-id'),
  login_psword = document.querySelector('#login-password'),
  loginBtn = document.querySelector('#login-button');

const id = document.querySelector('#id'),
  userName = document.querySelector('#userName'),
  psword = document.querySelector('#psword'),
  confirmPsword = document.querySelector('#confirm-psword'),
  phoneNumber = document.querySelector('#phoneNumber'),
  registerBtn = document.querySelector('#registerButton');

registerBtn.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('이거 들어옴?');
  console.log(id.value, userName.value);

  register();
});

loginBtn.addEventListener('click', (event) => {
  event.preventDefault();
  login();
});

console.log(id);

function login() {
  const req = {
    id: login_id.value,
    psword: login_psword.value,
  };
  fetch('./login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        if (localStorage.getItem('userId')) {
          localStorage.removeItem('userId');
        }
        localStorage.setItem('userId', req.id);
        location.href = `/${req.id}`;
      } else {
        alert(res.msg);
      }
    })
    .catch((error) => {
      console.log('로그인 중 에러 발생');
    });
}

function register() {
  console.log(id.value, userName.value, psword.value);
  if (!id.value) return alert('아이디를 입력하시오.');
  if (psword.value !== confirmPsword.value)
    return alert('비밀번호가 일치하지 않습니다.');

  const req = {
    name: userName.value,
    id: id.value,
    password: psword.value,
    phoneNumber: phoneNumber.value,
  };

  console.log(req);

  fetch('./register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        alert('회원가입에 성공하셨습니다.');
        location.href = '/login';
      } else {
        alert(res.msg);
      }
    })
    .catch((error) => {
      console.log('회원가입 중 에러 발생');
    });
}
