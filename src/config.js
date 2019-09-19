const MONGO_HOST = process.env.MONGO_HOST || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'users';
const MONGO_USER = process.env.MONGO_USER || 'root';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'rootroot';

const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
const MYSQL_PORT = process.env.MYSQL_PORT || 3306;
const MYSQL_USER = process.env.MYSQL_USER || 'root';
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 'rootroot';
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME || 'product';
const REVIEWS_HOST = process.env.REVIEWS_HOST || 'http://localhost:3027';
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // do not verify SSL connection in fetch-node

module.exports = {
  MongodbConfig: {
    connection: `mongodb://${MONGO_HOST}:${MONGO_PORT}`,
    options:  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: MONGO_USER,
      pass: MONGO_PASSWORD,
      dbName: MONGO_DB_NAME,
      keepAlive: true,
      keepAliveInitialDelay: 300000,
      socketTimeoutMS: 30000,
      poolSize: 50,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      autoReconnect: true,
    }
  },
  MysqlConfig: {
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
  },
  JWT: {
    secret: 'supersecret',
    expiresIn: 7440
  },
  ReviewService: {
    host: REVIEWS_HOST
  }
};
