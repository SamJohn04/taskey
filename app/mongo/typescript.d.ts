declare global {
    var _connectionPromise: Promise<typeof import("mongoose")>;
}

export {}