(function () {
  function removeFrontendError(input) {
    const next = input && input.nextElementSibling;
    if (next && next.classList && next.classList.contains('frontend')) {
      next.remove();
    }
  }

  function showError(input, message) {
    if (!input) return;
    removeFrontendError(input);
    if (!message) return;
    const errorLabel = document.createElement('section');
    errorLabel.className = 'ui pointing red basic label frontend';
    errorLabel.innerText = message;
    input.parentNode.insertBefore(errorLabel, input.nextElementSibling);
  }

  function validateNome() {
    const input = document.getElementById('nome');
    if (!input) return true;
    const v = input.value.trim();
    if (!v) { showError(input, 'Nome é obrigatório.'); return false; }
    removeFrontendError(input);
    return true;
  }

  function validateEmail() {
    const input = document.getElementById('email');
    if (!input) return true;
    const v = input.value.trim();
    if (!v) { showError(input, 'E-mail é obrigatório.'); return false; }
    if (!/^\S+@\S+\.\S+$/.test(v)) { showError(input, 'E-mail inválido.'); return false; }
    removeFrontendError(input);
    return true;
  }

  function validateSenha() {
    const input = document.getElementById('senha');
    if (!input) return true;
    const v = input.value.trim();
    if (!v) { showError(input, 'Senha é obrigatória.'); return false; }
    if (v.length < 6) { showError(input, 'A senha deve ter no mínimo 6 caracteres.'); return false; }
    removeFrontendError(input);
    return true;
  }

  function validateConfirmar() {
    const senhaInput = document.getElementById('senha');
    const confirmar = document.getElementById('confirmar-senha');
    if (!confirmar) return true;
    const sv = senhaInput ? senhaInput.value.trim() : '';
    const cv = confirmar.value.trim();
    if (!cv) { showError(confirmar, 'Confirmação é obrigatória.'); return false; }
    if (sv !== cv) { showError(confirmar, 'As senhas não coincidem.'); return false; }
    removeFrontendError(confirmar);
    return true;
  }

  function validateCPF() {
    const input = document.getElementById('cpf');
    if (!input) return true;
    const v = input.value.replace(/\D/g, '');
    
    if (!v) { 
      showError(input, 'CPF é obrigatório.'); 
      return false; 
    }
    
    if (v.length !== 11) { 
      showError(input, 'CPF deve ter 11 dígitos.'); 
      return false; 
    }
    
    // Validar se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(v)) {
      showError(input, 'CPF inválido.');
      return false;
    }
    
    // Algoritmo de validação do CPF
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(v.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(v.substring(9, 10))) {
      showError(input, 'CPF inválido.');
      return false;
    }
    
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(v.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(v.substring(10, 11))) {
      showError(input, 'CPF inválido.');
      return false;
    }
    
    removeFrontendError(input);
    return true;
  }

  function addListeners(id, fn) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', fn);
    el.addEventListener('input', fn);
  }

  document.addEventListener('DOMContentLoaded', function () {
    addListeners('nome', validateNome);
    addListeners('email', validateEmail);
    addListeners('senha', validateSenha);
    addListeners('confirmar-senha', validateConfirmar);
    addListeners('cpf', validateCPF);

    const cadastroForm = document.getElementById('cadastro-form');
    if (cadastroForm) {
      cadastroForm.addEventListener('submit', function (ev) {
        document.querySelectorAll('.frontend').forEach(e => e.remove());
        const okNome = validateNome();
        const okEmail = validateEmail();
        const okSenha = validateSenha();
        const okConfirm = validateConfirmar();
        const okCPF = validateCPF();
        if (!okNome || !okEmail || !okSenha || !okConfirm || !okCPF) {
          ev.preventDefault();
        }
        // se tudo ok, deixa o formulário enviar normalmente pro servidor
      });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (ev) {
        document.querySelectorAll('.frontend').forEach(e => e.remove());
        const okEmail = validateEmail();
        const okSenha = validateSenha();
        if (!okEmail || !okSenha) ev.preventDefault();
      });
    }
  });
})();