import {HttpInterceptorFn} from '@angular/common/http';

/**
 * HTTP interceptor function that adds a JWT token from localStorage
 * to the Authorization header of outgoing HTTP requests if the token exists.
 *
 * @param req The outgoing HTTP request.
 * @param next The next interceptor in the chain.
 * @returns The next handle with the cloned request including the Authorization header if token is present.
 */
export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('mdd-token');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
