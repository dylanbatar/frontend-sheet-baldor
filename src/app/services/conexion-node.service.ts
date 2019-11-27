import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConexionNodeService {
  URL_API = "http://localhost:3000/";
  URI_LOCAL = "https://encuetrabaldor.herokuapp.com/";

  constructor(private http:HttpClient) { }


  // el espanglish bien rico sorry
  getDataHojaCalculo(){
    return this.http.get(`${this.URI_LOCAL}`,{responseType:'json'}).pipe(map(data => data['datos']))
  }

}
