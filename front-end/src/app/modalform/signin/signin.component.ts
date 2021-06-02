import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/auth.service';
import {TokenService} from '../../_services/token.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  submit = false;
  signin = faSignInAlt;
  misinform: FormGroup;
  constructor(private bsModalRef: BsModalRef,
              private formbuilder: FormBuilder,
              private auth: AuthenticationService,
              private token: TokenService,
              private toast:ToastrService) { }

  ngOnInit(): void {
    this.submit = false;
    this.misinform = this.formbuilder.group({
      username: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['',Validators.required]
    });
  }

  get f(){
    return this.misinform.controls;
  }

  close(): void {
    this.bsModalRef.hide();
    this.ngOnInit();
  }

  confirm(): void {
    this.submit = true;
    if (this.misinform.invalid) {
      return;
    }
    this.auth.login(this.misinform.value).subscribe(
      (success)=>{
        this.token.saveToken(success.master.accessToken);
        this.token.saveUser(success.master.authorities[0]);
        this.token.saveUserData(success.hero);
        this.toast.success("Sign In successful. Reloading in 2 seconds....",'',{ timeOut: 2000}
        );
        setTimeout(function(){
          window.location.reload();
        },2000);
        window.location.reload();
      });
    this.close();
  }
}
