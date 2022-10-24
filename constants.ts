const CONSTANTS = {
    IMG_UPLOAD_PATH: "/uploads/img",
};

const RATE_LIMIT_OPTIONS = {
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
};

export { CONSTANTS, RATE_LIMIT_OPTIONS };
