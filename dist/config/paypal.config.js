"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const paypal = require("paypal-rest-sdk");
paypal.configure({
    mode: 'sandbox',
    client_id: 'AQVNOFKZjoN7p3xv0hQdlU7y20ZmNNn0XP7N35ZCdp_M9xq9yymLdCDW3UPaJmNtg1nHiJu1gYd6Iv17',
    client_secret: 'EEk4JuNoccfqae7UZSos_1tjsZ4LZ-kgD84LlRFL5FNXzaNmJEhQJDxP4KcAn23bJx9kEVoNlT8NfNKM',
});
exports.default = paypal;
//# sourceMappingURL=paypal.config.js.map