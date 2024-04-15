import QRCode from "react-qr-code"

function WalletAddressQR({ address }) {
  return (
    <div>
      <QRCode value={address} size={250} />
    </div>
  )
}

export default WalletAddressQR
