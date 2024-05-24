"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
function errorHandler(error, req, res, next) {
    console.error('Database error:', error);
    const sqlMessage = error.sqlMessage || 'Unknown database error';
    res.status(400).json({ message: sqlMessage });
}
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map