import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { RequestoreModel } from '../models/requestore.model';

@Injectable({providedIn: 'root'})
export class RequestoreService {

    private _isRecordingNetworkActivity: boolean = false;
    private _requestoreModel: RequestoreModel;


    private _requestorSubject: BehaviorSubject<any>;

    constructor() {
        this._requestoreModel = new RequestoreModel();
        this._requestorSubject = new BehaviorSubject(this._requestoreModel);

        // setInterval(() => {
        //     this._requestoreModel.requests['xhr'].push({time: 54, size: 12})
        //     this._requestorSubject.next( this._requestoreModel)
        // }, 1500)
    }

    get requestoreModel() {
        return this._requestoreModel;
    }

    get globalRequestoreData() {
        return this._requestoreModel.globalData;
    }

    get isRecording() {
        return this._isRecordingNetworkActivity;
    }

    get requests() {
        return this._requestoreModel.requests;
    }

    getRequestorObservable() {
        return this._requestorSubject.asObservable();
    }

    isFiltered(category: string) {
        return this._requestoreModel.categories.has(category);
    }

    startRecordingNetworkActivity() {
        this._isRecordingNetworkActivity = !this._isRecordingNetworkActivity;
        this.watchRequests();
    }

    stopRecordingNetworkActivity() {
        this._isRecordingNetworkActivity = !this._isRecordingNetworkActivity;
        this._requestoreModel = new RequestoreModel();
        this.unwatchRequests();
        // persist data or propose resume
    }

    watchRequests() {
        if(chrome && chrome.devtools) {
            chrome.devtools.network.onRequestFinished.addListener((request) => {
                this.processRequest(request);
            });
        }
    }

    unwatchRequests() {
        chrome.devtools.network.onRequestFinished.removeListener(this.processRequest);
    }
   
    processRequest(request: any) {
        this.filterRequest(request._resourceType, request);
    }

    filterRequest(category: string, request: any) {
        this.globalRequestoreData.allRequestsSize += 1;

        if (!this.isFiltered(category)) return;

        const { response, time } = request;

        const requestData = {
            size: 0,
            time: parseInt(time.toFixed(2))
        };

        if (response.bodySize !== -1 && response.headersSize !== -1) {
            requestData.size = response.bodySize + response.headersSize;
        }

        this.addRequest(category, requestData);
    }


    addRequest(category: string, request: any): { size: number, time: string } {
        if (!this._requestoreModel.requests[category]) {
            this._requestoreModel.requests[category] = [];
        }
        this._requestoreModel.requests[category].push(request);
        this.globalRequestoreData.filteredRequestsSize += 1;

        this._requestorSubject.next(this._requestoreModel);
        return request;
    }
}