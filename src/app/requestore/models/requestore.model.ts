export class RequestoreModel {
    public categories: Set<string>;
    public globalData: { allRequestsSize: number; filteredRequestsSize: number; recordingTime: 0 }
    public requests: { [key: string]: any[] };

    constructor() {
        this.globalData = {
            allRequestsSize: 0,
            filteredRequestsSize: 0,
            recordingTime: 0
        };
        this.categories = new Set();
        this.requests = this.setRequests();
    }

    setRequests() {
        const requests: any = {}
        if(this.categories.size > 0) {
            this.categories.forEach((value) => requests[value] = []);
        }
        return requests;
    }

    setCategories(filters: Set<string>) {
        this.categories = filters;
    }

    addRequest(category: string, request: { time: number, size: number} ) {
        this.requests[category] = [...this.requests[category], request];
        this.globalData.filteredRequestsSize += 1;
    }
}