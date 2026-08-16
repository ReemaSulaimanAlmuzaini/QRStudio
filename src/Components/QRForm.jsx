import { useState } from 'react'
import QRTypeSelector from './QRTypeSelector'
import QRDisplay from './QRDisplay'

function QRForm() {

  const [type, setType] = useState('URL')

  const [text, setText] = useState('')

  const [qrValue, setQrValue] = useState('')

  const [wifiName, setWifiName] = useState('')
  const [wifiPassword, setWifiPassword] = useState('')
  const [wifiSecurity, setWifiSecurity] = useState('WPA')

  const [error, setError] = useState('')


  const generateQR = () => {

    setError('')

    if (type === 'Wi-Fi') {

      if (!wifiName.trim()) {
        setError('Please enter the Wi-Fi name.')
        return
      }

      const wifiData =
        `WIFI:T:${wifiSecurity};S:${wifiName};P:${wifiPassword};;`

      setQrValue(wifiData)

      return
    }


    if (!text.trim()) {
      setError('Please enter something first.')
      return
    }


    let value = text.trim()


    if (type === 'Email') {
      value = `mailto:${value}`
    }


    if (type === 'Phone') {
      value = `tel:${value}`
    }


    setQrValue(value)
  }


  const clearQR = () => {
    setQrValue('')
    setError('')
  }


  return (

    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-8 col-lg-6">

          <div className="text-center mb-4">

            <h1 className="fw-bold text-dark">
              Create Your QR Code
            </h1>

            <p className="text-muted">
              Create QR codes for URLs, text,
              Wi-Fi, email and phone numbers.
            </p>

          </div>


          <div className="card shadow-sm border-0">

            <div className="card-body p-4">

              <QRTypeSelector
                type={type}
                setType={(newType) => {
                  setType(newType)
                  setQrValue('')
                  setError('')
                }}
              />


              {type === 'URL' && (

                <div className="mb-3">

                  <label className="form-label">
                    Website URL
                  </label>

                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://example.com"
                    value={text}
                    onChange={(e) =>
                      setText(e.target.value)
                    }
                  />

                </div>

              )}


              {type === 'Text' && (

                <div className="mb-3">

                  <label className="form-label">
                    Your Text
                  </label>

                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Enter your text..."
                    value={text}
                    onChange={(e) =>
                      setText(e.target.value)
                    }
                  />

                </div>

              )}


              {type === 'Email' && (

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@email.com"
                    value={text}
                    onChange={(e) =>
                      setText(e.target.value)
                    }
                  />

                </div>

              )}


              {type === 'Phone' && (

                <div className="mb-3">

                  <label className="form-label">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    className="form-control"
                    placeholder="+966 5XXXXXXXX"
                    value={text}
                    onChange={(e) =>
                      setText(e.target.value)
                    }
                  />

                </div>

              )}


              {type === 'Wi-Fi' && (

                <>
                  <div className="mb-3">

                    <label className="form-label">
                      Wi-Fi Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="My Wi-Fi"
                      value={wifiName}
                      onChange={(e) =>
                        setWifiName(e.target.value)
                      }
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Password
                    </label>

                    <input
                      type="password"
                      className="form-control"
                      placeholder="Wi-Fi password"
                      value={wifiPassword}
                      onChange={(e) =>
                        setWifiPassword(e.target.value)
                      }
                    />

                  </div>


                  <div className="mb-3">

                    <label className="form-label">
                      Security
                    </label>

                    <select
                      className="form-select"
                      value={wifiSecurity}
                      onChange={(e) =>
                        setWifiSecurity(e.target.value)
                      }
                    >

                      <option value="WPA">
                        WPA / WPA2
                      </option>

                      <option value="WEP">
                        WEP
                      </option>

                      <option value="nopass">
                        No Password
                      </option>

                    </select>

                  </div>
                </>

              )}


              {error && (

                <div className="alert alert-danger">
                  {error}
                </div>

              )}


              <button
                className="btn btn-primary w-100"
                onClick={generateQR}
              >
                Generate QR Code
              </button>


              <QRDisplay
                value={qrValue}
                onClear={clearQR}
              />

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default QRForm