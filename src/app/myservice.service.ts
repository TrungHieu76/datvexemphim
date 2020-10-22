import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
declare var $: any;
@Injectable({
  providedIn: 'root',
})
export class MyserviceService {
  [x: string]: any;
  items: Observable<any[]>;
  checkswitchev;
  url_lichchieu;
  datafilm: any = [];
  filmdanghien: any = '';
  choosefilmdangchieu = true;
  getdatafilmdangchieu;
  getdatafilmsapchieu;
  url = this.getdatafilmdangchieu;
  switchav() {
    if (this.checkswitchev == false) {
      $('.vn').hide();
      $('.en').show();
    }
    if (this.checkswitchev == true) {
      $('.en').hide();
      $('.vn').show();
    }
  }
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {}
}
