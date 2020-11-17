import split from 'split';
import logger from '../utils/logger';

const morganFormat = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
const morganOptions = {
  stream: split().on('data', text => logger.info(text)),
}

export {
  morganFormat, morganOptions
};