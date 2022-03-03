import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Player } from '../models/player';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8080/players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }

  private async request(method: string, url: string, data?: any, responseType?: any) {

    // console.log('request ' + JSON.stringify(data));
    // const result = this.http.request(method, url, {
    //   body: data,
    //   responseType: responseType || 'json',
    //   observe: 'body',
    //   headers: {
    //     // Authorization: `Bearer ${token}`
    //   }
    // });
    // return new Promise<any>((resolve, reject) => {
    //   result.subscribe({ complete: () => resolve, error: () => reject });
    // });


  }

  getPlayers() {
    return this.http.get<any[]>(`${baseUrl}`);
  }

  getTop20Salary(): Observable<any[]>{ 
     try {
     
      return this.http.get<any[]>(`${baseUrl}/getInfoSalary`);
     } catch (error) {
       return error;
     }
  }

}