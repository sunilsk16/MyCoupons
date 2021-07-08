import { Component, OnInit } from '@angular/core';
import { FirebaseDynamicLinks } from '@ionic-native/firebase-dynamic-links/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { NgNavigatorShareService } from 'ng-navigator-share';



@Component({
  selector: 'app-refer',
  templateUrl: './refer.page.html',
  styleUrls: ['./refer.page.scss'],
})
export class ReferPage implements OnInit {

navigator: any;
  constructor(private firebaseDynamicLinks: FirebaseDynamicLinks,
  private socialSharing: SocialSharing,
private ngNavigatorShareService: NgNavigatorShareService
) {
 this.ngNavigatorShareService = ngNavigatorShareService;
 }

  ngOnInit() {
    this.firebaseDynamicLinks.onDynamicLink()
      .subscribe((res: any) => console.log(res), (error: any) => console.log(error));
      }

      async shareApi() {
   try{
     const sharedResponse = await this.ngNavigatorShareService.share({
       title:'`Web Articles and Tutorials',
       text: 'Check out my blog — its worth looking.',
       url: 'www.codershood.info'
     });
     console.log(sharedResponse);
   } catch(error) {
     console.log('You app is not shared, reason: ',error);
   }

 }

}
