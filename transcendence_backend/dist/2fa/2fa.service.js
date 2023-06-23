"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorAuthService = void 0;
const common_1 = require("@nestjs/common");
const speakeasy = require("speakeasy");
const user_service_1 = require("../user/user.service");
let TwoFactorAuthService = exports.TwoFactorAuthService = class TwoFactorAuthService {
    constructor(userService) {
        this.userService = userService;
    }
    generateSecret() {
        const secret = speakeasy.generateSecret({ length: 20 });
        return secret.base32;
    }
    generateTwoFactorQRCodeUrl(user, secret) {
        const url = speakeasy.otpauthURL({
            secret: secret,
            label: user.username,
            issuer: 'Pong',
        });
        return url;
    }
    verifyTwoFactorToken(token, secret) {
        const isValid = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token,
            window: 1,
        });
        return isValid;
    }
    async saveTwoFactorAuthSecret(userId, secret) {
        const user = await this.userService.findUserById(userId);
        user.twoFactorAuthSecret = secret;
        await this.userService.save(user);
    }
    async removeTwoFactorAuthSecret(userId) {
        const user = await this.userService.findUserById(userId);
        user.twoFactorAuthSecret = undefined;
        await this.userService.save(user);
    }
};
exports.TwoFactorAuthService = TwoFactorAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], TwoFactorAuthService);
//# sourceMappingURL=2fa.service.js.map