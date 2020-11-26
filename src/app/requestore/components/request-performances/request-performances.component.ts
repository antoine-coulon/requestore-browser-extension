import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
    selector: 'request-performances',
    templateUrl: 'request-performances.component.html',
    styleUrls: [ 'request-performances.component.css' ]
})

export class RequestPerformancesComponent implements OnInit, OnDestroy {

    @Input() globalRequestoreData: any;
    @Input() requestList: any;
    @Input() category: any;

    requestListArray: any[] = [];
    requestListSubscription: Subscription;

    elapsedTimePerRequest: number = 0;
    averageTimePerRequest: number = 0;
    lowestRequestTime: number = 0;
    higherRequestTime: number = 0;

    constructor() {}

    ngOnInit() {
        this.requestListSubscription = this.requestList.pipe(
            pluck(this.category)
        ).subscribe((requests: any) => {
            if(requests) {
                this.requestListArray = requests;
                this.computeAverageTimePerRequest();
            }
        });
    }

    ngOnDestroy() {
        if(this.requestListSubscription) this.requestListSubscription.unsubscribe();
    }

    computeAverageTimePerRequest() {
        this.elapsedTimePerRequest = 0;
        this.requestListArray.forEach(request => {
            if(this.lowestRequestTime === 0) this.lowestRequestTime = request.time;
            if(request.time < this.lowestRequestTime) this.lowestRequestTime = request.time;
            if(request.time > this.higherRequestTime) this.higherRequestTime = request.time;
            return this.elapsedTimePerRequest = this.elapsedTimePerRequest + request.time;
        });
        this.averageTimePerRequest = this.elapsedTimePerRequest > 0 ? parseInt((this.elapsedTimePerRequest / this.requestListArray.length).toFixed(2)) : 0;
    }
}