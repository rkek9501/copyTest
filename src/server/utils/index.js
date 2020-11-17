export const base64encode = (plaintext) => {
  return Buffer.from(plaintext, "utf8").toString('base64');
}

export const base64decode = (base64text) => {
  return Buffer.from(base64text, 'base64').toString('utf8');
}

export const getTransitionId = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = now.getMonth() < 9 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);
  const dd  = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
  const hh = now.getHours() < 10 ? "0" + now.getHours() : now.getHours();
  const min = now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes();
  const ss = now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds();
  let sss = now.getMilliseconds();
  if(sss < 10) {
    sss= "00" +  now.getMilliseconds();
  } else if(sss < 100) {
    sss= "0" + now.getMilliseconds();
  }
  return "".concat(yyyy).concat(mm).concat(dd).concat(hh).concat(min).concat(ss).concat(sss)+Math.floor(1000000 + Math.random() * 9000000);
};

export const authCheckNext = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    next();
    return ;
  }
  if (req.session.auth) {
    console.log(req.session);
    next();
    return ;
  }
  return res.status(401).send('un authrized');
};
export const authCheck = (req, res, next) => {
  if(req.session.auth){
    console.log(req.session);
    next();
    return ;
  }
  return res.status(401).send('un authrized');
};