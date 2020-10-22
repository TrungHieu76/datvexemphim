import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { MyserviceService } from '../myservice.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private mysv: MyserviceService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }
  validateForm: FormGroup;
  khachhang;
  admin;
  userName: string;
  email: string;
  password: string;
  signup = {
    id: null,
    username: '',
    password: '',
    fullname: '',
    email: '',
    gender: '',
    checklogin: false,
  };

  submitForm() {
    if (this.password.length < 7) {
      alert('pass phải nhiều hơn 7 kí tự');
      return 0;
    }
    console.log('submit');
    this.afAuth
      .createUserWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        this.db.list('users').set(res.user.uid, {
          username: this.userName,
        });
      });
    this.router.navigate(['/login']);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls.confirm.updateValueAndValidity()
    );
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        // observer.next({ error: true, duplicated: true });
        // observer.next(null);
        observer.next(null);

        // for (let i = 0; i < this.khachhang.length; i++) {
        //   if (this.userName == this.khachhang[i].username) {
        //     observer.next({ error: true, duplicated: true });
        //   }
        // }
        // for (let i = 0; i < this.admin.length; i++) {
        //   if (this.userName == this.admin[i].username) {
        //     observer.next({ error: true, duplicated: true });
        //   }
        // }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {
    this.khachhang = this.mysv.khachhang;
    this.admin = this.mysv.admin;
  }
}
