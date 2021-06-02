import {Component, OnInit} from '@angular/core';
import {
  faGift, faCampground, faRegistered, faSearch,
  faFlag, faCity, faPeopleCarry, faTint, faChartLine,
  faUniversity, faMapMarked, faHandPeace, faHandsHelping, faBookOpen, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {SigninComponent} from '../modalform/signin/signin.component';
import {RegisterComponent} from '../modalform/register/register.component';
import {TokenService} from '../_services/token.service';
import {AuthenticationService} from '../_services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  searchresult;
  citylist;
  statelist;
  collected = faTint;
  search = faSearch;
  state = faFlag;
  city = faCity;
  register = faRegistered;
  location = faMapMarkerAlt;
  modalRef: BsModalRef;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/1480/280`);
  accordion = [
    {
      icon: faMapMarked,
      head: 'Find a near by camp',
      info: 'We organise camps every now and then all over India as you can see on camps page.So it would be easy for you to search the camp near by your place and you can select the camp which suits you the best.'
    },
    {
      icon: faCampground,
      head: 'Enroll in camp as donor or volunteer',
      info: 'You can register in a camps as a blood donor or Volunteer. Select role as "DONOR" for blood donor and as "VOLUNTEER" for volunteer. Donors donate blood which could be used to save lives in future. You can read about different type of blood donation and about blood awareness page. On the other hand volunteer help us organise the blood camp in a smooth manner. You can read more about volunteer work camps page.'
    },
    {
      icon: faBookOpen,
      head: 'Fill the form received on your email.',
      info: 'Once the registeration for the camp is completed, you will receive a form on your email. Make sure you fill the form before reaching to the camp site. Also make sure you carry a valid identity card with you for verification purpose. Only those who are above 18 years are allowed to take part in the camp.'
    },
    {
      icon: faHandsHelping,
      head: 'Submit the form at the camp',
      info: 'Your registeration email will contain all the required information that you need like the name of  concern authorities of the camp and contact information. Once you reach at the camp site contact the concerned authority / admin and submit the form you received on your email during registration. After verification you will be accessed by the doctors.'
    },
    {
      icon: faHandPeace,
      head: 'Organised blood drive',
      info: 'Now that you know how it is done. It\'s time to register for camps and donate some blood. Remember YOUR ONE STEP CAN SAVE 3 LIVES.'
    }
  ];
  featured = [
    {
      iconv: faChartLine,
      value: 1237,
      popover: [
        'We are currently having',
        ' active participants. Join us, be a donor it only takes 15 minutes to donate blood.'
      ],
      bg : 'bg-primary',
      key: 'Active'
    },
    {
      iconv: faTint,
      value: 2370,
      popover: [
        'Till now we have collected',
        ' Units of blood. Remember each unit can save upto 3 lives.'
      ],
      bg : 'bg-danger',
      key: 'Collected'
    },
    {
      iconv: faUniversity,
      value: '150',
      popover: [
        'We have',
        ' registered blood bank all over India. Moving forward to add more.'
      ],
      bg : 'bg-primary',
      key: 'Banks'
    },
    {
      iconv: faCampground,
      value: 27,
      popover: [
        'We have',
        ' upcoming camps. Come and donate blood. Register yourself on the camps page.'
      ],
      bg : 'bg-danger',
      key: 'Camps'
    },
    {
      iconv: faPeopleCarry,
      value: 159,
      popover: [
        'We have',
        ' active volunteers. They help us organise the blood drive in a smooth manner. Go and register as a volunteer.'
      ],
      bg : 'bg-primary',
      key: 'Volunteer'
    },
    {
      iconv: faGift,
      value: 87,
      popover: [
        'Regular Volunteer/Donors are appreciated based on points received, and are gifted with Amazon voucher worth 100$.Till now we have distributed',
        ' gifts'
      ],
      bg : 'bg-danger',
      key: 'Gifts'
    }
  ];
  campsdata = [
    {
      border : 'border-primary',
      city : 'bangalore',
      participants : 431,
      collected : 409,
      img : '/assets/assets/city/bangalore.jpg'
    }, {
      border : 'border-danger',
      city : 'Kolkata',
      participants : 451,
      collected : 390,
      img : '/assets/assets/city/kolkata.jpg'
    }, {
      border : 'border-primary',
      city : 'Delhi',
      participants : 530,
      collected : 502,
      img : '/assets/assets/city/delhi.jpg'
    }, {
      border : 'border-danger',
      city : 'Mumbai',
      participants : 453,
      collected : 433,
      img : '/assets/assets/city/mumbai.jpg'
    }
  ];
  topparticipants = [
    {
      bg : 'bg-danger',
      name : 'Anil Kumar Singh',
      location : 'Lucknow',
      points : '60',
      age: 29,
      profession: 'Teacher'
    },
    {
      bg : 'bg-primary',
      name : 'K K Srivastav',
      location : 'New Delhi',
      points : '60',
      age: 31,
      profession: 'Doctor'
    },
    {
      bg : 'bg-danger',
      name : 'Siya Singh',
      location : 'Gwalior',
      points : '55',
      age: 20,
      profession: 'Student'
    },
    {
      bg : 'bg-primary',
      name : 'Apoorva Bisen',
      location : 'Unnao',
      points : '45',
      age: 21,
      profession: 'Student'
    }
  ];
  people = [
    {
      name : 'Kamal Deep Bhati',
      location : 'Delhi',
      comment : 'I am now a regular blood donor who believes in miracles and realizes that those miracles happen every day because someone gives blood.'
    },
    {
      name : 'Adarsh Dubey',
      location: 'Lucknow',
      comment: 'Once my parents needed blood and an unknown guy helped us time, now it is time to pay back as we never got a chance to thank him.'
    },
    {
      name : 'Omisha Punmiya',
      location: 'Bangalore',
      comment: 'I enjoy donating blood, especially finding out that my blood type is very vital to saving those with Sickle Cell. May GOD bless everyone.'
    },
    {
      name : 'Zayn Malik',
      location: 'Ranchi',
      comment: 'One good thing about donation with OneDrop is that, once you do it, you get addicted to it because it brings great joy and happiness to you.'
    },
    {
      name : 'Nikitha Shetty',
      location: 'Mumbai',
      comment: 'The blood you donate gives someone another chance at life. One day that someone may be a close relative, a friend, a loved one—or even you.'
    },
    {
      name : 'Monith Gupta',
      location: 'Delhi',
      comment: 'The change is dramatic and immediate. Healthy blood brings Trey out of sickle cell agony to an active life free of pain.OneDrop helped us.'
    }
  ];
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
  isAuthenticated: boolean;
  formsearch: FormGroup;
  submitted: boolean;
  constructor(private modalservice: BsModalService,
              private Token:TokenService,
              private auth:AuthenticationService,
              private formbuilder: FormBuilder,
              private Toast: ToastrService,
              private user: UserService) {
  }

  ngOnInit(): void {
    this.searchresult = null;
    this.citylist = null;
    this.statelist = null;
    this.submitted = false;
    this.isAuthenticated = this.Token.IsLoggedIn();
    this.auth.searchlist().subscribe(
      (success)=>{
        this.statelist = success;
      });
    this.formsearch = this.formbuilder.group({
      state: ['', Validators.required],
      city: ['',Validators.required],
      bloodgroup: ['',Validators.required]
    });
  }


  showregistermodal(): void {
    this.modalRef = this.modalservice.show(RegisterComponent);
  }
  showsinginmodal(): void {
    this.modalRef = this.modalservice.show(SigninComponent);
  }

  onChange(event): void {
    for (let f of this.statelist){
      if(event.target.value == f.state){
        this.citylist = f.districts;
      }
    }
  }

  getbloodgroup(str:string){
    for(let f of this.bloodgroup)
      if(str == f.value){
        return f.group
      }
  }

  get f(){
    return this.formsearch.controls;
  }
  searchblood(){
    this.submitted = true;
    if(this.formsearch.invalid){
      return;
    }
    this.auth.search(this.formsearch.value).subscribe(
      (success)=>{
        this.searchresult = success;
      }
    );
  }

  sendrequest(data):void{
    console.log(data);
    if(!this.Token.IsLoggedIn()){
      this.Toast.warning("You need to SignIn to perform this operation.");
      this.ngOnInit();
    }else{
      this.user.BloodRequest(data).subscribe(
        (success)=>{
          this.Toast.success(success.message);
          this.ngOnInit();
        }
      );
    }
  }
}
