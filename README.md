This is a demo for an integration of [Torus](https://tor.us) key management system and HTLC (hash time locked contracts).

The app is deployed on [Netlify](https://laughing-stonebraker-01b171.netlify.com) and interacts with the HTLC contract [deployed](https://ropsten.etherscan.io/address/0x243785f6b65418191ea20b45fde7069ffe4f8cef#code) on the Ropsten network.

To use the demo, create a new HTLC contract from the Send page. Once the transaction is confirmed, you will see the contract ID. To withdraw funds, the receiver clicks on "Find contract ID" and provides the secret
on the "Receive" page.

Screen recording of the demo is [here](https://youtu.be/X8jOUUcajxo).

Refund is not implemented for this demo.
