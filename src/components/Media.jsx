// Imagem ou vídeo curto em loop (o antigo GIF virou MP4, bem mais leve)
export default function Media({ src, ...props }) {
  if (src.endsWith('.mp4')) return <video src={src} autoPlay muted loop playsInline preload="auto" {...props} />;
  return <img src={src} alt="" decoding="async" {...props} />;
}
