export const replaceStarAt = (str, idx, isEdit) => {
  if(!str){
    return str;
  }
  if(str.length < idx + 1) { 
    return str;
  }
  if(str.length === idx + 1 && isEdit) {
    return str;
  }
  return str.substr(0, idx) + '*' + str.substr(idx + 1);
}

export const replaceMultipleStarAt = (str, start, num, isEdit) => {
  if(!str) {
    return str;
  }
  if(str.length < start + 1){
    return str;
  }
  let maskStr = '';
  if(str.length < start + num){
    let multiReplace = '*'.repeat(str.length - start);
    maskStr =  str.substr(0, start) + multiReplace + str.substr(start + str.length);
  } else {
    let multiReplace = '*'.repeat(num);
    maskStr = str.substr(0, start) + multiReplace + str.substr(start + num);
  }
  if(str.length >= start && str.length <= start + num && isEdit) {
    return maskStr.substr(0, str.length-1) + str[str.length-1];
  }
  return maskStr;
}

const name = (str, isEdit) => replaceStarAt(str, 1, isEdit);

const engName = str => {
  let indices = [];
  if(!str) return str;
  if(str.length < 5){
    return str
  }
  for(let i = 0; i < str.length; i++){
    if(str[i] === " ") indices.push(i);
  }
  let replaced = replaceMultipleStarAt(str, 2, str.length - 4);
  for(let i = 0; i < indices.length; i++){
    replaced = replaced.substring(0, indices[i]) + ' ' + replaced.substring(indices[i]+1);
  }
  return replaced;
}

const mixedName = (str, isEdit) => {
  let reg = /^[A-Za-z]/;
  if(reg.test(str)){
    return engName(str);
  } else {
    return name(str, isEdit);
  }
};

const all = (str, isEdit) => replaceMultipleStarAt(str, 0, str.length, isEdit);

const card = str => replaceMultipleStarAt(str, 3, 9);

const rrn = str => replaceMultipleStarAt(str, 7, 6);

const password = str => replaceMultipleStarAt(str, 0, str.length);

const cardPassword = (str, isEdit) => replaceMultipleStarAt(str, 0, str.length, isEdit);

const phone = (str) => {
  if(str.length === 10){
    return replaceMultipleStarAt(str, 3, 3);
  }
  return replaceMultipleStarAt(str, 3, 4);
};

const email = (str, isEdit) => {
  let endIdx = str.indexOf('@');
  if(endIdx < 3){
    return str;
  }
  return replaceMultipleStarAt(str, 3, endIdx-3, isEdit);
};
const emailPrefix = (str, isEdit) => {
  if(str.length < 3){
    return str;
  }
  return replaceMultipleStarAt(str, 3, str.length-3, isEdit);
};
const emailPostfix = (str) => {
  return str;
};

const roadName = str => {
  let reg = /로$|길$|리$/;
  let arr = str.split(' ');
  let matched = [];
  arr.map((elem, idx) => {
    if(reg.test(elem)) {
      matched.push(idx);
    }
  })
  let lastIdx = matched.pop();
  let newArr = arr.map((elem, idx) => {
    if(idx > lastIdx) {
      return '*'.repeat(elem.length);
    }
    return elem;
  })
  return newArr.join(' ');
}

const roadNumber = str => {
  let reg = /읍$|면$|동$|로$/;
  let arr = str.split(' ');
  let matched = [];
  arr.map((elem, idx) => {
    if(reg.test(elem)) {
      matched.push(idx);
    }
  })
  let lastIdx = matched.pop();
  let newArr = arr.map((elem, idx) => {
    if(idx > lastIdx) {
      return '*'.repeat(elem.length);
    }
    return elem;
  })
  return newArr.join(' ');
}

const accountNumber = (str, isEdit) => {
  if(str.length < 11){
    return replaceMultipleStarAt(str, 3, str.length - 3, isEdit);
  }
  return replaceMultipleStarAt(str, 3, str.length - 3 - 4); 
}

const maskingObj = {name, engName, mixedName, card, phone, rrn, frn: rrn, email, roadName, roadNumber, accountNumber, password, cardPassword, emailPrefix, emailPostfix, all};

const Masking = (val, type, isEdit) => {
  if(!val) {
    return '';
  }
  if(maskingObj[type]){
    return maskingObj[type](val, isEdit);
  }
  return val;
}

export default Masking;