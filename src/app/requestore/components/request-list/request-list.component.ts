import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

@Component({
    selector: 'request-list',
    templateUrl: 'request-list.component.html',
    styleUrls: ['request-list.component.css']
})

export class RequestListComponent implements OnInit, OnDestroy {

    @Input() requestList: Observable<any>;
    @Input() category: string;
    requestListArray: any[] = [];
    requestListSubscription: Subscription;

    constructor() {}

    ngOnInit() {
        this.requestListSubscription = this.requestList.pipe(
            pluck(this.category)
        ).subscribe((requests: any) => {
            this.requestListArray = requests
        });
    }

    ngOnDestroy() {
        if(this.requestListSubscription) this.requestListSubscription.unsubscribe();
    }

}