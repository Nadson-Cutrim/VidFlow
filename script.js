const containerVideos = document.querySelector(".videos__container"); // Seleciona o container onde os vídeos serão inseridos
const api3000 = fetch("http://localhost:3000/animes")
.then(res => res.json()) // Converte a resposta em JSON
.then((animes) => 
    animes.forEach(animes => {
containerVideos.innerHTML += ` 
<li class="videos__item">
<iframe src="${animes.url}" title="${animes.titulo}" frameborder="0" allowfullscreen></iframe> 
<div class="descricao-video">
<img class="img-canal" src="${animes.imagem}" alt="Logo do canal ${animes.canal}">
<h3 class="titulo-video">${animes.titulo}</h3>
<p class="descricao-video">${animes.descricao}</p>
</div>
</li>
`
    })
)

const api = fetch( "http://localhost:3001/videos") // Faz uma requisição para a API local que retorna os vídeos
.then(res => res.json()) // Converte a resposta em JSON
.then((videos) => 
    videos.forEach(video => {
containerVideos.innerHTML += ` 
<li class="videos__item">
<iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe> 
<div class="descricao-video">
<img class="img-canal" src="${video.imagem}" alt="Logo do canal ${video.canal}">
<h3 class="titulo-video">${video.titulo}</h3>
<p class="descricao-video">${video.descricao}</p>
</div>
</li>
`
    }) // Adiciona o HTML de cada vídeo no container
)
.catch((error) =>{
    containerVideos.innerHTML = `<p style="color:red">Erro ao carregar os vídeos: ${error}. Por favor, tente novamente mais tarde.</p>` // Caso ocorra um erro, exibe uma mensagem de erro
}) 

// json-server --watch backend/animes.json --port 3000 para rodar o json-server na porta 3000
// json-server --watch backend/videos.json --port 3001 para rodar o json-server na porta 3001