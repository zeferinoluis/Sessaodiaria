const CACHE_NOME = 'sessao-diaria-v11';
const FICHEIROS = [
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png'
];

self.addEventListener('install', (evento) => {
  evento.waitUntil(
    caches.open(CACHE_NOME).then((cache) => cache.addAll(FICHEIROS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(nomes.filter((n) => n !== CACHE_NOME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evento) => {
  const pedido = evento.request;
  const ehNavegacao = pedido.mode === 'navigate' || (pedido.destination === 'document');

  if (ehNavegacao) {
    // HTML: tenta sempre a rede primeiro para nunca ficar preso numa versão antiga
    evento.respondWith(
      fetch(pedido)
        .then((resposta) => {
          const copia = resposta.clone();
          caches.open(CACHE_NOME).then((cache) => cache.put(pedido, copia));
          return resposta;
        })
        .catch(() => caches.match(pedido).then((r) => r || caches.match('./index.html')))
    );
    return;
  }

  // Restantes ficheiros: cache primeiro, com atualização em segundo plano
  evento.respondWith(
    caches.match(pedido).then((respostaCache) => {
      const pedidoRede = fetch(pedido).then((respostaRede) => {
        caches.open(CACHE_NOME).then((cache) => cache.put(pedido, respostaRede.clone()));
        return respostaRede;
      }).catch(() => respostaCache);
      return respostaCache || pedidoRede;
    })
  );
});
