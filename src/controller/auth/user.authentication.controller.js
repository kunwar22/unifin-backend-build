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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestAPI = exports.Logout = exports.AuthenticatedUser = exports.Login = void 0;
const appDataSource_1 = require("../../appDataSource");
const user_entity_1 = require("../../entity/auth/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const userRepository = appDataSource_1.AppDataSource.getRepository(user_entity_1.User);
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userRepository.findOneBy({ user_name: req.body.user_name });
    if (!user || !(yield bcryptjs_1.default.compare(req.body.password, user.password))) {
        return res.status(400).json({
            message: 'Invalid credentials!'
        });
    }
    const payload = {
        id: user.id,
        name: user.first_name + " " + user.last_name,
        email: user.email,
        user_name: user.user_name
    };
    const token = (0, jsonwebtoken_1.sign)(payload, 'secret');
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.json({
        message: 'success'
    });
});
exports.Login = Login;
const AuthenticatedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwt = req.cookies['jwt'];
        const payload = (0, jsonwebtoken_1.verify)(jwt, 'secret');
        if (!payload) {
            return res.status(401).send({
                message: 'unauthenticated'
            });
        }
        const _a = yield userRepository.findOneBy({ id: payload.id }), { password } = _a, user = __rest(_a, ["password"]);
        res.send(user);
    }
    catch (error) {
        next(error);
    }
});
exports.AuthenticatedUser = AuthenticatedUser;
const Logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie('jwt', '', { maxAge: 0 });
    res.json({
        message: 'success'
    });
});
exports.Logout = Logout;
const TestAPI = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("This is working");
});
exports.TestAPI = TestAPI;
//# sourceMappingURL=user.authentication.controller.js.map