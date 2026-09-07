const validate = (schema) => async (req, res, next) => {
    try {
        const parsedBody = await schema.parseAsync(req.body);
        req.body = parsedBody;
        next();
    } catch (error) {

        const err = {
            status: 400,
            message: error.issues[0].message,
            extraDetails: error.issues,
        };

        next(err);
    }
};

module.exports = validate;