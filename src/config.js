const production = env.NODE_ENV === 'production';
const apiBaseUrl = production ? 'https://chesspuzzlerserver.herokuapp.com' : env.SERVER_URL;
const localBaseUrl = production ? 'https//chesspuzzler.herokuapp.com' : 'http://localhost:3000';

export {
  apiBaseUrl,
  localBaseUrl,
};
