import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestoreService } from '../../services/requestore.service';
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
        private readonly _requestoreService: RequestoreService,
        private readonly _storageService: StorageService,
        private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.requestsByCategory = this._requestoreService.getRequestorObservable().pipe(
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
        return this._requestoreService.globalRequestoreData;
    }

    changeTab(tab: string) {
        this.currentTab = tab;
    }


}