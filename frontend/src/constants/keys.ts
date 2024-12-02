export const authQueryKeys = Object.freeze({
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
} as const);

export const storageKeys = Object.freeze({
  REFRESH_TOKEN: 'refreshToken',
} as const);

export const markerQueryKeys = Object.freeze({
  GET_MARKERS: 'getMarkers',
  MARKER: 'marker',
} as const);

export const postQueryKeys = Object.freeze({
  POST: 'post',
  GET_POST: 'getPost',
  GET_POSTS: 'getPosts',
} as const);
