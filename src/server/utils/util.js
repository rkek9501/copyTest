import moment from 'moment';
const crypto = require('crypto');
const pkcs7 = require('pkcs7');

export const getToday = () => {
  return moment().format('YYYYMMDD');
}

export const changeToProdNo = (num) => {
  if (num.length >= 12) {
    return num;
  } else {
    const pre = num.slice(0, 3);
    const post = num.slice(3, 11);
    return pre + '0' + post;
  }
}
export const prodNoToPhoneNo= (prodNo) => {
  if(prodNo.length === 12) {
    return prodNo.substring(0,3) + prodNo.substring(4)
  } else {
    return prodNo;
  }
} 

export const checkAdult = str => {
  const str6 = str.charAt(6);
  const yearFlag = ['0','9'].includes(str6) ? '18' : ['1','2','5','6'].includes(str6) ? '19' : '20';
  const yyyymmdd = yearFlag + str.substr(0, 6);
  const curr = moment(); 
  const birth = moment(yyyymmdd, 'YYYYMMDD');
  return moment.duration(curr.diff(birth)).asYears() > 19 ? true : false;
}

// 암호화 스크립트
export const encryptData = (data, keyValue, ivValue) => {
  let result = null;
  try {
    const aesCipher = crypto.createCipheriv('AES-256-CBC', keyValue, ivValue);
    aesCipher.setAutoPadding(false);
    let ciph = aesCipher.update(pkcs7Pad(data), 'utf8', 'hex');
    ciph += aesCipher.final('hex');
    result = ciph;
  } catch (e) {
    console.log(e);
    result = '';
  }
  return result;
};

// 복호화 스크립트
export const decryptData = (data, keyValue, ivValue) => {
  let result = '';
  try {
    const aesCipher = crypto.createDecipheriv('AES-256-CBC', keyValue, ivValue);
    aesCipher.setAutoPadding(false);
    let ciph = aesCipher.update(Buffer.from(data, 'hex'), 'hex', 'utf8');
    ciph += aesCipher.final('utf8');
    result = ciph;
  } catch (e) {
    console.log(e);
    result = '';
  }
  return pkcs7Unpad(result);
};

const pkcs7Pad = (params) => {
  const buffer = Buffer.from(params, "utf8");
  const bytes = new Uint8Array(buffer.length);
  let i = buffer.length;
  while (i--) {
      bytes[i] = buffer[i];
  }
  return Buffer.from(pkcs7.pad(bytes));
}
const pkcs7Unpad = (params) => {
  const buffer = Buffer.from(params, "utf8");
  const bytes = new Uint8Array(buffer.length);
  let i = buffer.length;
  while (i--) {
      bytes[i] = buffer[i];
  }
  const result = Buffer.from(pkcs7.unpad(bytes));
  return result.toString("utf8");
}

export const objectToArray = (object) => {
  if(Array.isArray(object)) return object;
  else if(object) return [object];
  else return null;
}

export const isEmptyObjectToString = (object) => {
  if(!object) return '';
  if(Object.keys(object).length === 0 && object.constructor === Object) return '';
  return object;
}