function editarMissao() {
  let foto = document.querySelector('.jsImagemUpada');
  let fotoWrap = document.querySelector('.jsCapaMissao');
  let objetivo = document.querySelector('.jsObjetivoMissao');
  let detalhes = document.querySelector('.jsDetalhesMissao');
  let estrelas = document.querySelectorAll('.jsPontuacaoEstrela');
  let cores = document.querySelectorAll('.jsOpcaoCor');
  let deletarMissao = document.querySelector('.jsDeletarMissao');
  
  
  deletarMissao.addEventListener('click', function() {
    reset();
    window.location.href = "turmas.html"
  });

  if(!!localStorage.getItem('missaoImagem')) {
      foto.src = localStorage.getItem('missaoImagem');
      fotoWrap.classList.add('ativo') 
  }  
  
  
  objetivo.value = localStorage.getItem('missaoObjetivo');
  !!objetivo.value ? objetivo.classList.add('completo') : null;

  detalhes.textContent = localStorage.getItem('missaoDetalhes');  
  !!detalhes.textContent ? detalhes.classList.add('completo') : null;
  
  estrelas.forEach(estrela => {
    let input = estrela.querySelector('.jsRadioInput');
    if(input.value == localStorage.getItem('missaoEstrelas')) {
      let wrap = document.querySelector('.jsPontuacaoEstrela.ativo');
      wrap.classList.contains('ativo') ? wrap.classList.remove('ativo') : null;
      input.parentElement.classList.add('ativo');
      input.click(); 
    }
  });
  
  
  cores.forEach(cor => {
    let radio = cor.querySelector('.jsRadioInput');
    if(radio.value == localStorage.getItem('missaoCor')) {
      radio.click();
      cor.classList.add('ativo');
    }
  });
  
}

editarMissao();

// <div class="card-missao jsCardMissao" data-cor=${localStorage.getItem('missaoCor')} data-cod="a33" 
// data-descricao="${}" 
// data-titulo="${}"
// data-estrelas=${localStorage.getItem('missaoEstrelas')}>

// <div class="card-missao__imagem primary">
// <img src="${localStorage.getItem('missaoImagem')}" alt="Imagem da missão">
// </div>
// <div class="card-missao__body">
// <div class="card-missao__titulo">
// <h3>${localStorage.getItem('missaoObjetivo')}</h3>
// </div>
// <div class="card-missao__pontos">
// <i class="icon icon-star"></i>
// <span>${localStorage.getItem('missaoEstrelas')} estrelas</span>
// </div>
// </div>
// </div> 