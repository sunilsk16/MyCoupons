import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var Email: any;

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }
  sendEmail(subject: any, body: any, toAddress?: any) {
    let emailList = toAddress || "firozss31@gmail.com,";
    // let toAddress = "firozss31@gmail.com";

    return Email.send({
      Host: "smtp.gmail.com",
      Username: "info.corpcrs@gmail.com",
      Password: "Corp@123",
      To: emailList,
      From: "info.corpcrs@gmail.com",
      Subject: subject,
      Body: body,
    })
  }
}
