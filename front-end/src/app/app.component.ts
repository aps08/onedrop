import {Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private spinnner:NgxUiLoaderService) {
  }
  title = 'front-end';

  ngOnInit(): void {
    this.spinnner.start();
    setTimeout(() => {
      this.spinnner.stop(); // stop foreground spinner of the master loader with 'default' taskId
      window.scroll(0,0);
    }, 5000);
  }
}
