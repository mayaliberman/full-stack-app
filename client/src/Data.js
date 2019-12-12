import config from './config';

export default class Data {
api(path, method = 'GET', body = null) {
  const url = config.apiBaseUrl + path;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  };

//   if (body !== null) {
//     options.body = JSON.stringify(body);
//   }
//   if (requireAuth) {
//     const encodedCredentials = btoa(
//       `${credentials.username}:${credentials.password}`
//     );
//     options.headers['Authorization'] = `Basic ${encodedCredentials}`;
//   }
console.log(url, options)
  return fetch(url , options);
  
}
}