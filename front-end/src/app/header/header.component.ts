import {Component, HostListener, OnInit} from '@angular/core';
import { faSignInAlt,faSignOutAlt ,faColumns ,faHome, faCampground, faRegistered, faHandHoldingMedical, faBookReader, faBook, faUser, faTint, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {SigninComponent} from '../modalform/signin/signin.component';
import {RegisterComponent} from '../modalform/register/register.component';
import { TokenService} from '../_services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  link = null;
  name = "Anoop pratap Singh";
  dashboard = faColumns;
  logout = faSignOutAlt;
  logo = faTint;
  home = faHome;
  camps = faCampground;
  donate = faHandHoldingMedical;
  awareness = faBookReader;
  about = faBook;
  user = faUser;
  sign = faSignInAlt;
  calender = faCalendarAlt;
  register = faRegistered;
  isMenuCollapsed = true;
  modalRef: BsModalRef;
  isAuthenticated: boolean;
  navbardata = [
    {
      icon : faCampground,
      text : 'Camps',
      href: '/home/camps'
    },
    {
      icon : faBookReader,
      text : 'Awareness',
      href: '/home/awareness'
    },
    {
      icon : faBook,
      text : 'About',
      href: '/home/about'
    }
  ];
  username;
  private data:any;
  constructor(private modalservice: BsModalService,
              private Token:TokenService) { }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event): void {
    document.getElementById('scrollBar').style.width =
      ((event.target.documentElement.scrollTop / ((event.target.documentElement.scrollHeight ) -
        event.target.documentElement.clientHeight)) * 100) + '%';
  }
  ngOnInit(): void {
    this.isAuthenticated = this.Token.IsLoggedIn();
    if(this.isAuthenticated){
      if (JSON.parse(this.Token.getUser()) == 'user'){
        this.link = 'home/dashboard';
      }else{
        this.link = 'home/admin';
      }
      this.data= JSON.parse(this.Token.getUserData());
      this.username = this.data.firstname;
    }
  }

  showsinginmodal(): void {
    this.modalRef = this.modalservice.show(SigninComponent);
  }

  showregistermodal(): void {
    this.modalRef = this.modalservice.show(RegisterComponent);
  }

  signout(): void{
    this.Token.logout();
    window.location.reload();
  }
}
