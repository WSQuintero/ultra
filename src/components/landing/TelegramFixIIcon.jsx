
function TelegramIcon() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '35px',
        right: '35px',
        width: '60px',
        height: '60px',
        cursor: 'pointer',
        zIndex: '999', 
        transition: 'transform 0.3s ease', 
      }}
    >
      <img 
        src="/Ultra_files/Telegram.svg" 
        alt="Telegram Icon" 
        style={{ width: '100%', height: '100%' }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.2)'; }} 
        onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }} 
      />
    </div>
  );
}

export default TelegramIcon;
