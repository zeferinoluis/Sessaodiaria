# Sessão Diária — PWA

Pasta com a tua app pronta como PWA instalável: `manifest.json`, `service-worker.js` (funciona offline) e ícones em `icons/`.

## 1. Hospedar publicamente
O PWABuilder precisa de um URL público para ler o `manifest.json`. Opção mais simples e gratuita: **GitHub Pages**.

```bash
# dentro desta pasta
git init
git add .
git commit -m "Sessão Diária PWA"
git branch -M main
git remote add origin https://github.com/TEU-UTILIZADOR/sessao-diaria.git
git push -u origin main
```

Depois, no repositório: `Settings > Pages > Source: main / (root)`. O site fica disponível em algo como `https://teu-utilizador.github.io/sessao-diaria/`.

(Alternativas igualmente válidas: Netlify, Vercel, Cloudflare Pages — basta arrastar a pasta.)

## 2. Gerar o APK com o PWABuilder
1. Vai a **pwabuilder.com**
2. Cola o URL público do passo 1
3. Clica em "Start" e espera a análise (deve dar "ready" no Android)
4. Em "Android", escolhe "Generate Package" → transfere o `.apk`/`.aab`

## 3. Instalar/testar
- O `.apk` gerado pode ser instalado diretamente num telemóvel Android (ativa "Instalar de fontes desconhecidas" se pedido).
- A PWA também pode ser instalada sem APK nenhum: abrindo o URL no Chrome Android e usando "Adicionar ao ecrã principal".

## Notas
- O service worker guarda o HTML e os ícones em cache, por isso a app continua a abrir offline depois da primeira visita.
- Os dados da sessão continuam em `localStorage`, tal como no ficheiro original.
- Se quiseres publicar na Play Store via PWABuilder, o site precisa de estar em HTTPS (GitHub Pages já trata disso automaticamente).
