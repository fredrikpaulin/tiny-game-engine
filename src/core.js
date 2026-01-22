let canvas, ctx
export let init = id => { canvas = typeof id == 'string' ? document.getElementById(id) : id || document.querySelector('canvas'); ctx = canvas.getContext('2d'); return { canvas, ctx } }
export let getCtx = () => ctx
export let getCanvas = () => canvas
