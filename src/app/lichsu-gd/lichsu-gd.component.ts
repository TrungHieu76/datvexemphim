import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { from } from 'rxjs';
import { AppComponent } from '../app.component';
import { MyserviceService } from '../myservice.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
@Component({
  selector: 'app-lichsu-gd',
  templateUrl: './lichsu-gd.component.html',
  styleUrls: ['./lichsu-gd.component.css'],
})
export class LichsuGdComponent implements OnInit {
  user;
  datalichsugd;
  datalichsu;
  xoave(item, i) {
    console.log(item);
    console.log(i);
    this.datalichsugd.splice(i, 1);
    var updates = {};
    updates['/users/' + this.uid + '/lich_su_giao_dich'] = this.datalichsugd;
    firebase.database().ref().update(updates);
  }
  constructor(
    private mysv: MyserviceService,
    private afAuth: AngularFireAuth,
    private app: AppComponent,
    private db: AngularFireDatabase,
    private router: Router
  ) {}
  uid;
  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
        this.db
          .list('users/' + user.uid + '/lich_su_giao_dich')
          .valueChanges()
          .subscribe((data) => {
            this.datalichsugd = data;
          });
      } else {
        alert('chưa đăng nhập');
        this.router.navigate(['/login']);
      }
    });
  }
}
