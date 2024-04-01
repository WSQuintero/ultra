import React, { useEffect, useState } from 'react';
import { createFrontConnection } from '@front-finance/link';

const NEXT_PUBLIC_CLIENT_ID="d03863ce-186e-4f5b-460a-08db7875523d";
const NEXT_PUBLIC_CLIENT_SECRET="sk_prod_yxz3be0q.gee4eb7h3dqmryg21bawhsvya9r8g2wxq3l23ohu0tfyloqy7jqqmr8su057iyx3";
const NEXT_PUBLIC_FRONT_API_URL="https://integration-api.getfront.com";

export const FrontComponent = ({ iframeLink, onSuccess, onValidateBalance, onExit, typeProduct, onPaymentCompleted }) => {
  const [frontConnection, setFrontConnection] = useState(null);

  useEffect(() => {
    setFrontConnection(
      createFrontConnection({
        clientId: NEXT_PUBLIC_CLIENT_ID,
        onBrokerConnected: (authData, b, c) => {
          if (
            authData.accessToken?.accountTokens?.[0]?.accessToken &&
            authData.accessToken?.accountTokens?.[0]?.account?.accountName
          ) {
            const headers = {
              'Content-Type': 'application/json',
              'x-client-id': NEXT_PUBLIC_CLIENT_ID,
              'x-client-secret': NEXT_PUBLIC_CLIENT_SECRET,
            };

            const data = JSON.stringify({
              authToken: authData.accessToken.accountTokens[0].accessToken,
              type: authData.accessToken.brokerType,
            });

            if(onValidateBalance){
              onValidateBalance();

              fetch(`https://integration-api.getfront.com/api/v1/holdings/get`, {
                method: 'POST',
                headers: headers,
                body: data,
              }).then((response) => response.json())
              .then((data) => {
                let USDC = false;

                data.content.cryptocurrencyPositions.map(asset=>{
                  if(asset.symbol=="USDT"){
                    USDC = asset;
                  }
                });

                onSuccess(authData, USDC, authData.accessToken.accountTokens[0].accessToken, authData.accessToken.brokerType, typeProduct);
              });
            }else{
              onSuccess(authData, authData.accessToken.accountTokens[0].accessToken, authData.accessToken.brokerType, typeProduct);
            }
          }
        },
        onExit: (error) => {
          if (error) {
            console.error(`[FRONT ERROR] ${error}`);
          }

          onExit?.();
        },
        onTransferFinished: () => {
          if(onPaymentCompleted){
            alert("Payment completed!");
          }else{
            onPaymentCompleted();
          }
        }
      })
    );
  }, []);

  useEffect(() => {
    if (iframeLink) {
      frontConnection?.openPopup(iframeLink);
    }
  }, [frontConnection, iframeLink]);

  return <></>;
};
