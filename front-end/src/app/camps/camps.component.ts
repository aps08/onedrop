import {Component, OnInit, TemplateRef} from '@angular/core';
import {
  faExternalLinkSquareAlt,
  faFirstAid,
  faHandsHelping,
  faLaptopMedical, faRegistered,
  faSearchDollar,
  faUsers, faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import {ToastrService} from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services/auth.service';
import {TokenService} from '../_services/token.service';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-camps',
  templateUrl: './camps.component.html',
  styleUrls: ['./camps.component.css']
})
export class CampsComponent implements OnInit {
  submitted = false;
  userregisteraion: any;
  caution = faExclamationCircle;
  registering = faRegistered;
  registerFormforCamp: FormGroup;
  modalRef: BsModalRef;
  volunteerroleselected = '';
  volunteerrole = [
    {
      points: 10,
      head: 'Take a leadership role',
      icon: faUsers,
      info: 'You will be leading a team of 10 members and will be working directly with the organizers and medical staff. You will be responsible of assigning task to your team members. ',
      require: 'You need to have at least 15 points to apply for this role.',
      isopen: true
    },
    {
      points: 8,
      head: 'Support the medical team',
      icon: faFirstAid,
      info: 'This role is best suited for medical students and professionals. You will be working directly with the medical staff.',
      require: 'You need to have at least 10 points to apply for this role.',
      isopen: false
    },
    {
      points: 8,
      head: 'Fundraiser and Promotion',
      icon: faSearchDollar,
      info: 'This role is best suited for Business students and professionals. You will be working directly with OneDrop team at the camp site for fund raising and promotion.',
      require: 'You need to have at least 5 points to apply for this role.',
      isopen: false
    },
    {
      points: 5,
      head: 'IT Support',
      icon: faLaptopMedical,
      info: 'This role is best suited for computer students. You will be responsible for maintaining the record of entry and exit of donors, volunteer and staff members.',
      require: 'You need to have at least 5 points to apply for this role. Knowledge of Microsoft Excel is compulsory',
      isopen: false
    },
    {
      points: 5,
      head: 'Manage crowd and guide them',
      icon: faExternalLinkSquareAlt,
      info: 'You will be responsible for guiding the donors to appropriate location for blood donation.',
      require: 'No requirement',
      isopen: false
    },
    {
      points: 5,
      head: 'Be a Helpers',
      icon: faHandsHelping,
      info: 'You will be responsible for providing food, water and medical supplies to donors, volunteers and staff members.',
      require: 'No requirement',
      isopen: false
    }
  ];
  campsdata;
  constructor(private modalService: BsModalService,
              private formBuilder: FormBuilder,
              private auth: AuthenticationService,
              private token: TokenService,
              private toast: ToastrService,
              private user: UserService) {
  }

  ngOnInit(): void {
    this.submitted = false;
    this.registerFormforCamp = this.formBuilder.group({
      role: ['', Validators.required],
      volunteerrole: [''],
    });
    this.registerFormforCamp.controls['volunteerrole'].disable();
    this.auth.camps().subscribe(
      (success)=>{
        this.campsdata  = success;
      }
    );
  }

  openModal(template: TemplateRef<any>, data): void {
    if (!this.token.IsLoggedIn()){
      this.toast.warning("You need to SignIn to perform this operation");
    }else{
      this.userregisteraion = data;
      this.modalRef = this.modalService.show(template);
    }
  }

  closemodalandreset() {
    this.ngOnInit();
    this.modalRef.hide();
  }

  get f() {
    return this.registerFormforCamp.controls;
  }

  changeandvalidate(): void {
    if(this.registerFormforCamp.get('role').value.match('volunteer')){
      this.registerFormforCamp.controls['volunteerrole'].setValidators([Validators.required]);
      this.registerFormforCamp.controls['volunteerrole'].enable();
    }else{
      this.registerFormforCamp.controls['volunteerrole'].clearValidators();
      this.registerFormforCamp.controls['volunteerrole'].reset('');
      this.registerFormforCamp.controls['volunteerrole'].disable();
    }
  }

  register(): void {
    this.submitted = true;
    if (this.registerFormforCamp.invalid) {
      return;
    }
    this.userregisteraion.role = this.registerFormforCamp.get('role').value;
    this.userregisteraion.volunteerrole = this.registerFormforCamp.get('volunteerrole').value;
    console.log(this.userregisteraion);
    this.user.campsregister(this.userregisteraion).subscribe(
      (success)=>{
        this.toast.success(success.message);
      }
    );
    this.closemodalandreset();
  }

}
