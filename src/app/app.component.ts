import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NetworkActivityService } from "./requestore/services/network-activity.service";

@Component({
  selector: "requestore-app",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private readonly _networkActivityService: NetworkActivityService) {}

  ngOnInit() {}

  get isRecording() {
    return this._networkActivityService.isRecording;
  }
}
