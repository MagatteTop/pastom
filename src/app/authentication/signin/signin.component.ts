import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs/operators";
// import {User} from "../../model/User";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import Swal from "sweetalert2";
declare const $: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // roles: string[] = [];

 loginForm: FormGroup;
//  submitted = false;
  returnUrl: string;
   hide = true;
  loading = false;
 error = '';
 // user = new User();

  constructor(private authService : AuthService,
              private tokenStorage: TokenStorageService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
  ){}

  ngOnInit():void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    //  this.roles = this.tokenStorage.getUser().roles;
    }

     this.loginForm = this.formBuilder.group({
       name: ['', Validators.required],
       password: ['', Validators.required]
    });
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    // [Focus input] * /
    $('.input100').each(function() {
      $(this).on('blur', function() {
        if (
          $(this)
            .val()
            // tslint:disable-next-line:triple-equals
            .trim() != ''
        ) {
          $(this).addClass('has-val');
        } else {
          $(this).removeClass('has-val');
        }
      });
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        // this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
     //    this.roles = this.tokenStorage.getUser().roles;
       this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
