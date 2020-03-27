module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'TODOsecret!',
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'SwsEC1Z1ZO',
        password: process.env.MYSQL_PASS || 'r7KjqfRjgn',
        database: process.env.MYSQL_DB || 'SwsEC1Z1ZO',
    }
}