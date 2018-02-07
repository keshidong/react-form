class Subscription {
    constructor() {
        this.listeners = [];
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    notify() {
        return this.listeners.some(listener => (listener()));
        // this.listeners.forEach((listener) => {
        //     listener();
        // });
    }
    clear() {
        this.listeners = null;
    }
}

export default Subscription;
