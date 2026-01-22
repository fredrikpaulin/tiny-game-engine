import { entity } from './entity.js'
import { getCtx } from './core.js'

export let sprite = (p = {}) => {
  let s = entity(p)
  s.color = p.color; s.image = p.image; s.currentAnim = null
  s.render = (ctx = getCtx()) => {
    ctx.save()
    ;(s.x || s.y) && ctx.translate(s.x, s.y)
    s.rotation && ctx.rotate(s.rotation)
    s.opacity < 1 && (ctx.globalAlpha = s.opacity)
    let ax = -s.width * s.anchor.x, ay = -s.height * s.anchor.y
    ;(ax || ay) && ctx.translate(ax, ay)
    s.image ? ctx.drawImage(s.image, 0, 0, s.width || s.image.width, s.height || s.image.height)
      : s.currentAnim ? s.currentAnim.render(ctx, 0, 0, s.width, s.height)
      : s.color && (ctx.fillStyle = s.color, ctx.fillRect(0, 0, s.width, s.height))
    ctx.restore()
    p.render?.call(s, ctx)
  }
  let u = s.update
  s.update = dt => { u.call(s, dt); s.currentAnim?.update(dt) }
  return s
}
