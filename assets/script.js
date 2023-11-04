const nomePokemon = document.querySelector('.namePokemon');
const numeroPokemon = document.querySelector('.numberPokemon');
const imagemPokemon = document.querySelector('.imgPokemon');

const formularioPokemon = document.querySelector('.formPokemon');
const searchPokemon = document.querySelector('.inputSearch');

const btnAvancar = document.querySelector('.btn-next');
const btnVoltar = document.querySelector('.btn-prev');

const fetchPokemon = async (pokemon) => {

  // Fazendo a REQ na API
  const APIResposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);



  // Tratar o erro quando o Pokemon não existe
  if (APIResposta.status === 200) {

    // Extrair os dados da REQ para JSON
    const dados = await APIResposta.json();

    // Retornar os Dados para serem utilizados em outras funções
    return dados;

  } else {
    searchPokemon.value = '';
  }

}

const renderizarPokmeon = async (pokemon) => {

  // Mostrar Loading enquanto não carrega os dados da API
  nomePokemon.innerHTML = 'Carregando ...';
  numeroPokemon.innerHTML = '';


  // Receber os Dados do Pokemon
  const dados = await fetchPokemon(pokemon);
  // console.log(dados); - Debugar

  // Tratar os dados do Pokemon, se existir faça isso
  if (dados) {

    // Trazer os Dados para os Componentes HTML (dados + nome da chave da API no caso, "name")
    nomePokemon.innerHTML = dados.name;
    numeroPokemon.innerHTML = dados.id;
    imagemPokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    imagemPokemon.style.display = 'block';
    searchPokemon.value = '';

    // Se não...
  } else {
    nomePokemon.innerHTML = 'Não existe';
    numeroPokemon.innerHTML = '';
    imagemPokemon.style.display = 'none';
  }

}

let setarPokemon = 1;

formularioPokemon.addEventListener('submit', (event) => {
  event.preventDefault();
  renderizarPokmeon(searchPokemon.value.toLowerCase());
});

btnAvancar.addEventListener('click', () => {
  setarPokemon += 1;
  renderizarPokmeon(setarPokemon);
});

btnVoltar.addEventListener('click', () => {
  if (setarPokemon > 1) {
    setarPokemon -= 1;
    renderizarPokmeon(setarPokemon);
  }
});

renderizarPokmeon(setarPokemon);