'use strict'

module.exports = {
    db: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        timezone: '+01:30',
        dialectOptions: {
            useUTC: false,
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    },
    mail: {
        service: process.env.MAIL_MAILER,
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        port: process.env.MAIL_PORT,
        host: process.env.MAIL_HOST,
        secure: process.env.MAIL_SECURE,
    },
    storage: {
        'type': 'service_account',
        'project_id': process.env.STORAGE_PROJECT_ID,
        'private_key_id': process.env.FIREBASE_PRIVATE_KEY_ID,
        'private_key': process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        'client_email': process.env.FIREBASE_CLIENT_EMAIL,
        'client_id': process.env.FIREBASE_CLIENT_ID,
        'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
        'token_uri': 'https://oauth2.googleapis.com/token',
        'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
        'client_x509_cert_url': process.env.FIREBASE_CLIENT_x509_CERT_URL
    }
}
