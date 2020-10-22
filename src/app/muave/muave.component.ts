import { MyserviceService } from '../myservice.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
declare var $: any;
@Component({
  selector: 'app-muave',
  templateUrl: './muave.component.html',
  styleUrls: ['./muave.component.css'],
})
export class MuaveComponent implements OnInit {
  tooltips = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
  value = 3;
  isVisible = false;
  id_rap;
  tabname;
  infove = {
    id_film: 0,
    tenrap: '',
    ngaychieu: '',
    giochieu: '',
    soghe: [],
    img: '',
    tenfilm: '',
  };

  data = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources' +
      '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    children: [
      {
        author: 'Han Solo',
        avatar:
          'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        children: [
          {
            author: 'Han Solo',
            avatar:
              'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            content:
              'We supply a series of design principles, practical patterns and high quality design resources' +
              '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
          },
        ],
      },
    ],
  };
  tenrap = null;
  ngaychieu = null;
  giochieu = null;
  soluongve;
  soghe = [];
  ghe_id = null;
  giochieu_id = null;
  ngaychieu_id = null;
  lichchieu_id = {
    rapchieu: [
      {
        id_rap: '',
        choose: false,
        ten_rap: '',
        ngaychieu: [
          {
            choose: false,
            id_ngay: '',
            thoigian: [
              {
                choose: false,
                id_gio: '',
                id_ghe: [1],
              },
            ],
          },
        ],
      },
    ],
  };
  @Input()
  idfilm;
  url: string = '';
  urlSafe: SafeResourceUrl;
  uid;
  datals;
  films;
  datalichsu;
  film = {
    id: 0,
    ten: '',
    name: '',
    rate: 0,
    trailer: '',
    noidung: '',
    content: '',
    theloai: '',
    type: '',
    quocgia: '',
    country: '',
    daodien: '',
    dienvien: '',
    imgdienvien: [
      {
        img: '',
      },
    ],
    img: '',
  };
  nameFilm;
  datalichchieu;
  filmssapchieu;
  filmsdangchieu;
  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    public sanitizer: DomSanitizer,
    public mysv: MyserviceService,
    private message: NzMessageService,
    private activeRoute: ActivatedRoute,
    private afAuth: AngularFireAuth
  ) {}
  showModal(): void {
    this.isVisible = true;
  }
  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }
  checkChange(e: boolean): void {}
  chooserap(item) {
    for (var i = 0; i < this.lichchieu_id.rapchieu.length; i++) {
      if (this.lichchieu_id.rapchieu[i].id_rap == item.id_rap) {
        this.id_rap = item.id_rap;
        this.lichchieu_id.rapchieu[i].choose = true;
        continue;
      }
      this.lichchieu_id.rapchieu[i].choose = false;
    }
    this.ngaychieu_id = item.ngaychieu;
    this.tenrap = item.ten_rap;
    this.ngaychieu = null;
    this.giochieu = null;
  }
  index_ngay;
  choosengay(idngay, index) {
    this.index_ngay = index;
    for (var i = 0; i < this.ngaychieu_id.length; i++) {
      if (this.ngaychieu_id[i].id_ngay == idngay.id_ngay) {
        this.ngaychieu_id[i].choose = true;
        continue;
      }
      this.ngaychieu_id[i].choose = false;
    }
    this.giochieu_id = idngay.thoigian;
    console.log(this.giochieu_id);
    this.ngaychieu = idngay.id_ngay;
    this.giochieu = null;
  }
  index_h;
  choosegio(idgio, index) {
    this.index_h = index;
    console.log(idgio);
    for (var i = 0; i < this.ngaychieu_id.length; i++) {
      if (this.giochieu_id[i].id_gio == idgio.id_gio) {
        this.giochieu_id[i].choose = true;
        continue;
      }
      this.giochieu_id[i].choose = false;
    }
    this.ghe_id = idgio.id_ghe;
    this.giochieu = idgio.id_gio;
  }
  chooseghe(idghe) {
    console.log(idghe);
    for (var i = 0; i < this.soghe.length; i++) {
      if (idghe == this.soghe[i]) {
        this.soghe.splice(i, 1);
        return;
      }
    }
    this.soghe.push(idghe);
    this.soluongve = this.soghe.length;
    console.log(this.soghe);
  }

  user;
  datve() {
    if (this.tenrap != null) this.infove.tenrap = this.tenrap;
    if (this.ngaychieu != null) this.infove.ngaychieu = this.ngaychieu;
    if (this.giochieu != null) this.infove.giochieu = this.giochieu;
    if (this.soghe != null) this.infove.soghe = this.soghe;
    this.infove.img = this.film.img;
    this.infove.tenfilm = this.film.ten;
    this.infove.id_film = this.idfilm;
    if (
      this.tenrap == null ||
      this.ngaychieu == null ||
      this.giochieu == null ||
      this.soghe == null
    ) {
      this.message.create('error', `Thất bại `);
      return;
    }

    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.user = user;

        this.db
          .list(`users/${this.user.uid}/lich_su_giao_dich`)
          .push(this.infove)
          .then(() => {
            let ghe_con_lai = this.ghe_id.filter(
              (x) => this.soghe.indexOf(x) < 0
            );
            console.log('so ghe con lai', ghe_con_lai);
            this.db
              .object(
                `datalichchieu/${this.film.id - 1}/rapchieu/${
                  this.id_rap - 1
                }/ngaychieu/${this.index_ngay}/thoigian/${this.index_h}/id_ghe`
              )
              .set(ghe_con_lai);
            this.message.create('success', `Thành công `);
            this.router.navigate(['/lichsugiaodich']);
          });
      } else {
        alert('chưa đăng nhập');
        this.router.navigate(['/login']);
      }
    });
  }
  getdata() {
    this.db
      .list('filmsapchieu')
      .valueChanges()
      .subscribe((data) => {
        this.filmssapchieu = data;
        this.filmssapchieu.forEach((element) => {
          if (this.nameFilm == element.name) {
            this.film = element;
            this.idfilm = this.film.id;
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.film.trailer
            );
          }
        });
      });
    this.db
      .list('filmdangchieu')
      .valueChanges()
      .subscribe((data) => {
        this.filmsdangchieu = data;
        this.filmsdangchieu.forEach((element) => {
          if (this.nameFilm == element.name) {
            this.film = element;
            this.idfilm = this.film.id;
            this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
              this.film.trailer
            );
            this.db
              .list('datalichchieu')
              .valueChanges()
              .subscribe((data) => {
                this.datalichchieu = data;
                this.datalichchieu.forEach((element) => {
                  if (this.film.id == element.id) {
                    this.lichchieu_id = element;
                    $('.hidden').show();
                    return;
                  }
                });
              });
          } else if (this.nameFilm != element.name) {
            $('.hidden').hide();
            return;
          }
        });
      });
  }
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((pramap) => {
      this.nameFilm = pramap.get('name');
      console.log(this.nameFilm);
    });
    this.mysv.switchav();
    this.getdata();
  }
}
