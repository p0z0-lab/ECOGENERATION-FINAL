document.addEventListener('DOMContentLoaded', () => {
  const diagnosticoForm = document.getElementById('diagnostico-form');
  if (!diagnosticoForm) return;

  diagnosticoForm.addEventListener('submit', function(e) {
    // Campos obrigatórios (radio) — nomes atuais do formulário
    const camposRadio = ['frequencia', 'duracao', 'prioridade', 'moradia', 'orcamento'];
    const naoRespondidas = camposRadio.filter(campo =>
      !document.querySelector(`input[name="${campo}"]:checked`)
    );

    // Pergunta 3 é checkbox — basta ter pelo menos 1 marcado
    const preparacaoMarcada = document.querySelectorAll('input[name="preparacao"]:checked').length > 0;
    if (!preparacaoMarcada) naoRespondidas.push('preparacao');

    const feedback = document.getElementById('form-feedback');

    if (naoRespondidas.length > 0) {
      e.preventDefault();
      const msg = `Por favor, responda todas as perguntas antes de continuar. Faltam ${naoRespondidas.length} resposta(s).`;
      feedback.textContent = msg;
      feedback.classList.remove('visually-hidden');
      const primeiroVazio = document.querySelector(`fieldset:has(input[name="${naoRespondidas[0]}"])`);
      if (primeiroVazio) primeiroVazio.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      feedback.textContent = '';
      feedback.classList.add('visually-hidden');
    }
  });
});
