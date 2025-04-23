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
                <p class="categoria" hidden>${video.categoria}</p>
                <p class="descricao-video">${video.descricao}</p>
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
    if (barraDePesquisa.value != "") {
       for(let video of videos){
        let tituloVideo = video.querySelector(".titulo-video").textContent.toLowerCase();
        let valorFiltro = barraDePesquisa.value.toLowerCase();

        if(!tituloVideo.includes(valorFiltro)){
            video.style.display = "none"; // Se o título do vídeo não incluir o valor da barra de pesquisa, oculta o vídeo
        }else{
            video.style.display = "block"; // Caso contrário, exibe o vídeo
        }
       }
    } else{
        video.style.display = "block"; // Se a barra de pesquisa estiver vazia, exibe todos os vídeos
    }
}





// json-server --watch backend/animes.json --port 3000 para rodar o json-server na porta 3000
// json-server --watch backend/videos.json --port 3001 para rodar o json-server na porta 3001
