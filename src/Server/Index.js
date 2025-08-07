"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const send_temp_password_1 = __importDefault(require("./routes/send-temp-password"));
const app = (0, express_1.default)();
app.use('/api/send-temp-password', send_temp_password_1.default);
app.use(express_1.default.json());
// Wire up routes
app.use('/api/send-temp-password', send_temp_password_1.default);
// Start the server
app.listen(3000, () => {
    console.log('✅ Express API server running on http://localhost:3000');
});
