import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {first} from "rxjs/operators";
import {User} from "../../model/User";
import {AuthService} from "../../services/auth.service";
import Swal from "sweetalert2";

declare const $: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  hide = true;
  loading = false;
  error = '';
  user = new User();

  constructor(private authService : AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ){}

  ngOnInit() {
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

  onLoggedin()
  {
     console.log(this.user);
    this.authService.getUserFromDB(this.user.name).subscribe((usr:User)=>{
      if(usr.password===this.user.password) {
        this.authService.signIn(usr);
        this.router.navigate(['/']);
      }
      else this.error='1';
      },(err)=>console.log(err));
  }
}
