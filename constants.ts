const SERVER_PORT = 3001;

const CONSTANTS = {
    IMG_UPLOAD_PATH: "/uploads/img",
    SERVER_ONLINE_MSG: `Server running on port ${SERVER_PORT}`,
    SERVER_PORT
};

const RATE_LIMIT_OPTIONS = {
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
};

export { CONSTANTS, RATE_LIMIT_OPTIONS };
