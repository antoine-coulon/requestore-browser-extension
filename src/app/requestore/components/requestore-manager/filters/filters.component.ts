import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { StorageService } from '../../../services/storage.service';

@Component({
    selector: 'request-filters',
    templateUrl: 'filters.component.html',
    styleUrls: ['filters.component.css'],
})

export class RequestFiltersComponent {


    @Input() currentFilters: string[];
    private _availableFilters: any[];

    constructor(private _storageService: StorageService) {
        this._availableFilters = this._storageService.retrieveAvailableFilters();
    }

    get availableFilters() {
        return this._availableFilters;
    }

    isFilterActivated(filterName: string): boolean {
        return this.currentFilters.findIndex(activatedFilter => activatedFilter === filterName) !== -1 ? true : false;
    }

    updateFilter(filter: string) {
        this._storageService.updateFilter(filter);
    }
}