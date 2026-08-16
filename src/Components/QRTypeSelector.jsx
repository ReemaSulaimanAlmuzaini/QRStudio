function QRTypeSelector({ type, setType }) {
  const types = ['URL', 'Text', 'Wi-Fi', 'Email', 'Phone']

  return (
    <div className="mb-4">
      <label className="form-label fw-semibold">
        QR Code Type
      </label>

      <div className="d-flex flex-wrap gap-2">
        {types.map((item) => (
          <button
            key={item}
            type="button"
            className={
              type === item
                ? 'btn btn-primary'
                : 'btn btn-outline-primary'
            }
            onClick={() => setType(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QRTypeSelector