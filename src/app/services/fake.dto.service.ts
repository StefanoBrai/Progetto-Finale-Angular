import { Injectable, OnInit, Component } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Mail } from '../models/mail.model';
import { CrudService } from './crud.service';


@Injectable(
  {
    providedIn: 'root'
  }
)

export class FakeMailDtoService  {

  public localMailsDb: BehaviorSubject<Mail[]>;
   heads = new HttpHeaders({ 'Content-Type': 'application/json' });

  private url = '/assets/dummy.json'; // FAKE DATABASE
  // private url = 'https://localhost:44379/api/mails'; // REAL DATABASE

  constructor(private http: HttpClient,
              private crudActions: CrudService) {
                this.localMailsDb = new BehaviorSubject<Mail[]>([]);
                this.getAllMails();
              }




  public getAllMails(): void {
      this.crudActions.get(this.url).subscribe(
      dbReturned => {
        this.localMailsDb.next(dbReturned);
      }
    );
  }





  public insertNewMail(newMail: Mail): void {
    console.log(newMail);

    this.crudActions.post(this.url, newMail ).subscribe(
      x => this.getAllMails()
    );
    console.log(newMail);

  }



  public putMail(updatedMail: Mail): void {
     updatedMail.protId = '';
     this.http.put<Mail>(this.url, updatedMail, {headers: this.heads}).subscribe(
       x => console.log('sottoscritto')
     );
  }




}
