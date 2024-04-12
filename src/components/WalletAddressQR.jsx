import QRCode from "qrcode.react"

function WalletAddressQR({ address }) {
  return (
    <div>
      <QRCode value={address} size={350} />
    </div>
  )
}

export default WalletAddressQR
