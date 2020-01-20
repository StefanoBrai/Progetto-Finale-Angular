import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()

export class CrudService {

  private head = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  public get( url: string ): Observable<any[]> {
    return  this.http.get<any[]>(url);
  }

  public post( url: string, obj: any): Observable<any> {
     return this.http.post<any>(url, obj, {headers: this.head});
  }

}
