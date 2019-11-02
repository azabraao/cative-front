
let turmas = document.querySelectorAll('.jsTurma');
turmas.forEach(turma => {
  turma.addEventListener('click', function() {
    window.location.href = "turma.html";
    let nome = turma.querySelector('.turma__nome').textContent.trim();
    localStorage.setItem("nomeTurma", nome);
  });
});

let nomeTurma = document.querySelector('.jsNomeTurma');
!!nomeTurma ? nomeTurma.textContent = localStorage.getItem('nomeTurma') : null;

let alunos = document.querySelectorAll('.jsAluno');
alunos.forEach(turma => {
  turma.addEventListener('click', function(e) {
    e.preventDefault();
    let nomeAluno = this.querySelector('.aluno__nome').textContent;
    let fotoAluno = this.querySelector('.aluno__pic>img').src;
    
    localStorage.setItem("nomeAluno",nomeAluno);
    localStorage.setItem("fotoAluno",fotoAluno);
    window.location.href = "aluno.html";
  });
});

// tela do aluno
let alunoFoto = document.querySelectorAll('.jsFotoPerfilArmazenado');
alunoFoto && !!localStorage.getItem('fotoAluno') ? 
alunoFoto.forEach(imgTag => {
  imgTag.src = localStorage.getItem('fotoAluno')
}) : null;

let nomeNaBarraDeNavegacao = document.querySelector('.navegacao__nome');
!!nomeNaBarraDeNavegacao && !!localStorage.getItem('nomeAluno') ? 
nomeNaBarraDeNavegacao.textContent = localStorage.getItem('nomeAluno') : null;

let nomePerfil = document.querySelector('.jsNomePerfil');
nomePerfil && !!localStorage.getItem('nomeAluno') ? 
nomePerfil.textContent = localStorage.getItem('nomeAluno') : null;

let opcaoCor = document.querySelectorAll('.jsOpcaoCor');
opcaoCor.forEach(cor => {
  cor.addEventListener('click', function() {
    let cor = this.querySelector('input').value;
    localStorage.setItem('corTema', cor);
  });
});

document.querySelectorAll('.jsCorPerfil').forEach(element => {
  !!localStorage.getItem('corTema') ? 
  element.style.background =  localStorage.getItem('corTema') : null;
});


// loading
let btnLoading = document.querySelectorAll('.jsLoading');
btnLoading.forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    this.textContent = '';
    let url = this.href;
    this.classList.add('loading');
    
    !!url ? 
    setTimeout(function() {
      window.location.href = url;
    }, 2000) 
    : null;
  });
});


// Adicionando uma missão

let btnSalvaMissao = document.querySelector('.jsSalvaMissao');
if(!!btnSalvaMissao) {
  btnSalvaMissao.addEventListener('click', function(e) {
    this.textContent = '';
    let url = this.href;
    this.classList.add('loading');
    
    !!url ? 
    setTimeout(function() {
      window.location.href = url;
    }, 2000) 
    : null;
    
    let objetivo = document.querySelector('.jsObjetivoMissao').value;
    let imagem = document.querySelector('.jsImagemUpada').src;
    let detalhes = document.querySelector('.jsDetalhesMissao').value;
    let estrelas = document.querySelector('.jsPontuacaoEstrela.ativo>input').value;
    let cor = document.querySelector('.jsOpcaoCor.ativo>input').value;
    let turma = document.querySelector('.jsTurmaSelect').value;
    
    if(!!objetivo && !!imagem && !!detalhes && !!cor) {
      localStorage.setItem('missaoObjetivo', objetivo);
      localStorage.setItem('missaoImagem', imagem);
      localStorage.setItem('missaoDetalhes', detalhes);
      localStorage.setItem('missaoCor', cor);
      localStorage.setItem('missaoEstrelas', estrelas);
      localStorage.setItem('temMissaoCadastrada', true);
    }
    
  });  
}

// qualquer lugar com missões

let missoesWrapper = document.querySelector('.missoes');

