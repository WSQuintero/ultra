import React from "react"
import QRCode from "react-qr-code"

function WalletAddressQR({ address }) {
  return (
    <div
      style={{
        border: "3px solid white",
        padding: "10px",
        backgroundColor: "white",
        maxWidth: "280px"
      }}>
      <QRCode value={address} size={250} />
    </div>
  )
}

export default WalletAddressQR
