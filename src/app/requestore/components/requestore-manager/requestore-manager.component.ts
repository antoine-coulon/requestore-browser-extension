import { Component, OnInit } from '@angular/core';
import { RequestoreService } from '../../services/requestore.service';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'requestore-manager',
    templateUrl: 'requestore-manager.component.html',
    styleUrls: ['requestore-manager.component.css']
})

export class RequestoreManagerComponent {

    openedSettings: boolean = false;

    constructor(
        private readonly _requestoreService: RequestoreService,
        private readonly _storageService: StorageService
    ) {
    }

    get filters() {
        return [...this._storageService.filters];
    }

    get reportsHistory() {
        return this._storageService.history;
    }

    get isRecording() {
        return this._requestoreService.isRecording;
    }

    changeRecordingStatus(): void {
        this.isRecording ?
            this._requestoreService.stopRecordingNetworkActivity() 
            : this._requestoreService.startRecordingNetworkActivity();
    }

    openSettings() {
        this.openedSettings = !this.openedSettings;
    }

}