import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
declare var $: any;
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-trangchu',
  templateUrl: './trangchu.component.html',
  styleUrls: ['./trangchu.component.css'],
})
export class TrangchuComponent implements OnInit {
  array = [
    '../../assets/img/cgv-crm-team-survey-v2-2020-980x448_2.jpg',
    '../../assets/img/soi100_viral_7x1_980x448px.jpg',
    '../../assets/img/justice_league_milo_980x448.jpg',
  ];
  email_user;
  datafilm;
  user;
  choosefilmsapchieu;
  constructor(public mysv: MyserviceService, private db: AngularFireDatabase) {}
  filterfilmsapchieu(choose) {
    if (choose == 'choosetrue') {
      this.choosefilmsapchieu = true;
      this.db
        .list('filmsapchieu')
        .valueChanges()
        .subscribe((data) => {
          this.datafilm = data;
        });
    } else if (choose == 'choosefalse') {
      this.choosefilmsapchieu = false;
      this.db
        .list('filmdangchieu')
        .valueChanges()
        .subscribe((data) => {
          this.datafilm = data;
        });
    }
    this.mysv.choosefilmdangchieu = !this.choosefilmsapchieu;
  }
  url = 'filmdangchieu';
  ngOnInit(): void {
    if (this.mysv.choosefilmdangchieu == true) {
      this.db
        .list(this.url)
        .valueChanges()
        .subscribe((data) => {
          this.datafilm = data;
        });
    } else {
      this.db
        .list('filmsapchieu')
        .valueChanges()
        .subscribe((data) => {
          this.datafilm = data;
        });
    }
    this.mysv.switchav();
  }
}
