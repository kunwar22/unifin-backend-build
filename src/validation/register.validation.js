"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidation = void 0;
const express_validation_1 = require("express-validation");
exports.RegisterValidation = express_validation_1.Joi.object({
    first_name: express_validation_1.Joi.string().required(),
    last_name: express_validation_1.Joi.string().required(),
    user_name: express_validation_1.Joi.string().required(),
    email: express_validation_1.Joi.string().email().required(),
    password: express_validation_1.Joi.string().required(),
    password_confirm: express_validation_1.Joi.string().required()
});
//# sourceMappingURL=register.validation.js.map