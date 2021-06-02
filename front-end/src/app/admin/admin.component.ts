import {Component, OnInit} from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {
  faBirthdayCake, faEnvelope,
  faEye, faHospital,
  faMapMarkerAlt,
  faPen,
  faPhone,
  faSignature,
  faTint
} from '@fortawesome/free-solid-svg-icons';
import {AddadminComponent} from '../modalform/addadmin/addadmin.component';
import {AuthenticationService} from '../_services/auth.service';
import {TokenService} from '../_services/token.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  thismodal;
  bank = faHospital;
  json:any;
  statelist;
  citylist;
  imgsrc = null;
  submit = false;
  map = faMapMarkerAlt;
  phone = faPhone;
  name = faSignature;
  bloodgroup = faTint;
  email = faEnvelope;
  birth = faBirthdayCake;
  edit = faPen;
  see = faEye;
  modalRef: BsModalRef;
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
  constructor(private modal: BsModalService,
              private auth:AuthenticationService,
              private token:TokenService) { }

  ngOnInit(): void {
    this.submit = false;
    this.userdata = JSON.parse(this.token.getUserData());
    if(this.userdata.gender.toUpperCase() == "male".toUpperCase() ){
      this.imgsrc = '/assets/boy.png';
    }else{
      this.imgsrc = '/assets/girl.png';
    }
    this.auth.searchlist().subscribe(
      (success)=>{
        this.statelist = success;
      });
  }


  closemodalandreset() {
    this.modal.hide();
    this.ngOnInit();
  }

  addadmin():void{
    this.modalRef = this.modal.show(AddadminComponent);
  }

  onChange(event): void {
    for (let f of this.statelist){
      if(event.target.value == f.state){
        this.citylist = f.districts;
      }
    }
  }

  getbloodgroup(str:string){
    for(let f of this.bloodgroupvalueandsign)
      if(str == f.value){
        return f.group
      }
  }

}
