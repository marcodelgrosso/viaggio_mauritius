# Viaggio Mauritius 2026

Progetto React + Vite con server Node.js e database Supabase per la landing page del viaggio a Mauritius.

## 🚀 Setup

### 1. Installazione dipendenze

```bash
npm install
```

### 2. Configurazione Supabase

1. Crea un progetto su [Supabase](https://supabase.com)
2. Copia il file `env.example` in `.env`
3. Inserisci le tue credenziali Supabase:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3001
```

### 3. Setup Database

Esegui lo script SQL in `supabase/schema.sql` nel tuo progetto Supabase:
- Vai su SQL Editor nel dashboard Supabase
- Copia e incolla il contenuto di `supabase/schema.sql`
- Esegui lo script

### 4. Avvio del progetto

**Terminale 1 - Frontend (React + Vite):**
```bash
npm run dev
```
Il frontend sarà disponibile su `http://localhost:3000`

**Terminale 2 - Backend (Node.js):**
```bash
npm run server
```
Il server sarà disponibile su `http://localhost:3001`

## 📁 Struttura del progetto

```
├── src/
│   ├── components/       # Componenti React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Stats.jsx
│   │   ├── Features.jsx
│   │   ├── Timeline.jsx
│   │   ├── Reframe.jsx
│   │   ├── Pricing.jsx
│   │   └── CTA.jsx
│   ├── App.jsx          # Componente principale
│   ├── main.jsx         # Entry point
│   └── index.css        # Stili globali
├── server/
│   └── index.js         # Server Express
├── supabase/
│   └── schema.sql       # Schema database
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Script disponibili

- `npm run dev` - Avvia il frontend in modalità sviluppo
- `npm run build` - Build per produzione
- `npm run preview` - Preview del build di produzione
- `npm run server` - Avvia il server Node.js
- `npm run dev:server` - Avvia il server con auto-reload

## 🚀 Deploy su Vercel

### Configurazione Vercel

1. **Framework Preset**: Vite (dovrebbe essere rilevato automaticamente)
2. **Build Command**: `npm run build` (o `npm install && npm run build`)
3. **Output Directory**: `dist`
4. **Install Command**: `npm install` (default)

### Variabili d'Ambiente su Vercel

Aggiungi queste variabili d'ambiente nel progetto Vercel:

- `VITE_SUPABASE_URL` = `https://dsunfhjfgruxuklbmzic.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = (chiave anon di Supabase)

**Dove aggiungere le variabili:**
- Vai su Vercel Dashboard → Il tuo progetto → Settings → Environment Variables
- Aggiungi le variabili per tutti gli ambienti (Production, Preview, Development)

### Nota sul Backend

Il server Express (`server/index.js`) non può essere deployato su Vercel come server tradizionale. Opzioni:

1. **Deploy solo frontend** (consigliato per ora) - Il frontend React si collega direttamente a Supabase
2. **Converti API in Vercel Serverless Functions** - Se hai bisogno del backend su Vercel

## 📡 API Endpoints

- `GET /api/health` - Health check del server
- `GET /api/interested` - Ottiene il numero di persone interessate
- `POST /api/interested` - Aggiunge una persona interessata
- `GET /api/trip` - Ottiene i dettagli del viaggio

## 🗄️ Database

Il database Supabase contiene due tabelle:

1. **interested_people**: Persone interessate al viaggio
   - id (UUID)
   - name (TEXT)
   - email (TEXT)
   - phone (TEXT, opzionale)
   - message (TEXT, opzionale)
   - created_at (TIMESTAMP)

2. **trip_details**: Dettagli del viaggio
   - id (INTEGER)
   - destination (TEXT)
   - dates (TEXT)
   - price (DECIMAL)
   - deposit (DECIMAL)
   - interested_count (INTEGER)

## 🔒 Sicurezza

- Row Level Security (RLS) è abilitato su Supabase
- Le policy permettono letture pubbliche e inserimenti (senza autenticazione)
- I dati sensibili non sono esposti pubblicamente

## 📝 Note

- Il progetto non include autenticazione come richiesto
- Il numero WhatsApp nel componente CTA deve essere aggiornato (in `src/components/CTA.jsx`)
- Le immagini utilizzano Unsplash, puoi sostituirle con immagini locali
- Il file `.env` deve essere creato manualmente copiando `env.example`

## 🎨 Personalizzazione

- Aggiorna il numero WhatsApp in `src/components/CTA.jsx` (riga ~15)
- Modifica i dati del viaggio in `src/components/` o tramite il database Supabase
- Personalizza i colori e gli stili modificando le variabili CSS in `src/index.css`
