import { BehaviorSubject } from 'rxjs';
import { RequestoreModel } from '../models/requestore.model';

export class RequestoreModelManager {

    private _model: RequestoreModel;
    private _networkActivitySubject: BehaviorSubject<any>;

    constructor() {
        this._initializeModel();
    }

    get value() {
        return this._model;
    }

    get networkActivityValue() {
        return this._networkActivitySubject;
    }

    get globalData() {
        return this._model.globalData;
    }

    get requests() {
        return this._model.requests;
    }

    get categories() {
        return this._model.categories;
    }

    public addRequest(category: string, request: any) {
        this._model.addRequest(category, request);
        this._networkActivitySubject.next(this.value);
    }

    public reinitializeActivityValue() {
        this._model = new RequestoreModel();
        this._networkActivitySubject = new BehaviorSubject(this.value);
    }

    private _initializeModel() {
        this._model = new RequestoreModel();
        this._networkActivitySubject = new BehaviorSubject(this.value);
    }
}