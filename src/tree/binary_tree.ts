//вероятно не должно быть разделения на key и value
type nodeOrNull<T, E> = Node<T, E> | null;
type compare<T> = (a: T, b: T) => number;

export class BinaryTreeMap<T, E> {
    private _head: nodeOrNull<T, E>;
    private readonly _comparator: compare<T>;

    constructor(comparator?: compare<T>);
    constructor(headKey?: T, comparator?: compare<T>);
    constructor(headKey?: T, headValue?: E, comparator?: compare<T>) {
        if (headKey) {
            this._head = new Node<T, E>(headKey, headValue, null, null);
        } else {
            this._head = null;
        }
        if (comparator) {
            this._comparator = comparator;
        } else {
            this._comparator = (a, b) => {
                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                }
                return 0;
            };
        }
    }

    public addElement(key: T, value?: E) {
        if (!this._head) {
            this._head = new Node<T, E>(key, value, null, null);
        } else {
            let [curr, prev] = this.findElemAndParent(key);
            if (!curr) {
                if (prev) {
                    if (this._comparator(prev.key, key) > 0) {
                        prev.left = new Node(key, value, null, null);
                    } else {
                        prev.right = new Node(key, value, null, null);
                    }
                }
            } else {
                curr.value = value;
            }
        }
    }

    public getElement(key: T): E | undefined | null {
        if (!this._head) {
            return null;
        }
        let [curr,] = this.findElemAndParent(key);
        if (curr) {
            return curr.value;
        }
        return null;
    }

    public removeElement(key: T): E | undefined | null {
        if (!this._head) {
            return null;
        }
        let [curr, parent] = this.findElemAndParent(key);
        let res = null;
        if (curr) {
            res = curr.value;
            let left = curr.left;
            let right = curr.right;
            if (parent) {
                if (parent.left && this._comparator(parent.left.key, curr.key) === 0) {
                    if (right) {
                        parent.left = right;
                    } else if (left) {
                        parent.left = left;
                    } else {
                        parent.left = null;
                    }
                } else {
                    if (right) {
                        parent.right = right;
                    } else if (left) {
                        parent.right = left;
                    } else {
                        parent.right = null;
                    }
                }
            } else {
                if (right) {
                    this._head = right;
                } else if (left) {
                    this._head = left;
                } else {
                    this._head = null;
                }
            }
            curr.left = null;
            curr.right = null;
            if (left && right) {
                let curr = right;
                while (curr.left) {
                    curr = curr.left;
                }
                curr.left = left;
            }
        }
        return res;
    }

    private findElemAndParent(key: T): [nodeOrNull<T, E>, nodeOrNull<T, E>] {
        if (!this._head) {
            return [null, null];
        }
        let curr: nodeOrNull<T, E> = this._head;
        let prev = null;
        while (curr && this._comparator(curr.key, key) !== 0) {
            if (this._comparator(curr.key, key) > 0) {
                prev = curr;
                curr = curr.left;
            } else {
                prev = curr;
                curr = curr.right;
            }
        }
        return [curr, prev];
    }

    public toString(): string {
        return `head = ${this.nodeToString(this._head, 1)}`;
    }

    protected nodeToString(node: nodeOrNull<T, E>, countTabs: number): string {
        let res = "";
        let tabs = "\t".repeat(countTabs);
        if (node) {
            res += `${node.toString()}: {\n${tabs}left = ${this.nodeToString(node.left, countTabs + 1)}, \n${tabs}right = ${this.nodeToString(node.right, countTabs + 1)}}`;
        } else {
            res = "null";
        }
        return res;
    }
}

export class BinaryTreeSet<T> extends BinaryTreeMap<T, undefined> {
    constructor(comparator?: compare<T>);
    constructor(headKey?: T, comparator?: compare<T>) {
        super(headKey, comparator);
    }

    public addElement(key: T) {
        super.addElement(key);
    }

    public getElement(key: T): boolean;
    public getElement(key: T): undefined | null;
    public getElement(key: T): boolean | undefined | null {
        return super.getElement(key) === undefined;
    }

    public contains(key: T): boolean {
        return this.getElement(key);
    }

    public removeElement(key: T): boolean;
    public removeElement(key: T): undefined | null;
    public removeElement(key: T): boolean | undefined | null {
        return super.removeElement(key) === undefined;
    }

    protected nodeToString(node: nodeOrNull<T, undefined>, countTabs: number): string {
        let res = "";
        let tabs = "\t".repeat(countTabs);
        if (node) {
            let tmp = node.toString();
            let index = tmp.indexOf(", value = ");
            let str = `${tmp.substr(0, index)}}`;
            res += `${str}: {\n${tabs}left = ${this.nodeToString(node.left, countTabs + 1)}, \n${tabs}right = ${this.nodeToString(node.right, countTabs + 1)}}`;
        } else {
            res = "null";
        }
        return res;
    }
}

class Node<T, E> {
    private _left: nodeOrNull<T, E>;
    private _right: nodeOrNull<T, E>;
    private readonly _key: T;
    private _value: E | undefined;

    constructor(key: T, value: E | undefined, left: nodeOrNull<T, E>, right: nodeOrNull<T, E>) {
        this._left = left;
        this._right = right;
        this._key = key;
        this._value = value;
    }

    public get left() {
        return this._left;
    }

    public set left(l: nodeOrNull<T, E>) {
        this._left = l;
    }

    public get right() {
        return this._right;
    }

    public set right(r: nodeOrNull<T, E>) {
        this._right = r;
    }

    public get key() {
        return this._key;
    }

    public get value() {
        return this._value;
    }

    public set value(value: E | undefined) {
        this._value = value;
    }

    public toString(): string {
        return `Node{key = ${this.key}, value = ${this.value}}`
    }
}
