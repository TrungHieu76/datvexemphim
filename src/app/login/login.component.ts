import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'box-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  khachhang;
  username;
  password;
  id;
  user_save;
  submitForm(): void {
    this.afAuth
      .signInWithEmailAndPassword(this.username, this.password)

      .then(() => {
        alert('dang nhap thanh cong');
        this.router.navigate(['/trangchu']);
      })
      .catch((err) => {
        alert(err.message);
      });

    // for (const i in this.validateForm.controls) {
    //   this.validateForm.controls[i].markAsDirty();
    //   this.validateForm.controls[i].updateValueAndValidity();
    // }
    // for (let i = 0; i < this.khachhang.length; i++) {
    //   if (
    //     this.username == this.khachhang[i].username &&
    //     this.password == this.khachhang[i].password
    //   ) {
    //     alert('dang nhap thanh cong');
    //     this.khachhang[i].checklogin = true;
    //     this.id = this.khachhang[i].id;
    //     this.user_save.push(this.khachhang[i].username);
    //     this.user_save.push(this.khachhang[i].password);
    //     this.router.navigate(['/trangchu']);
    //     return;
    //   }
    // }
    // alert('dang nhap that bai');
  }
  constructor(
    private fb: FormBuilder,
    private mysv: MyserviceService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.mysv.switchav();
    this.khachhang = this.mysv.khachhang;
    console.log(this.khachhang);
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
