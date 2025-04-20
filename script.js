const containerVideos = document.querySelector(".videos__container"); // Seleciona o container onde os vídeos serão inseridos

const api = fetch("http://localhost:3000/videos") // Faz uma requisição para a API local que retorna os vídeos
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
    containerVideos.innerHTML = `<p>Erro ao carregar os vídeos: ${error}</p>` // Caso ocorra um erro, exibe uma mensagem de erro
})