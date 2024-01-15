import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const url = environment.clientUrl + "/api";
        const token = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");
        const headerSettings: { [name: string]: string | string[]; } = {};

        for (const key of httpRequest.headers.keys()) {
            const values = httpRequest.headers.getAll(key);

            if (values) {
                headerSettings[key] = values.join(',');
            }
        }
        if (token) {
            headerSettings['Authorization'] = 'Bearer ' + token;
        }

        const newHeader = new HttpHeaders(headerSettings);

        return next.handle(
            httpRequest.clone({
                url: url + httpRequest.url,
                headers: newHeader,
            })
        );
    }
}