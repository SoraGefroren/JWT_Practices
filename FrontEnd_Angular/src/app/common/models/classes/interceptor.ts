import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class Interceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string | null = localStorage.getItem("accessToken");
        req = req.clone({
            setHeaders: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
                "Access-Control-Allow-Headers": "Origin, Content-Type, Accept, Authorization, X-Requested-With, X-API-KEY, Access-Control-Allow-Request-Method"
            }
        });
        if (token) {
            req = req.clone({
                    setHeaders: {
                        authorization: `Bearer ${token}`
                    }
                });
        }
        return next.handle(req);
    }
}