if(localStorage.getItem('temMissaoCadastrada') === 'true') {
  if(!!missoesWrapper) {
    missoesWrapper.innerHTML += constroiCardMissao();
    let cards = document.querySelectorAll('.jsCardMissao');
    cards.forEach(card => card.addEventListener('click', cardMissao.handleClick))    
    
  } else {
  }
  console.log('tem missao cadastrada');
} else {
  console.log('não tem missao cadastrada');
}

if(!!missoesWrapper) {
  let cards = document.querySelectorAll('.jsCardMissao');
 cards.forEach(card => {
   card.addEventListener('click', function () {
     document.body.style.overflow = "hidden";

     document.querySelector('.jsBack').addEventListener('click', function(e) {
       window.location.reload();
     })
   }) 
 });    
}


function constroiCardMissao() {
  let card = `
  <div class="card-missao jsCardMissao" data-cor=${localStorage.getItem('missaoCor')} data-cod="a33" 
  data-descricao="${localStorage.getItem('missaoDetalhes')}" 
  data-titulo="${localStorage.getItem('missaoObjetivo')}"
  data-estrelas=${localStorage.getItem('missaoEstrelas')}>
  
  <div class="card-missao__imagem primary">
  <img src="${localStorage.getItem('missaoImagem')}" alt="Imagem da missão">
  </div>
  <div class="card-missao__body">
  <div class="card-missao__titulo">
  <h3>${localStorage.getItem('missaoObjetivo')}</h3>
  </div>
  <div class="card-missao__pontos">
  <i class="icon icon-star jsEstrela"></i>
  <span>${localStorage.getItem('missaoEstrelas')} estrelas</span>
  </div>
  </div>
  </div> 
  `
  return card;
  ;  
}

// pontuações

let pontuacao = localStorage.getItem("pontuacaoAluno");

if(!!pontuacao){
  let wrapperPontuacao = document.querySelectorAll('.jsPontuacao');
  wrapperPontuacao.forEach(wrap => {
    wrap.textContent = pontuacao;
  });
}


let btnConcluiMissao = document.querySelector('.jsConcluiMissao');
if(!!btnConcluiMissao) {
  btnConcluiMissao.addEventListener('click', function(e) {
    let pontuacaoMissao = parseInt(document.querySelector('.jsModalEstrelas').textContent);
    let wrapperPontuacao = document.querySelectorAll('.jsPontuacao');
    e.preventDefault();
    wrapperPontuacao.forEach(wrapper => {
      let pontuacaoAntiga = parseInt(wrapper.textContent);
      let pontuacaoNova = pontuacaoAntiga + pontuacaoMissao;
      
      setTimeout(function() {
        let interval = setInterval(function() {
          ++pontuacaoAntiga;
          if(pontuacaoAntiga == pontuacaoNova) {
            wrapper.textContent = pontuacaoNova;
            
            localStorage.setItem("pontuacaoAluno", pontuacaoNova);
            
            setTimeout(function() {
              removeAnimacao();
            },2000);
            
            clearInterval(interval);
          } else {
            wrapper.textContent = pontuacaoAntiga;
          }
          adicionaAnimacao();
          function adicionaAnimacao() { 
            let estrelas = document.querySelectorAll('.jsEstrela');
            estrelas.forEach(estrela => {
              estrela.classList.add('piscar');
            });
          }
          
          function removeAnimacao() {
            let estrelas = document.querySelectorAll('.jsEstrela');
            !!estrelas ?  
            estrelas.forEach(estrela => {
              if(estrela.classList.contains('piscar')) {
                estrela.classList.remove('piscar');
              }
            }) 
            : null;
          }
        },50);
      },2000);
    });
  });
}

// Cadastre-se
let btnCadastreSe = document.querySelector('.jsBtnCadastreSe');
!!btnCadastreSe ?
  btnCadastreSe.addEventListener('click', function() {
    let inputsTipos = document.querySelectorAll('.jsRadioInput');
    let tipoSelecionado = null;
    inputsTipos.forEach(input => {
      input.checked ? tipoSelecionado  = input.value : null;
    });

    reset();
    
    setTimeout(function() {
      if(tipoSelecionado == "professor") {
        window.location.href = "turmas.html"
      } else {
        window.location.href = "missoes.html"
      }
    },2000);

  })
: null;

function reset() {
  localStorage.clear();
}