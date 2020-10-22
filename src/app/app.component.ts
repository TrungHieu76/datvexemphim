import { Component, OnInit } from '@angular/core';
import { MyserviceService } from './myservice.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  switchValue;
  loading = false;
  av = 'EN';
  user;
  uid;
  clickSwitch(): void {
    if ((this.loading = true && this.switchValue == false)) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue = !this.switchValue;
        this.mysv.checkswitchev = this.switchValue;
        this.mysv.switchav();
        this.loading = false;
      }, 500);
    } else if ((this.loading = true && this.switchValue == true)) {
      this.loading = true;
      setTimeout(() => {
        this.switchValue = !this.switchValue;
        this.mysv.checkswitchev = this.switchValue;
        this.mysv.switchav();
        this.loading = false;
      }, 500);
    }
  }
  choosefilmsapchieu;
  filterfilmsapchieu(choose) {
    location.reload()
    if (choose == 'choosetrue') {
      this.choosefilmsapchieu = true;
    } else if (choose == 'choosefalse') {
      this.choosefilmsapchieu = false;
    }
    this.mysv.choosefilmdangchieu = !this.choosefilmsapchieu;
    this.router.navigate(['/trangchu']);
  }
  constructor(
    private mysv: MyserviceService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }
  out() {
    this.afAuth.signOut().then(() => {
      this.user = '';
      alert('đã đăng xuất tcong');
      return 0;
    });
  }
  filmssapchieu: Array<any>;
  filmsdangchieu: Array<any>;
  url;
  filmsapchieuVafilmdangchieu;
  choose = 'choosefalse';
  ngOnInit(): void {
    let uid;
    this.switchValue = true;
    this.mysv.checkswitchev = this.switchValue;
    this.mysv.switchav();

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        uid = user.uid;
        this.user = user;
        return;
      } else {
        return 0;
      }
    });
    this.db
      .list('filmsapchieu')
      .valueChanges()
      .subscribe((data) => {
        this.filmsdangchieu = data;
        this.db
          .list('filmdangchieu')
          .valueChanges()
          .subscribe((data) => {
            this.filmssapchieu = data;
            this.filmsapchieuVafilmdangchieu = this.filmssapchieu.concat(this.filmsdangchieu)
          });
      });
  }

  inputValue?: string;
  options: Array<{ value: string }> = [];

  onChange(e: Event): void {
    this.options = [];
    this.filmsapchieuVafilmdangchieu.forEach((film: any) => {
      if (
        film['name']
          .toLowerCase()
          .indexOf((e.target as HTMLInputElement).value.toLowerCase()) > -1
      ) {
        this.options.push({
          value: film['name'],
        });
      }
    });
  }
  search(value) { }
}
