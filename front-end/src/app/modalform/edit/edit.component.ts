import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../../_services/auth.service';
import {UserService} from '../../_services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  edit = faPen;
  submit;
  form: FormGroup;
  statelist;
  citylist;
  constructor(private bsModalRef: BsModalRef,
              private formbuilder: FormBuilder,
              private auth:AuthenticationService,
              private user:UserService,
              private toast:ToastrService) { }

  ngOnInit(): void {
    this.submit = false;
    this.form = this.formbuilder.group({
      state: ['', [Validators.required]],
      city: ['',Validators.required],
      phone: ['',[Validators.required,Validators.pattern('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$')]],
      password: ['',[Validators.required]]
    });
    this.auth.searchlist().subscribe(
      (success)=>{
        this.statelist = success;
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
    this.user.EditInfo(this.form.value).subscribe(
      (success)=>{
        this.toast.success(success.message);
      });
    this.close();
  }

  onChange(event): void {
    for (let f of this.statelist){
      if(event.target.value == f.state){
        this.citylist = f.districts;
      }
    }
  }
}
