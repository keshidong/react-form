class Subscription {
    constructor() {
        this.listeners = [];
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    notify() {
        this.listeners.forEach((listener) => {
            listener();
        });
    }
    clear() {
        this.listeners = null;
    }
}

export default Subscription;
