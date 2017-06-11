import { Component } from '@angular/core';

import { MailsendService, IMessage } from './mailsend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  message: IMessage = {};

  constructor(private mailsendService: MailsendService) {
  }

  sendEmail(message: IMessage) {
    this.mailsendService.sendEmail(message).subscribe(res => {
      console.log('AppComponent Success', res);
    }, error => {
      console.log('AppComponent Error', error);
    })
  }
}

