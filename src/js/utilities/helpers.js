export function normalize(value, min, max) {
    return (value - min) / (max - min);
}

export function clearStorage() {
    window.localStorage.clear()
}

export function readStorage(storageItemKey) {
    return JSON.parse(window.localStorage.getItem(storageItemKey))
}
