import {jwtInterceptor} from './jwt.interceptor';

export const httpInterceptorProviders = [
  jwtInterceptor
]
