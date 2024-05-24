"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
const register_validation_1 = require("../../validation/register.validation");
const appDataSource_1 = require("../../appDataSource");
const user_entity_1 = require("../../entity/auth/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository = appDataSource_1.AppDataSource.getRepository(user_entity_1.User);
const Register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { error } = register_validation_1.RegisterValidation.validate(body);
    if (error) {
        return res.status(400).send(error.details);
    }
    if (body.password !== body.password_confirm) {
        return res.status(400).send({ message: "Password do not match!" });
    }
    try {
        const user = yield userRepository.save({
            first_name: body.first_name,
            last_name: body.last_name,
            user_name: body.user_name,
            email: body.email,
            password: yield bcryptjs_1.default.hash(body.password, 10)
        });
        res.send(user);
    }
    catch (error) {
        next(error);
    }
});
exports.Register = Register;
//# sourceMappingURL=user.registration.controller.js.map