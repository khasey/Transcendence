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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    fortyTwoLogin(req) {
        if (!req.user) {
            return 'No user from 42';
        }
        return {
            message: 'User information from 42',
            user: req.user,
        };
    }
    async enregistrerUtilisateur(data) {
        try {
            const { id, username, imageUrl } = data;
            console.log('data =', data);
            const utilisateur = await this.prisma.user.create({
                data: {
                    id: parseInt(id),
                    username,
                    imageUrl,
                    authentification: true,
                    twoFactorEnabled: false,
                },
            });
            console.log('utilisateur =', utilisateur);
            return utilisateur;
        }
        catch (error) {
            throw new Error(`Erreur lors de l'enregistrement de l'utilisateur : ${error.message}`);
        }
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient])
], AuthService);
//# sourceMappingURL=auth.service.js.map