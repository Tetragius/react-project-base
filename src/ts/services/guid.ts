export class Guid {
    private str: string;

    constructor(str?: string) {
        if (str) {
            Guid.isValid(str) ? this.str = str : this.str = null;
        } else {
            this.str = Guid.getNewGUIDString();
        }
    }

    static compare(id1: Guid | string, id2: Guid | string): boolean {
        if (this.isValid(id1.toString()) && this.isValid(id2.toString())) {
            return id1.toString().toUpperCase() === id2.toString().toUpperCase();
        }

        return false;
    }

    static isValid(id: string) {
        return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id.toLowerCase());
    }

    static try(id: string) {
        if (this.isValid(id)) {
            return new Guid(id);
        }

        return null;
    }

    private static getNewGUIDString() {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === 'function') {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    toString() {
        if (!this.str) {
            return null;
        }

        return this.str.toUpperCase();
    }
}
