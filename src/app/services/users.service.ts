import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const Endpoints = { 
  GET_ALL_USERS:`${environment.repuestosAPI}users`,

}

export type Endpoint = keyof typeof Endpoints & string;

@Injectable()
export class UsersService {

constructor(private _http: HttpClient) { }

// get<R>(endpoint:Endpoint, headers = null, params = null): Observable<any> {
//   return this._http.get<R>(Endpoints[endpoint], { headers: headers, params: params });
// }

get(endpoint:Endpoint):Observable<any>{
  return this._http.get<any>(Endpoints[endpoint]);
}

post<B,R>(endpoint:Endpoint, body: B = {} as B, headers = null): Observable<R> {
  const response =  this._http.post<R>(Endpoints[endpoint], body, { headers: headers});
  return response;
}

}
