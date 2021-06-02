import { Component, OnInit } from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {
  faArrowAltCircleUp,
  faBirthdayCake,
  faEye,
  faMapMarkerAlt,
  faPen,
  faPhone,
  faSignature,
  faTint
} from '@fortawesome/free-solid-svg-icons';
import {EditComponent} from '../modalform/edit/edit.component';
import {DelaccComponent} from '../modalform/delacc/delacc.component';
import {ChangepassComponent} from '../modalform/changepass/changepass.component';
import {TokenService} from '../_services/token.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  map = faMapMarkerAlt;
  phone = faPhone;
  name = faSignature;
  bloodgroup = faTint;
  age = faArrowAltCircleUp;
  birth = faBirthdayCake;
  edit = faPen;
  see = faEye;
  imgsrc = null;
  modalRef: BsModalRef;
  history;
  userdata;
  bloodgroupvalueandsign = [
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
  ageuser : number = null;
  constructor(private modal: BsModalService,
              private token:TokenService,
              private user: UserService) { }

  ngOnInit(): void {
    this.userdata = JSON.parse(this.token.getUserData());
    this.ageuser = new Date().getFullYear() - new Date(this.userdata.dob).getFullYear();
    this.history = this.user.Userhistory().subscribe(
      (success) => {
        this.history = success;
      });
    if(this.userdata.gender.toUpperCase() == "male".toUpperCase()){
      this.imgsrc = '/assets/boy.png';
    }else{
      this.imgsrc = '/assets/girl.png';
    }
  }

  editdetails() {
    this.modalRef = this.modal.show(EditComponent);
  }

  getbloodgroup(str:string){
    for(let f of this.bloodgroupvalueandsign)
      if(str == f.value){
        return f.group
      }
  }

  changepassword() {
    this.modalRef = this.modal.show(ChangepassComponent);
  }

  deleteaccount(){
    this.modalRef = this.modal.show(DelaccComponent);
  }

}
