import { Component, OnInit } from '@angular/core';
declare var Beacon: any;


@Component({
  selector: 'app-remotely',
  templateUrl: './remotely.component.html',
  styleUrls: ['./remotely.component.css']
})
export class RemotelyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openLiveChat() {
    Beacon("open");
    Beacon("navigate", "/ask/chat/")
  }
}
