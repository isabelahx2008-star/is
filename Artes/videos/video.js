const videoStage = document.querySelector(".video-stage");
const videoError = document.querySelector("#video-error");
const fullscreenButton = document.querySelector(".video-fullscreen");
const videoPlayer = document.querySelector("#video-player");
const videoPlaceholder = document.querySelector("#video-placeholder");

videoPlayer.addEventListener("error", () => {
  videoError.textContent = "Vídeo ainda não encontrado ou formato incompatível. Coloque o arquivo MP4 em videos/midia/apresentacao.mp4.";
});

videoPlayer.addEventListener("loadeddata", () => {
  videoError.textContent = "";
  videoPlaceholder.hidden = true;
});

fullscreenButton.addEventListener("click", async () => {
  try {
    if (document.fullscreenElement === videoStage) {
      await document.exitFullscreen();
      fullscreenButton.textContent = "Tela cheia";
    } else {
      await videoStage.requestFullscreen();
      fullscreenButton.textContent = "Sair da tela cheia";
    }
  } catch {
    videoError.textContent = "Não foi possível abrir a tela cheia neste navegador.";
  }
});
