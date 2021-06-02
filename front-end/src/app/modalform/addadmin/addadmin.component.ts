import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/auth.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {DatePipe} from '@angular/common';
import {UserService} from '../../_services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent implements OnInit {

  submit= false;
  add = faPlus;
  statelist;
  citylist;
  mindate: Date;
  maxdate: Date;
  form: FormGroup;
  admindata;
  bloodgroup = [
    {
      group: 'AB+',
      value: 'abplus'
    },
    {
      group: 'A+',
      value: 'aplus'
    },
    {
      group: 'B+',
      value: 'bplus'
    },
    {
      group: 'O+',
      value: 'oplus'
    },
    {
      group: 'AB-',
      value: 'abminus'
    },
    {
      group: 'B-',
      value: 'bminus'
    },
    {
      group: 'A-',
      value: 'aminus'
    },
    {
      group: 'O-',
      value: 'ominus'
    }
  ];
  constructor(private formbuilder: FormBuilder,
              private auth:AuthenticationService,
              private bsmodalref:BsModalRef,
              public datepipe: DatePipe,
              private user:UserService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.admindata = null;
    this.form = this.formbuilder.group({
      firstname: ['',[Validators.required,Validators.pattern('^[a-zA-Z ]{2,20}$')]],
      lastname: ['',[Validators.required,Validators.pattern('^[a-zA-Z ]{2,20}$')]],
      username: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      dob: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      bloodgroup: ['',Validators.required],
      gender: ['',Validators.required],
      phone: ['',[Validators.required,Validators.pattern('^(\\+\\d{1,2}\\s)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$')]],
      password: ['',[Validators.required,Validators.pattern('^(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$')]]
    },{
      updateOn: 'change'
    });
    this.mindate = new Date();
    this.maxdate = new Date();
    this.mindate.setFullYear(this.mindate.getFullYear() - 80);
    this.maxdate.setFullYear(this.maxdate.getFullYear() - 18);
    this.auth.searchlist().subscribe(
      (success)=>{
        this.statelist = success;
      });
  }

  get f(){
    return this.form.controls;
  }
  onChange(event): void {
    for (let f of this.statelist){
      if(event.target.value == f.state){
        this.citylist = f.districts;
      }
    }
  }

  close(): void {
    this.ngOnInit();
    this.bsmodalref.hide();
  }

  registernewadmin() {
    this.submit = true;
    if(this.form.invalid){
      return;
    }
    this.admindata = this.form.value;
    this.admindata['dob'] = this.datepipe.transform(this.form.get('dob').value, 'yyyy-MM-dd');
    this.user.Addadmin(this.admindata).subscribe(
      (success)=>{
        this.toast.success(success.message);
      });
    this.close();
  }
}
