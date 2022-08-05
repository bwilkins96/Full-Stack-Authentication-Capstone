const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array().map( e => e.msg);

        const err = new Error('Bad Request');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request';
        next(err);
    }

    next();
};

module.exports = {
    handleValidationErrors
};
