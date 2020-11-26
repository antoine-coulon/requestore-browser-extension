import { Component, OnInit } from '@angular/core';
import { NetworkActivityService } from '../../services/network-activity.service';
import { StorageService } from '../../services/storage.service';

@Component({
    selector: 'requestore-manager',
    templateUrl: 'requestore-manager.component.html',
    styleUrls: ['requestore-manager.component.css']
})

export class RequestoreManagerComponent {

    openedSettings: boolean = false;

    constructor(
        private readonly _networkActivityService: NetworkActivityService,
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
        return this._networkActivityService.isRecording;
    }

    changeRecordingStatus(): void {
        this.isRecording ?
            this._networkActivityService.stopRecordingNetworkActivity() 
            : this._networkActivityService.startRecordingNetworkActivity();
    }

    openSettings() {
        this.openedSettings = !this.openedSettings;
    }

}