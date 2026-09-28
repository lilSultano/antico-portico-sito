# Trattoria Antico Portico — sito web

Sito vetrina della Trattoria Antico Portico (Treviso). React + Vite + Tailwind, pubblicato su GitHub Pages.

## Sviluppo

```bash
npm install
npm run dev      # server locale
npm run build    # build di produzione in dist/
npm run preview  # anteprima della build
```

Testi, orari, contatti e menù (IT/EN) sono in `src/app/App.tsx`, nell'oggetto `content`.
Le foto sono in `src/images/`, favicon e logo in `public/`.

## Pubblicazione

Ogni push su `main` pubblica il sito tramite GitHub Actions (`.github/workflows/deploy.yml`).

Configurazione una tantum su GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Dominio personalizzato

1. DNS dal registrar:
   - dominio principale: 4 record `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: record `CNAME` → `<utente-github>.github.io`
2. GitHub: **Settings → Pages → Custom domain** → inserire il dominio, poi attivare **Enforce HTTPS**.
3. Consigliato: verificare il dominio in **Settings (account) → Pages → Verified domains**.
4. Dominio: `anticoporticotreviso.it` (già impostato in `index.html` per canonical, Open Graph e dati strutturati).
