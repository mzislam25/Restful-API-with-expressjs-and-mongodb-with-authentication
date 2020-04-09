module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    URL: process.env.BASE_URL || 'http://localhost:5000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/notes',
    JWT_SECRET: process.env.JWT_SECRET || 'secret_token',
    JWT_EXPIRATION_MS: process.env.JWT_EXPIRATION_MS || 604800  //7 days in seconds
};


