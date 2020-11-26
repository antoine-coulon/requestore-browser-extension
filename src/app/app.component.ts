import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { RequestoreService } from "./requestore/services/requestore.service";

@Component({
  selector: "requestore-app",
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  constructor(private readonly _requestoreService: RequestoreService) {}

  ngOnInit() {}

  get isRecording() {
    return this._requestoreService.isRecording;
  }
}
