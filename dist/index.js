"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
let ETH_BAL = 2000;
let USDC_BAL = 70000;
// USDC/USDC
// app.post('/add-liquidity', (req, res) => {
// });
app.post('/buy-asset', (req, res) => {
    console.log("called /buy-asset");
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BAL - quantity;
    const updatedUsdcBalance = ETH_BAL * USDC_BAL / updatedEthQuantity;
    const paidAmount = updatedUsdcBalance - USDC_BAL;
    ETH_BAL = updatedEthQuantity;
    USDC_BAL = updatedUsdcBalance;
    res.json({
        message: `You paid ${paidAmount} USDC for ${quantity} ETH`
    });
});
app.post('/sell-asset', (req, res) => {
    console.log("called /sell-asset");
    const quantity = req.body.quantity;
    const updatedEthQuantity = ETH_BAL + quantity;
    const updatedUsdcBalance = ETH_BAL * USDC_BAL / updatedEthQuantity;
    const gottenUsdc = USDC_BAL - updatedUsdcBalance;
    ETH_BAL = updatedEthQuantity;
    USDC_BAL = updatedUsdcBalance;
    res.json({
        message: `You got ${gottenUsdc} USDC for ${quantity} ETH`
    });
});
// app.post('/quote', (req, res) => {
// });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// Gerate js file - npx tsc
// run the app - node dist/index.js
