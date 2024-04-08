import  { useEffect } from 'react';

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          description: 'Gold',
          proName: 'OANDA:XAUUSD'
        },
        {
          description: 'Bitcoin',
          proName: 'BITSTAMP:BTCUSD'
        },
        {
          description: '',
          proName: 'FX:EURUSD'
        },
        {
          description: 'Petrol',
          proName: 'NYSE:OXY'
        }
      ],
      showSymbolLogo: true,
      isTransparent: false,
      displayMode: 'regular',
      colorTheme: 'dark',
      locale: 'en'
    });

    const container = document.querySelector('.tradingview-widget-container__widget');
    container.appendChild(script);

    return () => {
      container.removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
