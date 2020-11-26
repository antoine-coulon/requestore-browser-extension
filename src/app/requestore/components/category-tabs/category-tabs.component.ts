import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NetworkActivityService } from '../../services/network-activity.service';
import { pluck, tap } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'category-tabs',
    templateUrl: 'category-tabs.component.html',
    styleUrls: ['category-tabs.component.css']
})

export class CategoryTabsComponent implements OnInit {

    currentTab: string = this.tabs[0];

    requestsByCategory: Observable<any>;

    constructor(
        private readonly _networkActivityService: NetworkActivityService,
        private readonly _storageService: StorageService,
        private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.requestsByCategory = this._networkActivityService.networkActivityAsObservable.pipe(
            pluck('requests'),
            tap(_ => {
                this.cd.detectChanges();
                return _;
            })
        );
    }

    get tabs() {
        return [...this._storageService.filters];
    }

    get globalRequestsData() {
        return this._networkActivityService.globalRequestoreData;
    }

    changeTab(tab: string) {
        this.currentTab = tab;
    }


}