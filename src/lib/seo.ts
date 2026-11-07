/**
 * Build-time SEO, generated from the same content the site renders.
 * Imported by vite.config.ts — keep this file free of browser APIs.
 *
 * Content rules carried over from the rest of the site: no phone number, and
 * employer entries stay generic (no internal names, no architecture).
 */
import { achievements, archive, education, links, profile, site, stack } from './data'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const abs = (path: string) => new URL(path, site.url).href
const sameAs = links.filter((l) => l.href.startsWith('http')).map((l) => l.href)

/** JSON-LD: a profile page about one person, plus the website itself. */
export function structuredData() {
  const person = {
    '@type': 'Person',
    '@id': `${site.url}/#person`,
    name: profile.name,
    alternateName: `${profile.first} ${profile.last}`,
    url: site.url,
    image: abs(site.ogImage),
    jobTitle: profile.role,
    description: site.description,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Chennai', addressCountry: 'IN' },
    alumniOf: { '@type': 'CollegeOrUniversity', name: education.school },
    knowsAbout: stack.flatMap((g) => [...g.items]).filter((v, i, a) => a.indexOf(v) === i),
    sameAs,
  }
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profile`,
        url: site.url,
        name: site.title,
        inLanguage: 'en',
        mainEntity: { '@id': person['@id'] },
      },
      person,
      { '@type': 'WebSite', '@id': `${site.url}/#website`, url: site.url, name: profile.name, inLanguage: 'en' },
    ],
  }
}

/** Tags injected into <head>. */
export function headTags() {
  const image = abs(site.ogImage)
  const t = esc(site.title)
  const d = esc(site.description)
  return [
    `<link rel="canonical" href="${site.url}/" />`,
    `<meta name="description" content="${d}" />`,
    `<meta name="author" content="${esc(profile.name)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="profile" />`,
    `<meta property="og:site_name" content="${esc(profile.name)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:url" content="${site.url}/" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(site.ogImageAlt)}" />`,
    `<meta property="profile:first_name" content="${esc(profile.first)}" />`,
    `<meta property="profile:last_name" content="${esc(profile.last)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="twitter:image:alt" content="${esc(site.ogImageAlt)}" />`,
    `<script type="application/ld+json">${JSON.stringify(structuredData()).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
}

/**
 * Pre-rendered, semantic version of the page. Crawlers and no-JS visitors
 * read this; when the app boots, React replaces it with the same content.
 */
export function prerenderedBody() {
  const section = (id: string, title: string, inner: string) =>
    `<section aria-labelledby="pr-${id}"><h2 id="pr-${id}">${esc(title)}</h2>${inner}</section>`
  const entry = (e: (typeof archive)[number]) => {
    const link = e.href ?? e.repo
    return `<article><h3>${esc(e.title)} — ${esc(e.role)}</h3><p>${esc(e.period)} · ${esc(e.stack)}</p><ul>${e.points
      .map((p) => `<li>${esc(p)}</li>`)
      .join('')}</ul>${link ? `<p><a href="${esc(link)}">${esc(e.hrefLabel ?? 'Source on GitHub')}</a></p>` : ''}</article>`
  }
  const group = (kind: (typeof archive)[number]['kind']) => archive.filter((e) => e.kind === kind).map(entry).join('')

  return `<div id="prerender">
      <header><p>${esc(profile.role)} · ${esc(profile.location)}</p><h1>${esc(profile.name)}</h1><p>${esc(site.description)}</p>
      <nav aria-label="Profiles">${links.map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`).join(' · ')}</nav></header>
      <main>
        ${section('experience', 'Experience', group('Experience'))}
        ${section('projects', 'Projects', group('Project'))}
        ${section('open-source', 'Open source', group('Open source'))}
        ${section('skills', 'Skills', `<ul>${stack.map((g) => `<li><strong>${esc(g.group)}:</strong> ${g.items.map(esc).join(', ')}</li>`).join('')}</ul>`)}
        ${section('education', 'Education', `<p>${esc(education.school)} — ${esc(education.degree)}, CGPA ${esc(education.cgpa)} (${esc(education.period)})</p>`)}
        ${section('achievements', 'Achievements', `<ul>${achievements.map((a) => `<li>${esc(a.value)} — ${esc(a.label)}</li>`).join('')}</ul>`)}
        ${section('contact', 'Contact', `<p><a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a> · <a href="${esc(profile.resume)}">Resume (PDF)</a></p>`)}
      </main>
    </div>`
}

export const robotsTxt = () => `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`

export const sitemapXml = (lastmod = new Date().toISOString().slice(0, 10)) =>
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${site.url}/</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
  <url><loc>${abs(profile.resume)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>0.6</priority></url>
</urlset>
`

export const webManifest = () =>
  JSON.stringify(
    {
      name: `${profile.name} — ${profile.role}`,
      short_name: profile.first,
      start_url: '/',
      display: 'standalone',
      background_color: '#0a0a0a',
      theme_color: '#0a0a0a',
      icons: [
        { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2,
  )
