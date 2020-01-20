import { Component, Inject, OnInit, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { Mail } from 'src/app/models/mail.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormComponent } from '../form/form.component';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.dialogue.component.html',
  styleUrls: ['./detail.dialogue.component.css'],
  providers: [FormComponent]
})

export class DetailDialogueComponent {

  public formDisplay = false;
  public mail: Mail;

  constructor(@Inject(MAT_DIALOG_DATA) data,
    private formCreated: FormComponent) {
    this.mail = data;
  }

}
