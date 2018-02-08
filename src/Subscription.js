class Subscription {
    constructor(handleListeners) {
        this.listeners = [];
        this.handleListeners = handleListeners;
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    notify() {
        return this.handleListeners(this.listeners);

        // this.listeners.forEach((listener) => {
        //     listener();
        // });
    }
    clear() {
        this.listeners = null;
    }
}

export default Subscription;
