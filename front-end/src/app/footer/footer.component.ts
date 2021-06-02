import { Component, OnInit } from '@angular/core';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';
import {RegisterComponent} from '../modalform/register/register.component';
import {SigninComponent} from '../modalform/signin/signin.component';
import { TokenService} from '../_services/token.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  modalRef: BsModalRef;
  IsAuthenticated: boolean;
  el: HTMLElement;
  constructor(private modalservice: BsModalService,
              private token:TokenService) { }

  ngOnInit(): void {
    this.IsAuthenticated = this.token.IsLoggedIn();

  }

  showsigninmodal(): void {
    this.modalRef = this.modalservice.show(SigninComponent);
  }

  showregistermodal(): void {
    this.modalRef = this.modalservice.show(RegisterComponent);
  }

}
