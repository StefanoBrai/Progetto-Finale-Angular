import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FakeMailDtoService } from 'src/app/services/fake.dto.service';
import { Mail } from 'src/app/models/mail.model';
import { MatTableDataSource, MatSort, MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fakeDtoService: FakeMailDtoService ) {};

  columnsToDisplay = [
    'protId',
    'startDate',
    'receiveDate',
    'type',
    'sender',
    'subject',
    'object',
    'attachment'
  ];


  public mails: MatTableDataSource<Mail>;

  // paginator components
  lenght: number;
  pageIndex: number;
  pageSize: number;
  pageEvent: PageEvent;


// tslint:disable-next-line: member-ordering
  @ViewChild(MatSort, { static: true }) sort: MatSort;
// tslint:disable-next-line: member-ordering
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  handlePageEvent(ev: PageEvent) {
    this.mails.paginator.pageIndex = ev.pageIndex;
    this.mails.paginator.length = ev.length;
  }

  getMails() {
    this.fakeDtoService.localMailsDb.subscribe(m => {
      this.mails = new MatTableDataSource(m);
      this.mails.sort = this.sort;
      this.mails.paginator = this.paginator;
    });
  }

  ngOnInit() {
    this.getMails();
  }





}
