import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FakeMailDtoService } from 'src/app/services/fake.dto.service';
import { Mail } from 'src/app/models/mail.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DetailDialogueComponent } from '../detail/detail.dialogue.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})

export class CardViewComponent implements OnInit {

  public cards: Observable<any[]>;

  constructor(private breakpointObserver: BreakpointObserver,
    private fakeDtoService: FakeMailDtoService,
    public dialog: MatDialog) {
    this.getMails();
  }

  private mails: Mail[];


  initCards() {

    this.cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(({ matches }) => {
        if (matches) {

          // tslint:disable-next-line: no-shadowed-variable
          const returnArray = [];
          this.mails.forEach(element => {
            returnArray.push({
              protId: element.protId,
              startDate: element.startDate,
              receiveDate: element.receiveDate,
              type: element.type,
              sender: element.sender,
              subject: element.subject,
              object: element.object,
              attachment: element.attachment,
              cols: 4, rows: 1
            });
          });

          return returnArray;
        }

          const returnArray = [];
          this.mails.forEach(element => {
            returnArray.push({
              protId: element.protId,
              startDate: element.startDate,
              receiveDate: element.receiveDate,
              type: element.type,
              sender: element.sender,
              subject: element.subject,
              object: element.object,
              attachment: element.attachment,
              cols: 1, rows: 1
            });
          });

          return returnArray;
        }
      )
    );
  }

  getMails() {
    this.fakeDtoService.localMailsDb.subscribe(response => {
      console.log(response);

      this.mails = response;
      this.initCards();
    });
  }

  openDialog(card: {}) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = card;
    dialogConfig.minWidth = '300px';
    this.dialog.open(DetailDialogueComponent, dialogConfig);
  }

  ngOnInit() {
  }
}
