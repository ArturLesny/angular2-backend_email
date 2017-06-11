import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

export interface IMessage {
  name?: string,
  email?: string,
  message?: string,
}

@Injectable()
export class MailsendService {

  private emailUrl = 'http://localhost:3000/send-mail';

  constructor(private http: Http) {
  }

  sendEmail(message: IMessage): Observable<IMessage> | any  {
    let bodyString = new URLSearchParams();
    bodyString.append('name',message.name);
    bodyString.append('email',message.email);
    bodyString.append('message',message.message);
    return this.http.post(this.emailUrl, bodyString)
      .map(response => {
        console.log('Sending email was successfull', response);
        return response;
      })
      .catch(error => {
        console.log('Sending email got error', error);
        return error;
      })
  }
}
