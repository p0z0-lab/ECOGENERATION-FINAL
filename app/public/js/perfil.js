document.addEventListener('DOMContentLoaded', () => {
  const btnExcluir = document.getElementById('btn-excluir-conta');
  const modal = document.getElementById('modal-excluir');
  const btnCancelar = document.getElementById('btn-cancelar-excluir');

  if (!btnExcluir || !modal || !btnCancelar) return;

  btnExcluir.addEventListener('click', () => {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  });

  btnCancelar.addEventListener('click', () => {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  });
});
