import md5 from 'crypto-js/md5';

export const generateHash = (email) => md5(email).toString();
