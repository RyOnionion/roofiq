'use client';

import { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { calculateScores, marketData } from '../lib/marketData';

const regions = ['All', ...Array.from(new Set(marketData.map((c) => c.region)))];
const tiers = ['All', 'Tier 1', 'Tier 2', 'Tier 3'];

export default function RoofIQDashboard() {
  const [selectedCity, setSelectedCity] = useState(marketData[0].city);
  const [region, setRegion] = useState('All');
  const [tier, setTier] = useState('All');

  const filtered = useMemo(() => {
    return marketData.filter((c) => (region === 'All' || c.region === region) && (tier === 'All' || c.tier === tier));
  }, [region, tier]);

  const city = marketData.find((c) => c.city === selectedCity) || marketData[0];
  const scores = calculateScores(city);

  const scoreRows = filtered.map((c) => ({
    name: c.city,
    Roofing: calculateScores(c).roofingScore,
    FM: calculateScores(c).fmScore,
    WorkableDays: c.workableRoofDays
  }));

  const radarData = [
    { metric: 'Demand', value: city.commercialDemand },
    { metric: 'Industrial', value: city.industrialGrowth },
    { metric: 'FM Fit', value: city.fmFit },
    { metric: 'Weather', value: city.weatherRisk },
    { metric: 'Labor', value: city.laborAvailability },
    { metric: 'Permits', value: city.permitActivity }
  ];

  const weatherRows = filtered.map((c) => ({
    name: c.city,
    RainDays: c.rainDaysPerYear,
    WorkableDays: c.workableRoofDays,
    Rainfall: c.annualRainfallInches
  }));

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 bg-slate-900/70 px-6 py-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">RoofIQ</p>
              <h1 className="mt-2 text-3xl font-bold md:text-5xl">Commercial Roofing Market Intelligence</h1>
              <p className="mt-3 max-w-3xl text-slate-300">Score metro markets by roofing demand, FM fit, competition, labor, permits, and weather productivity risk.</p>
            </div>
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-950/30 px-5 py-4 text-sm text-cyan-100">
              <div className="font-semibold">Current Build</div>
              <div>Prototype data model. Replace values with sourced data before selling the gospel.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-6 py-6">
        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2">
            <span className="text-sm text-slate-400">City</span>
            <select className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              {marketData.map((c) => <option key={c.city}>{c.city}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-400">Region Filter</span>
            <select className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3" value={region} onChange={(e) => setRegion(e.target.value)}>
              {regions.map((r) => <option key={r}>{r}</option>)}
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm text-slate-400">Tier Filter</span>
            <select className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3" value={tier} onChange={(e) => setTier(e.target.value)}>
              {tiers.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Metric title="Roofing Score" value={scores.roofingScore} suffix="/100" />
          <Metric title="FM Score" value={scores.fmScore} suffix="/100" />
          <Metric title="Rain Days" value={city.rainDaysPerYear} suffix="/yr" />
          <Metric title="Workable Roof Days" value={city.workableRoofDays} suffix="/yr" />
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:col-span-3">
            <h2 className="mb-4 text-xl font-semibold">Market Score Comparison</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreRows} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#94a3b8" angle={-20} textAnchor="end" height={60} />
                  <YAxis stroke="#94a3b8" domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: 12 }} />
                  <Bar dataKey="Roofing" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="FM" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold">{city.city}, {city.state} Score Profile</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} outerRadius={105}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="metric" stroke="#cbd5e1" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#64748b" />
                  <Radar name="Score" dataKey="value" fillOpacity={0.45} />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:col-span-3">
            <h2 className="mb-4 text-xl font-semibold">Weather Productivity Impact</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherRows} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                  <XAxis dataKey="name" stroke="#94a3b8" angle={-20} textAnchor="end" height={60} />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: 12 }} />
                  <Bar dataKey="RainDays" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="WorkableDays" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 lg:col-span-2">
            <h2 className="text-xl font-semibold">City Intelligence</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <Info label="Region" value={city.region} />
              <Info label="Tier" value={city.tier} />
              <Info label="Population" value={city.population.toLocaleString()} />
              <Info label="Annual Rainfall" value={`${city.annualRainfallInches} in`} />
              <Info label="Rainfall per 1M Residents" value={`${scores.rainPerCapita} in`} />
              <Info label="Weather Delay Risk" value={`${scores.weatherDelayRisk}/100`} />
            </div>
            <p className="mt-5 rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-slate-300">{city.notes}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <div className="border-b border-slate-800 px-5 py-4">
            <h2 className="text-xl font-semibold">Filtered Market Table</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-950 text-slate-400">
                <tr>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Region</th>
                  <th className="px-4 py-3">Tier</th>
                  <th className="px-4 py-3">Roofing</th>
                  <th className="px-4 py-3">FM</th>
                  <th className="px-4 py-3">Rain Days</th>
                  <th className="px-4 py-3">Workable Days</th>
                  <th className="px-4 py-3">Competition</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => {
                  const s = calculateScores(c);
                  return (
                    <tr key={c.city} className="border-t border-slate-800 hover:bg-slate-800/40">
                      <td className="px-4 py-3 font-medium">{c.city}, {c.state}</td>
                      <td className="px-4 py-3">{c.region}</td>
                      <td className="px-4 py-3">{c.tier}</td>
                      <td className="px-4 py-3">{s.roofingScore}</td>
                      <td className="px-4 py-3">{s.fmScore}</td>
                      <td className="px-4 py-3">{c.rainDaysPerYear}</td>
                      <td className="px-4 py-3">{c.workableRoofDays}</td>
                      <td className="px-4 py-3">{c.competitionPressure}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value, suffix }: { title: string; value: number; suffix: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-2 text-3xl font-bold">{value}<span className="text-base text-slate-400"> {suffix}</span></div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className="flex justify-between gap-4 border-b border-slate-800 pb-2"><span className="text-slate-500">{label}</span><span className="font-medium text-slate-200">{value}</span></div>;
}
