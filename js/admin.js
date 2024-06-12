var listaUsuarios = [];
var lastId = localStorage.getItem('lastId') ? parseInt(localStorage.getItem('lastId')) : 0; //ternario para saber se ja existe algum id

const modal = document.getElementById("modal-remover")
const overlay = document.getElementById("overlay")

overlay.style.display = "none"
modal.style.display = "none"


const data = new Date()
var dia = data.getDate()
var mes = data.getMonth() + 1 //em js os meses vai de 0 a 11 por isso a add do +1
var ano = data.getFullYear()

if (mes < 10) {
  mes = `0${mes}`
} else {
  mes
}

var dataFormatada = dia + '/' + mes + '/' + ano

document.getElementById("menu-btn").addEventListener("click", function () {
  var menu = document.getElementById("menu");
  if (menu.classList.contains("esconder")) {
    menu.classList.remove("esconder");
  } else {
    menu.classList.add("esconder");
  }
});

// Função para adicionar usuário
function adicionarUsuario(name, email) {
  var novoUsuario = { id: ++lastId, name: name, email: email, dataFormatada }; //cria um novo objetivo de usuario (novoUsuario), com as propriedades id, name e email
  listaUsuarios.push(novoUsuario); //comando que adiciona o novo usuario ao final da lista de usuarios
  localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios)); //o JSON.stringfy converte o objeto JavaScript em uma string JSON
  localStorage.setItem('lastId', lastId);
  renderListaUsuarios();
}

// Função para excluir usuário
function excluirUsuario(usuarioId) {
  var novaListaUsuarios = listaUsuarios.filter(function (usuario) {
    return usuario.id !== usuarioId; //retorna todos os elementos que não sejam no ID selecionado
  });

  if (novaListaUsuarios.length < listaUsuarios.length) { //verifica se a lista atualizada é diferente da lista original
    listaUsuarios = novaListaUsuarios;
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios));
    renderListaUsuarios();
  } else {
    alert('Usuário não encontrado.');
  }
}

// Função para recuperar a lista de usuário do localStorage
function listaLocalStorage() {
  var listaJs = JSON.parse(localStorage.getItem('listaUsuarios')); //converte a string JSON para objeto JavaScript
  listaUsuarios = listaJs || []; //se listaJs for um valor válido (não seja nulo ou indefinido). é atribuido a listaUsuarios. Caso contrário, listaUsuarios recebe um array vazio
}

// Função para renderizar a lista de usuário no HTML
function renderListaUsuarios() {
  var listaUsuariosElement = document.getElementById('lista-usuarios');
  listaUsuariosElement.innerHTML = ''; //limpa o conteúdo HTML do elemento listaUsuariosElement

  listaUsuarios.forEach(function (usuario) {
    var lista = document.createElement('li');
    //renderiza a lista de usuário. Itera sobre cada usuario na lista encontrada e cria um <li> para cada usuario
    lista.innerHTML = '<span class="usuario-name">' + usuario.name + '</span> (E-mail: ' + usuario.email + ' - Data: ' + usuario.dataFormatada + ') <button class="delete-button" onclick="excluirUsuario(' + usuario.id + ')">Excluir</button>';


    listaUsuariosElement.appendChild(lista);
  });
}

//Função para remover todos os usuários da lista e do localStorage
function clearUsuarios() {
  localStorage.clear();
  listaUsuarios = [];
  lastId = 0
  renderListaUsuarios();
  fechaModal();
}
function limparCampos() {
  var inputName = document.getElementById('input-name');
  var inputEmail = document.getElementById('input-email');
  inputName.value = '';
  inputEmail.value = '';
}

//Função para filtrar o usuário pelo nome
function filtrarNome() {
  var inputName = document.getElementById('inputFilter');
  var name = inputName.value.trim(); // Remove espaços em branco no início e no fim
  var listaFiltrada = listaUsuarios.filter(function (usuario) {
    return usuario.name.toLowerCase() === name.toLowerCase(); // Compara o nome ignorando maiúsculas e minúsculas
  });

  var usuarioFiltradoElement = document.getElementById('lista-usuarios');
  if (listaFiltrada.length > 0) {
    usuarioFiltradoElement.innerHTML = '';
    listaFiltrada.forEach(function (usuario) {
      var lista = document.createElement('li');
      lista.innerHTML = 'Usuário encontrado: <span class="usuario-name">' + usuario.name + '</span> (E-mail: ' + usuario.email + ' Data: ' + usuario.dataFormatada + ') <button class="delete-button" onclick="excluirUsuario(' + usuario.id + ')">Excluir</button>';
      usuarioFiltradoElement.appendChild(lista);
    });
  } else {
    usuarioFiltradoElement.textContent = 'Usuário não encontrado.';
  }
}

//Função para limpar o filtrar
function limparFiltro() {
  var inputName = document.getElementById('inputFilter');
  inputName.value = ''
  renderListaUsuarios()
}

function abreModal() {
  modal.style.display = "block"
  overlay.style.display = "block"
}

function fechaModal() {
  modal.style.display = "none"
  overlay.style.display = "none"
}

//evento para fechar modal quando clicar fora
window.onclick = function (event) {
  if (event.target === modal) {
    fechaModal()
  }
}
// Recuperar a lista de usuários do localStorage
listaLocalStorage();

// Renderizar a lista de usuários no HTML
renderListaUsuarios();

// Event listener para o formulário de cadastro de usuários
document.getElementById('form').addEventListener('submit', function (event) {
  event.preventDefault();
  var inputName = document.getElementById('input-name');
  var inputEmail = document.getElementById('input-email');
  adicionarUsuario(inputName.value, inputEmail.value);
  limparCampos()
});

