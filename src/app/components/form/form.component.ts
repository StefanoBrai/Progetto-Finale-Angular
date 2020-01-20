import { Component, OnInit, Output, Input } from '@angular/core';
import {  FormBuilder, FormGroup } from '@angular/forms';
import { Mail } from 'src/app/models/mail.model';
import { FakeMailDtoService } from 'src/app/services/fake.dto.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() mailToChange: Mail = null;

  typePlaceHolder = 'Tipo della Mail';

  mailsForm: FormGroup = this.formBuilder.group(
    {
      protId: '',
      startDate: '',
      receiveDate: '',
      type: 0,
      sender: '',
      subject: '',
      object: '',
      attachment: ''
    });

  dummySavingMail: Mail;

  constructor(private formBuilder: FormBuilder,
              private fakeDtoService: FakeMailDtoService) { }




  saveOrUpdateMail() {
    let temp: Mail;
    temp = this.mailsForm.value;

    this.dummySavingMail = {...temp };
    this.dummySavingMail.protId = 'tetet';

    if (this.mailToChange) {
      this.fakeDtoService.putMail(this.dummySavingMail);
      console.log('PUT');
    } else {
      console.log('Post');
      const lastValueIndex = this.fakeDtoService.localMailsDb.value.length - 1;
      console.log(lastValueIndex);
      this.dummySavingMail.protId = lastValueIndex.toString();
      this.fakeDtoService.insertNewMail(this.dummySavingMail);
      this.mailsForm.reset();
      
    }
  }




  ngOnInit() {

    if (this.mailToChange) {
      this.mailsForm.patchValue({ ...this.mailToChange });

      switch (this.mailToChange.type) {
        case 1: this.typePlaceHolder = 'Entrata'; break;
        case 2: this.typePlaceHolder = 'Uscita'; break;
        case 3: this.typePlaceHolder = 'Interna'; break;
    }}

  }




}
