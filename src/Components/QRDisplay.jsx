import { QRCodeSVG } from 'qrcode.react'

function QRDisplay({ value, onClear }) {
  if (!value) {
    return null
  }

  const downloadQR = () => {
    const svg = document.getElementById('qr-code')

    if (!svg) return

    const serializer = new XMLSerializer()
    const source = serializer.serializeToString(svg)

    const blob = new Blob([source], {
      type: 'image/svg+xml'
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'qr-code.svg'

    link.click()

    URL.revokeObjectURL(url)
  }

  const copyContent = async () => {
    await navigator.clipboard.writeText(value)
    alert('Content copied!')
  }

  return (
    <div className="text-center mt-4 pt-4 border-top">

      <h4>Your QR Code</h4>

      <div className="qr-box mt-3">
        <QRCodeSVG
          id="qr-code"
          value={value}
          size={240}
          level="H"
          includeMargin
        />
      </div>

      <div className="mt-4 d-flex justify-content-center gap-2">

        <button
          className="btn btn-success"
          onClick={downloadQR}
        >
          Download
        </button>

        <button
          className="btn btn-secondary"
          onClick={copyContent}
        >
          Copy
        </button>

        <button
          className="btn btn-outline-danger"
          onClick={onClear}
        >
          Clear
        </button>

      </div>

    </div>
  )
}

export default QRDisplay