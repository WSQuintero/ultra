import { useEffect } from 'react';

const BitcoinCartView = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = `
      {
        "symbol": "BITSTAMP:BTCUSD",
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "dateRange": "12M",
        "colorTheme": "dark",
        "trendLineColor": "rgba(191, 144, 0, 1)",
        "underLineColor": "rgba(127, 96, 0, 1)",
        "underLineBottomColor": "rgba(0, 0, 0, 0)",
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
      }
    `;
    const container = document.querySelector('.bitcoin-widget-container');
    container.appendChild(script);

    return () => {
      container.removeChild(script);
    };
  }, []);

  return (
    <div className="bitcoin-widget-container">
      {/* TradingView Widget BEGIN */}
      <div className="tradingview-widget-container__widget"></div>
      <div className="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
        </a>
      </div>
      {/* TradingView Widget END */}
    </div>
  );
};

export default BitcoinCartView;
