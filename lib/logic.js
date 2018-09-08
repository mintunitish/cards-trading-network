/**
 * Buy card transaction
 * @param {org.example.biznet.TradeCard} trade
 * @transaction
 */

 async function buyCard(trade) {
     if (trade.card.forTrade) {
         trade.card.owner = trade.newOwner;
         return getAssetRegistry("org.example.biznet.TradingCard")
            .then(assetRegistry => {
                return assetRegistry.update(trade.card);
            })
            .then(() => {
                let event = getFactory().newEvent(
                    "org.example.biznet",
                    "TradeNotification"
                );
                event.card = trade.card;
                emit(event);
            });
     }
 }