import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../_services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {
  submit;
  change = faPen;
  form: FormGroup;
  constructor(private bsModalRef: BsModalRef,
              private formbuilder: FormBuilder,
              private user:UserService,
              private toast:ToastrService) { }

  ngOnInit(): void {
    this.submit = false;
    this.form = this.formbuilder.group({
      password: ['', [Validators.required]],
      newpassword: ['',[Validators.required,Validators.pattern('^(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$')]]
    });
  }

  close(): void {
    this.ngOnInit();
    this.bsModalRef.hide();
  }
  get f(){
    return this.form.controls;
  }
  confirm(): void {
    this.submit = true;
    if (this.form.invalid) {
      return;
    }
    this.user.ChangePasswordInfo(this.form.value).subscribe(
      (success)=>{
        this.toast.success(success.message);
      });
    this.close();
  }
}
