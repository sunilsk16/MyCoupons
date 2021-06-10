import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ToastController } from '@ionic/angular';



@Injectable({
  providedIn: 'root'
})
export class AlertService {
   private myToast: any;

  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;

  constructor(private router: Router,
   private toast: ToastController
  ) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  showToast(message:any) {
      this.myToast = this.toast.create({
        message: message,
        duration: 2000
      }).then((toastData) => {
        console.log(toastData);
        toastData.present();
      });
    }
    HideToast() {
      this.myToast = this.toast.dismiss();
    }


  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
