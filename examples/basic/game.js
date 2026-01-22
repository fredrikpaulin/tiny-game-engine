// Basic example - Player movement with keyboard
import { 
  init, 
  loop, 
  sprite, 
  initInput, 
  keyDown, 
  getPointer,
  pointerDown,
  rand,
  clamp 
} from '/src/index.js'

let { canvas, ctx } = init('game')
initInput(canvas)

// Create player
let player = sprite({
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 32,
  height: 32,
  color: '#e94560',
  anchor: { x: 0.5, y: 0.5 }
})

// Create some targets
let targets = Array.from({ length: 5 }, () => sprite({
  x: rand(50, canvas.width - 50),
  y: rand(50, canvas.height - 50),
  width: 20,
  height: 20,
  color: '#0f3460',
  anchor: { x: 0.5, y: 0.5 }
}))

let speed = 200

// Game loop
loop({
  update(dt) {
    // Keyboard movement
    if (keyDown('left') || keyDown('a')) player.x -= speed * dt
    if (keyDown('right') || keyDown('d')) player.x += speed * dt
    if (keyDown('up') || keyDown('w')) player.y -= speed * dt
    if (keyDown('down') || keyDown('s')) player.y += speed * dt
    
    // Mouse/touch movement
    if (pointerDown()) {
      let pointer = getPointer()
      let dx = pointer.x - player.x
      let dy = pointer.y - player.y
      let dist = Math.hypot(dx, dy)
      if (dist > 5) {
        player.x += (dx / dist) * speed * dt
        player.y += (dy / dist) * speed * dt
      }
    }
    
    // Clamp to canvas bounds
    player.x = clamp(16, canvas.width - 16, player.x)
    player.y = clamp(16, canvas.height - 16, player.y)
    
    // Rotate targets
    targets.forEach(t => t.rotation += 2 * dt)
  },
  
  render() {
    // Draw targets
    targets.forEach(t => t.render(ctx))
    
    // Draw player
    player.render(ctx)
    
    // Draw instructions
    ctx.fillStyle = '#fff'
    ctx.font = '14px monospace'
    ctx.fillText('WASD / Arrow Keys / Click to move', 10, 20)
  }
}).start(ctx)
