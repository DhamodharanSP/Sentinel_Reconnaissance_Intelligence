// components/AddDetails_Component/utils.js

// Convert dataURL → Blob (for uploads)
export function dataUrlToBlob(dataUrl) {
  const parts = dataUrl.split(",")
  const mime = parts[0].match(/:(.*?);/)[1]
  const bstr = atob(parts[1])
  let n = bstr.length
  const u8 = new Uint8Array(n)
  while (n--) u8[n] = bstr.charCodeAt(n)
  return new Blob([u8], { type: mime })
}

// Enhance image slightly (brightness & contrast tweak)
export function enhanceImageDataUrl(dataUrl) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const d = imageData.data
        const contrast = 1.06
        const brightness = 8
        const factor = (259 * (contrast + 255)) / (255 * (259 - contrast))
        for (let i = 0; i < d.length; i += 4) {
          for (let c = 0; c < 3; c++) {
            let val = d[i + c]
            val = factor * (val - 128) + 128 + brightness
            d[i + c] = Math.max(0, Math.min(255, val))
          }
        }
        ctx.putImageData(imageData, 0, 0)
        resolve(canvas.toDataURL("image/png"))
      } catch (err) {
        resolve(dataUrl)
      }
    }
    img.src = dataUrl
  })
}
