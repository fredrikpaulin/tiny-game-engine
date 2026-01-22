import { emit } from './events.js'

export let loop = ({ update, render, fps = 60, clear = true } = {}) => {
  let dt = 1 / fps, acc = 0, last = 0, raf, running = false, ctx
  let frame = now => {
    raf = requestAnimationFrame(frame)
    let d = Math.min((now - last) / 1000, 0.25); last = now; acc += d
    while (acc >= dt) { emit('tick'); update?.(dt); acc -= dt }
    clear && ctx && ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    render?.()
  }
  return {
    start(c) { running || (ctx = c, running = true, last = performance.now(), raf = requestAnimationFrame(frame)); return this },
    stop() { running = false; cancelAnimationFrame(raf); return this }
  }
}
