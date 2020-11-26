import { Injectable, NgZone } from '@angular/core';
import { IBrowserTarget } from '../browser/interface/browser.interface';
import { RequestoreModelManager } from '../store/requestore-model.manager';

@Injectable({providedIn: 'root'})
export class NetworkActivityService {

    private _isRecordingNetworkActivity: boolean = false;

    constructor(
        private readonly _storeModelManager: RequestoreModelManager,
        private readonly _browser: IBrowserTarget
    ) { }

    get requestoreModel() {
        return this._storeModelManager.value;
    }

    get globalRequestoreData() {
        return this._storeModelManager.globalData;
    }

    get isRecording() {
        return this._isRecordingNetworkActivity;
    }

    get requests() {
        return this._storeModelManager.requests;
    }

    get networkActivityAsSubject() {
        return this._storeModelManager.networkActivityValue;
    }

    get networkActivityAsObservable() {
        return this._storeModelManager.networkActivityValue.asObservable();
    }

    startRecordingNetworkActivity() {
        this._isRecordingNetworkActivity = !this._isRecordingNetworkActivity;
        this._browser.watchNetworkActivity();
    }

    stopRecordingNetworkActivity() {
        this._isRecordingNetworkActivity = !this._isRecordingNetworkActivity;
        this._browser.unwatchNetworkActivity();
        this._storeModelManager.reinitializeActivityValue();
        // persist data or propose resume
    }

}