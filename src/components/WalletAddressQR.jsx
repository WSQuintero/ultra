import QRCode from "react-qr-code"

function WalletAddressQR({ address }) {
  return (
    <div>
      <QRCode value={address} size={350} />
    </div>
  )
}

export default WalletAddressQR
