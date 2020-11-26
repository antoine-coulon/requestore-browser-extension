
export abstract class IBrowserTarget {
    watchNetworkActivity: () => void;
    unwatchNetworkActivity: () => void;
    addRequest: (category: string, request: any) => void;
    filterRequest: (category: string, request: any) => void;
    processRequest: (request: any) => void;
    isCategoryFiltered: (category: string) => boolean;
}