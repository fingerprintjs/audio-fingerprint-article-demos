import memoizeOne from 'memoize-one'

export default function makeTopFade(
  ctx: CanvasRenderingContext2D,
): (x: number, y: number, width: number, height: number) => void {
  const getGradient = memoizeOne((y: number, height: number) => {
    const gradient = ctx.createLinearGradient(0, y, 0, y + height)
    gradient.addColorStop(0, 'rgba(0,0,0,0)')
    gradient.addColorStop(1, 'rgba(0,0,0,1)')
    return gradient
  })

  return (x, y, width, height) => {
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.clip()
    ctx.globalCompositeOperation = 'destination-in'
    ctx.fillStyle = getGradient(y, height)
    ctx.fill()
    ctx.restore()
  }
}
