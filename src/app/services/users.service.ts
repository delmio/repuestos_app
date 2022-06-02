import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const Endpoints = { 
  GET_ACCOUNT_CARDS:`${environment.repuestosBFF}plasticos`,

}

export type Endpoint = keyof typeof Endpoints & string;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

constructor(private _http: HttpClient) { }

get<R>(endpoint:Endpoint, params = null, headers = null): Observable<R> {
  return this._http.get<R>(Endpoints[endpoint], { headers: headers, params: params });
}

post<B,R>(endpoint:Endpoint, body: B = {} as B, headers = null): Observable<R> {
  const response =  this._http.post<R>(Endpoints[endpoint], body, { headers: headers});
  return response;
}

}
