# RoofIQ v1

Commercial roofing market intelligence dashboard for Vercel.

## What this includes

- Next.js 14 app
- Tailwind UI
- Recharts visualizations
- City selector
- Region and tier filters
- Roofing feasibility score
- FM feasibility score
- Weather productivity module
- Editable market data in `lib/marketData.ts`

## Local setup

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Deploy to Vercel

1. Create a GitHub repo.
2. Upload this project folder.
3. In Vercel, click **New Project**.
4. Import the GitHub repo.
5. Deploy.

No environment variables are required for this basic dashboard.

## Editing city data

Open:

```txt
lib/marketData.ts
```

Add or edit cities there.

## Important data note

The current market data is starter/prototype data. Replace it with sourced data before using it commercially.

Recommended future data sources:

- NOAA/NCEI climate normals for rainfall and rain days
- NOAA storm event database for hail/wind/tornado history
- Census/ACS for population and business growth
- BLS QCEW for roofing/construction labor data
- Census Building Permits Survey for construction activity
- Google Places API for contractor/competitor density
- Local permit portals where available

## Next build targets

- Add U.S. map
- Add source confidence labels
- Add Supabase database
- Add city report pages
- Add PDF export
- Add admin city editor
- Add research agent ingestion queue
