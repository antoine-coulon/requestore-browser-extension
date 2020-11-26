import { Injectable } from '@angular/core';
import { availableFilters } from './filters';
import { RequestoreService } from './requestore.service';
@Injectable({providedIn: 'root'})
export class StorageService {

    private _requestoreConfig: { automaticSave: boolean };
    private _reportsHistory: any[];
    private _filters: Set<string>;

    constructor(private _requestoreService: RequestoreService) {
        this.retrieveConfig();
        this.retrieveFilters();
        this.retrieveHistory();
        this._requestoreService.requestoreModel.setCategories(this.filters);
    }

    get config() {
        return this._requestoreConfig;
    }

    get history() {
        return this._reportsHistory;
    }

    get filters(): Set<string> {
        return this._filters;
    }

    /** Config */
    retrieveConfig(): void {
        this._requestoreConfig = JSON.parse(localStorage.getItem('requestore-config')) || { automaticSave: true };
    }

    /** History */
    retrieveHistory(): void {
        this._reportsHistory = JSON.parse(localStorage.getItem('requestore-history')) || [];
    }

    addReportToHistory(report: any): void {
        this._reportsHistory = [...this._reportsHistory, ...report];
    }

    /** Filters  */
    retrieveFilters(): void {
        const filters = localStorage.getItem('requestore-filters');
        if(filters) {
            this._filters = new Set([...JSON.parse(filters)]);
            return;
        }
        this._filters = new Set([]);
    }

    retrieveAvailableFilters(): string[] {
        return availableFilters;
    }

    updateFilter(filter: string) {
        this._filters.has(filter) ? this._filters.delete(filter) : this._filters.add(filter);
        this.storeFilters();
    }

    removeFilter(filter: string) {
        this.filters.delete(filter);
    }

    storeFilters() {
        localStorage.setItem('requestore-filters', JSON.stringify([...this._filters]))
    }
}