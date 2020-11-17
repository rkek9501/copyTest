import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const IS_DEV = process.env.NODE_ENV === 'development' ? true : false;

export const RDS_CONFIG = { 
  USERNAME: process.env.RDS_USERNAME,
  PWD: process.env.RDS_PWD,
  DATABASE: process.env.RDS_DATABASE,
  HOST: process.env.RDS_HOST,
  PORT: process.env.RDS_PORT ? process.env.RDS_PORT : 3306,
  DIALECT: process.env.RDS_DIALECT
}

export const MONGO_CONFIG = {
  USERNAME: process.env.MONGODB_USERNAME,
  PWD: process.env.MONGODB_PWD ? process.env.MONGODB_PWD : '',
  DATABASE: process.env.MONGODB_DATABASE,
  PORT: process.env.MONGODB_PORT ? process.env.MONGODB_PORT : 27017,
  HOST: process.env.MONGODB_HOST 
}

export const REDIS_CONFIG = {
  HOST: process.env.REDIS_HOST,
  PORT: process.env.REDIS_PORT,
  SECRET_KEY: process.env.REDIS_SECRET_KEY
}

export const SERVER_PORT = process.env.SERVER_PORT ? +process.env.SERVER_PORT : 30022;

export const EXTERNAL_API = process.env.EXTERNAL_API === 'ENABLE' ? true : false;

export const DEVICE_IMG_PATH = process.env.NODE_ENV === 'development' ? 'https://stg.shopimage.uplus.co.kr' : 'https://stg.shopimage.uplus.co.kr'

export const CLIENT_HOST = process.env.CLIENT_HOST;
export const ADMIN_HOST = process.env.ADMIN_HOST;

export const SMS_SECRET_KEY = process.env.SMS_SECRET_KEY;
