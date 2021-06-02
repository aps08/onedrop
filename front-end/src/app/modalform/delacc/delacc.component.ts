import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../../_services/user.service';
import {ToastrService} from 'ngx-toastr';
import {TokenService} from '../../_services/token.service';

@Component({
  selector: 'app-delacc',
  templateUrl: './delacc.component.html',
  styleUrls: ['./delacc.component.css']
})
export class DelaccComponent implements OnInit {
  submit;
  delete = faTrash;
  form: FormGroup;
  constructor(private bsModal: BsModalRef,
              private formbuilder: FormBuilder,
              private user:UserService,
              private toast: ToastrService,
              private token:TokenService) { }

  ngOnInit(): void {
    this.submit = false;
    this.form = this.formbuilder.group({
      password: ['', [Validators.required]]
    });
  }

  closebutton(): void {
    this.ngOnInit();
    this.bsModal.hide();
  }
  get f(){
    return this.form.controls;
  }
  confirmbutton(): void {
    this.submit = true;
    if (this.form.invalid) {
      return;
    }
    this.user.deleting(this.form.value).subscribe(
      (success)=>{
      this.toast.success(success.message);
      this.token.logout();
      setTimeout(location.reload,3000)
    });
    this.closebutton();
  }

}
