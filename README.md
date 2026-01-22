# Tiny Game Engine 🎮

A minimalist 2D game engine optimized for [JS13K](https://js13kgames.com/) competitions.

**Target size:** < 2KB gzipped (leaving ~11KB for your game code)

## Features

- ✅ Fixed timestep game loop (60 FPS)
- ✅ Entity system with velocity/acceleration
- ✅ Sprite rendering (rect, image, animation)
- ✅ Unified keyboard + pointer input
- ✅ Collision detection (AABB, circle, circle-rect)
- ✅ Object pooling for particles/bullets
- ✅ Zero dependencies
- ✅ Tree-shakeable exports

## Installation

```bash
bun add tiny-game-engine
```

## Quick Start

```js
import { init, loop, sprite, initInput, keyDown, clamp } from 'tiny-game-engine'

let { canvas, ctx } = init('game')
initInput(canvas)

let player = sprite({
  x: 100,
  y: 100,
  width: 32,
  height: 32,
  color: '#e94560'
})

loop({
  update(dt) {
    if (keyDown('left')) player.x -= 200 * dt
    if (keyDown('right')) player.x += 200 * dt
    if (keyDown('up')) player.y -= 200 * dt
    if (keyDown('down')) player.y += 200 * dt
    
    player.x = clamp(0, canvas.width - 32, player.x)
    player.y = clamp(0, canvas.height - 32, player.y)
  },
  render() {
    player.render(ctx)
  }
}).start(ctx)
```

## API

### Core

```js
import { init, getCtx, getCanvas } from 'tiny-game-engine'

let { canvas, ctx } = init('canvas-id') // or pass canvas element
```

### Game Loop

```js
import { loop } from 'tiny-game-engine'

let gameLoop = loop({
  fps: 60,        // target framerate (default: 60)
  clear: true,    // auto-clear canvas (default: true)
  update(dt) {},  // called at fixed timestep
  render() {}     // called every frame
})

gameLoop.start(ctx)
gameLoop.stop()
```

### Vectors

```js
import { vec, add, sub, scale, len, norm, dot, dist } from 'tiny-game-engine'

let v = vec(3, 4)
let length = len(v)        // 5
let normalized = norm(v)   // { x: 0.6, y: 0.8 }

// Zero-allocation in hot paths
let out = vec()
add(a, b, out) // result stored in `out`
```

### Entities & Sprites

```js
import { entity, sprite } from 'tiny-game-engine'

// Base entity (no rendering)
let e = entity({
  x: 0, y: 0,
  dx: 10, dy: 0,     // velocity
  ddx: 0, ddy: 9.8,  // acceleration
  ttl: 5             // time to live (seconds)
})

// Sprite (renderable entity)
let s = sprite({
  x: 100, y: 100,
  width: 32, height: 32,
  color: '#ff0000',
  anchor: { x: 0.5, y: 0.5 },
  opacity: 0.8,
  rotation: Math.PI / 4
})
```

### Input

```js
import { initInput, keyDown, getPointer, pointerDown } from 'tiny-game-engine'

initInput(canvas)

// In update loop
if (keyDown('left')) { /* ... */ }
if (keyDown('a')) { /* ... */ }
if (keyDown('space')) { /* ... */ }

let { x, y } = getPointer()
if (pointerDown()) { /* ... */ }
```

### Collision

```js
import { aabb, circle, circleRect, pointRect, pointCircle } from 'tiny-game-engine'

if (aabb(player, enemy)) { /* collision! */ }
if (circle(bullet, target)) { /* collision! */ }
```

### Object Pool

```js
import { pool, sprite } from 'tiny-game-engine'

let bullets = pool(() => sprite({
  width: 4, height: 4,
  color: '#fff',
  ttl: 2
}))

// Get bullet from pool
let bullet = bullets.get({ x: player.x, y: player.y, dy: -300 })

// In game loop
bullets.update(dt)  // auto-releases dead bullets
bullets.render(ctx)
```

### Helpers

```js
import { lerp, clamp, degToRad, radToDeg, rand, randInt, pick } from 'tiny-game-engine'

lerp(0, 100, 0.5)      // 50
clamp(0, 100, 150)     // 100
degToRad(90)           // 1.5707...
rand(10, 20)           // random float 10-20
randInt(1, 6)          // random int 1-6
pick(['a', 'b', 'c'])  // random element
```

### Events

```js
import { on, off, emit, once } from 'tiny-game-engine'

on('score', points => console.log(`+${points}`))
emit('score', 100)

once('gameover', () => { /* called once */ })
```

## Development

```bash
bun run dev      # Start dev server with HMR
bun run build    # Bundle for production
bun run test     # Run tests
bun run size     # Check bundle size
```

## License

MIT
