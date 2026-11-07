import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { headTags, prerenderedBody, robotsTxt, sitemapXml, webManifest } from './src/lib/seo'

/** Injects SEO tags + a pre-rendered body into index.html and emits robots/sitemap/manifest. */
function seo(): Plugin {
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      return html.replace('<!--seo:head-->', headTags()).replace('<!--seo:body-->', prerenderedBody())
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
      this.emitFile({ type: 'asset', fileName: 'site.webmanifest', source: webManifest() })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
})
