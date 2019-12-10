import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../environments/environment';
declare var Beacon: any;


@Component({
  selector: 'app-remotely',
  templateUrl: './remotely.component.html',
  styleUrls: ['./remotely.component.css']
})
export class RemotelyComponent implements OnInit {
  @Input() webAppLink: string
  constructor() {
    this.webAppLink = `${environment.app_base_uri}/remote/pricing`
  }

  ngOnInit() {
  }

  openLiveChat() {
    Beacon("open");
    Beacon("navigate", "/ask/chat/")
  }
}
