let keys = {}, pointer = { x: 0, y: 0, down: false }

export let initInput = c => {
  onkeydown = e => keys[e.key] = true
  onkeyup = e => keys[e.key] = false
  onblur = () => keys = {}
  let pos = e => { let r = c.getBoundingClientRect(); pointer.x = (e.clientX - r.left) * c.width / r.width; pointer.y = (e.clientY - r.top) * c.height / r.height }
  c.onmousedown = e => { pos(e); pointer.down = true }
  c.onmouseup = c.onmouseleave = () => pointer.down = false
  c.onmousemove = pos
  c.ontouchstart = e => { e.preventDefault(); pos(e.touches[0]); pointer.down = true }
  c.ontouchend = () => pointer.down = false
  c.ontouchmove = e => { e.preventDefault(); pos(e.touches[0]) }
}

export let keyDown = k => !!keys[k]
export let getPointer = () => pointer
