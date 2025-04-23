const containerVideos = document.querySelector(".videos__container"); // Seleciona o container onde os vídeos serão inseridos

async function buscareMostrarVideos() {
  try {
    const buscaAnimes = await fetch("http://localhost:3000/animes");
    const videosAnime = await buscaAnimes.json(); // Faz uma requisição para a API local que retorna os vídeos

    videosAnime.forEach((animes) => {
        if(animes.categoria == ""){
            throw new Error("Video sem categoria")
        }
      containerVideos.innerHTML += ` 
                <li class="videos__item">
                <iframe src="${animes.url}" title="${animes.titulo}" frameborder="0" allowfullscreen></iframe> 
                <div class="descricao-video">
                <img class="img-canal" src="${animes.imagem}" alt="Logo do canal ${animes.canal}">
                <h3 class="titulo-video">${animes.titulo}</h3>
                <p class="categoria" hidden>${animes.categoria}</p>
                <p class="descricao-video">${animes.descricao}</p>
                </div>
                </li> `;
    });

    const buscaAlura = await fetch("http://localhost:3001/videos");
    const videosAlura = await buscaAlura.json(); // Converte a resposta em JSON

    videosAlura.forEach((video) => {
        if(video.categoria == ""){
            throw new Error("Video sem categoria")
        }
      containerVideos.innerHTML += ` 
                <li class="videos__item">
                <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe> 
                <div class="descricao-video">
                <img class="img-canal" src="${video.imagem}" alt="Logo do canal ${video.canal}">
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="descricao-video">${video.descricao}</p>
                <p class="categoria" hidden>${video.categoria}</p>
                </div>
                
                </li>`;
    }); // Adiciona o HTML de cada vídeo no container
  } catch (error) {
    containerVideos.innerHTML = `<p class="erro">Erro ao carregar os vídeos. Tente novamente mais tarde.${error}</p>`; // Caso ocorra um erro, exibe uma mensagem de erro
  }
}
buscareMostrarVideos();

const barraDePesquisa = document.querySelector(".pesquisar__input"); // Seleciona a barra de pesquisa
    barraDePesquisa.addEventListener("input",filtrarPesquisa); // Adiciona um evento de input à barra de pesquisa
    function filtrarPesquisa(){
        const videos = document.querySelectorAll(".videos__item");
        const valorFiltro = barraDePesquisa.value.toLowerCase();
        videos.forEach((video) => {
            const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
        
            video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block'; // Exibe ou oculta o vídeo com base no filtro
        });
}
const botaoCategoria = document.querySelectorAll(".superior__item"); // Seleciona o botão de categorias

botaoCategoria.forEach((botao) => {
    let nomeCategoria = botao.getAttribute("name")
    botao.addEventListener("click", () => filtrarPorCategoria(nomeCategoria)) // Adiciona um evento de clique ao botão de categorias
})

function filtrarPorCategoria(filtro){
    const videos = document.querySelectorAll(".videos__item");
for( let video of videos){
        let categoria = video.querySelector(".categoria").textContent.toLowerCase();
        let valorFiltro = filtro.toLowerCase();

        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo'){
            video.style.display = "none"; 
        } else {
        video.style.display = "block";
     }
    
}
}

// json-server --watch backend/animes.json --port 3000 para rodar o json-server na porta 3000
// json-server --watch backend/videos.json --port 3001 para rodar o json-server na porta 3001
