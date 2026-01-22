// Build script for production bundle
import { mkdir } from 'node:fs/promises'

await mkdir('./dist', { recursive: true })

// ESM build
let esm = await Bun.build({
  entrypoints: ['./src/index.js'],
  outdir: './dist',
  naming: 'tiny.mjs',
  minify: false,
  format: 'esm',
})

// Minified ESM build
let esmMin = await Bun.build({
  entrypoints: ['./src/index.js'],
  outdir: './dist',
  naming: 'tiny.min.mjs',
  minify: true,
  format: 'esm',
})

// CJS build
let cjs = await Bun.build({
  entrypoints: ['./src/index.js'],
  outdir: './dist',
  naming: 'tiny.js',
  minify: false,
  format: 'cjs',
})

// Minified CJS build
let cjsMin = await Bun.build({
  entrypoints: ['./src/index.js'],
  outdir: './dist',
  naming: 'tiny.min.js',
  minify: true,
  format: 'cjs',
})

// Report sizes
let files = ['tiny.mjs', 'tiny.min.mjs', 'tiny.js', 'tiny.min.js']
console.log('\nBuild complete!\n')
console.log('File sizes:')
for (let f of files) {
  let file = Bun.file(`./dist/${f}`)
  let size = file.size
  let gzip = Bun.gzipSync(await file.arrayBuffer()).length
  console.log(`  ${f.padEnd(15)} ${size.toString().padStart(6)}B  (gzip: ${gzip}B)`)
}
