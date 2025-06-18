const btnLogin = document.getElementById('btn-login');
const btnRegister = document.getElementById('btn-register');
const formLogin = document.getElementById('form-login');
const formRegister = document.getElementById('form-register');
const loginFeedback = document.getElementById('login-feedback');
const registerFeedback = document.getElementById('register-feedback');

function switchTab(tab) {
  if (tab === 'login') {
    btnLogin.classList.add('active');
    btnRegister.classList.remove('active');
    formLogin.classList.add('active');
    formRegister.classList.remove('active');
    loginFeedback.textContent = '';
    registerFeedback.textContent = '';
  } else {
    btnRegister.classList.add('active');
    btnLogin.classList.remove('active');
    formRegister.classList.add('active');
    formLogin.classList.remove('active');
    loginFeedback.textContent = '';
    registerFeedback.textContent = '';
  }
}

btnLogin.addEventListener('click', () => switchTab('login'));
btnRegister.addEventListener('click', () => switchTab('register'));

// Cadastro
formRegister.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('register-username').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const passwordConfirm = document.getElementById('register-password-confirm').value;

  if (!username || !email || !password || !passwordConfirm) {
    registerFeedback.textContent = 'Preencha todos os campos.';
    registerFeedback.className = 'feedback error';
    return;
  }

  if (password !== passwordConfirm) {
    registerFeedback.textContent = 'As senhas não coincidem.';
    registerFeedback.className = 'feedback error';
    return;
  }

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      registerFeedback.textContent = data.message;
      registerFeedback.className = 'feedback success';
      formRegister.reset();
      setTimeout(() => switchTab('login'), 2000);
    } else {
      registerFeedback.textContent = data.message;
      registerFeedback.className = 'feedback error';
    }
  } catch {
    registerFeedback.textContent = 'Erro ao conectar ao servidor.';
    registerFeedback.className = 'feedback error';
  }
});

// Login
formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  if (!username || !password) {
    loginFeedback.textContent = 'Preencha usuário e senha.';
    loginFeedback.className = 'feedback error';
    return;
  }

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      loginFeedback.textContent = data.message;
      loginFeedback.className = 'feedback success';
      formLogin.reset();
    } else {
      loginFeedback.textContent = data.message;
      loginFeedback.className = 'feedback error';
    }
  } catch {
    loginFeedback.textContent = 'Erro ao conectar ao servidor.';
    loginFeedback.className = 'feedback error';
  }
});
