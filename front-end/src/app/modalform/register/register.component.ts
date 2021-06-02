import { Component, OnInit } from '@angular/core';
import {faRegistered} from '@fortawesome/free-solid-svg-icons';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/auth.service';
import {DatePipe} from '@angular/common';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  statelist;
  citylist;
  match = false;
  register = faRegistered;
  submit = false;
  mindate: Date;
  maxdate: Date;
  form: FormGroup;
  private registartiondata: any = null;
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
  constructor(private bsModalRef: BsModalRef,
              private formbuilder: FormBuilder,
              private auth: AuthenticationService,
              public datepipe: DatePipe,
              private toast:ToastrService) {
    this.mindate = new Date();
    this.maxdate = new Date();
    this.mindate.setFullYear(this.mindate.getFullYear() - 80);
    this.maxdate.setFullYear(this.maxdate.getFullYear() - 18);
  }
  ngOnInit(): void {
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
      password: ['',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,15}$')]],
      confirmpassword: ['',[Validators.required]]
    },{
      validator: this.mustMatch('password', 'confirmpassword')
    });
    this.auth.searchlist().subscribe(
      (success)=>{
        this.statelist = success;
      });
  }
  mustMatch(controlName: string, matchingControlName: string): (formGroup: FormGroup) => any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      console.log(control+" "+matchingControl);
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onChange(event): void {
    for (let f of this.statelist){
      if(event.target.value == f.state){
        this.citylist = f.districts;
      }
    }
  }

  get f(){
    return this.form.controls;
  }

  registeruser() {
    this.submit = true;
    if(this.form.invalid){
      return;
    }
    this.registartiondata = this.form.value;
    this.registartiondata['dob'] = this.datepipe.transform(this.form.get('dob').value, 'yyyy-MM-dd');
    this.auth.register(this.registartiondata).subscribe(
      (success)=>{
        this.toast.success(success.message);
      });
    this.close();
  }

  close(): void {
    this.ngOnInit();
    this.bsModalRef.hide();
  }
}
