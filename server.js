// Dev server with HMR
import { watch } from 'node:fs'
import index from './examples/basic/index.html'

let clients = new Set()

// Watch for file changes
watch('./src', { recursive: true }, () => {
  clients.forEach(ws => ws.send('reload'))
})

watch('./examples', { recursive: true }, () => {
  clients.forEach(ws => ws.send('reload'))
})

Bun.serve({
  port: 3000,
  
  fetch(req, server) {
    let url = new URL(req.url)
    
    // WebSocket upgrade for HMR
    if (url.pathname === '/__hmr') {
      if (server.upgrade(req)) return
      return new Response('WebSocket upgrade failed', { status: 500 })
    }
    
    // Serve index.html for root
    if (url.pathname === '/') {
      return new Response(index)
    }
    
    // Serve src files with correct MIME type
    if (url.pathname.startsWith('/src/')) {
      let file = Bun.file(`.${url.pathname}`)
      return new Response(file, {
        headers: { 'Content-Type': 'application/javascript' }
      })
    }
    
    // Serve other files
    let file = Bun.file(`./examples/basic${url.pathname}`)
    if (file.size > 0) return new Response(file)
    
    return new Response('Not Found', { status: 404 })
  },
  
  websocket: {
    open(ws) { clients.add(ws) },
    close(ws) { clients.delete(ws) },
    message() {}
  }
})

console.log('🎮 Dev server running at http://localhost:3000')
console.log('   Watching for changes...')
