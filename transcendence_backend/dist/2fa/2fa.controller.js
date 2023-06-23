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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoFactorAuthController = void 0;
const common_1 = require("@nestjs/common");
const _2fa_service_1 = require("./2fa.service");
const user_service_1 = require("../user/user.service");
let TwoFactorAuthController = exports.TwoFactorAuthController = class TwoFactorAuthController {
    constructor(twoFactorAuthService, userService) {
        this.twoFactorAuthService = twoFactorAuthService;
        this.userService = userService;
    }
    async enableTwoFactorAuth(request) {
        const userId = request.user.id;
        const user = await this.userService.findUserById(userId);
        if (user.authentification) {
            const secret = this.twoFactorAuthService.generateSecret();
            const qrCodeUrl = this.twoFactorAuthService.generateTwoFactorQRCodeUrl(user, secret);
            if (user.twoFactorEnabled) {
                await this.userService.enableTwoFactorAuth(userId);
                await this.twoFactorAuthService.saveTwoFactorAuthSecret(userId, secret);
            }
            return qrCodeUrl;
        }
    }
    async disableTwoFactorAuth(request) {
        const userId = request.user.id;
        await this.userService.disableTwoFactorAuth(userId);
        await this.twoFactorAuthService.removeTwoFactorAuthSecret(userId);
    }
    async verifyTwoFactorToken(request, token) {
        const userId = request.user.id;
        const user = await this.userService.findUserById(userId);
        const secret = user.twoFactorAuthSecret;
        const isValid = this.twoFactorAuthService.verifyTwoFactorToken(token, secret);
        return { isValid };
    }
};
__decorate([
    (0, common_1.Post)('enable'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthController.prototype, "enableTwoFactorAuth", null);
__decorate([
    (0, common_1.Post)('disable'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthController.prototype, "disableTwoFactorAuth", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], TwoFactorAuthController.prototype, "verifyTwoFactorToken", null);
exports.TwoFactorAuthController = TwoFactorAuthController = __decorate([
    (0, common_1.Controller)('2fa'),
    __metadata("design:paramtypes", [_2fa_service_1.TwoFactorAuthService,
        user_service_1.UserService])
], TwoFactorAuthController);
//# sourceMappingURL=2fa.controller.js.map