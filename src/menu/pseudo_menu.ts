import {BinaryTreeMap, BinaryTreeSet} from "../tree/binary_tree.js";
import * as readlineSync from "readline-sync";

export class PseudoMenu {
    private _loop = true;
    constructor(private _tree: BinaryTreeMap<string, string> | BinaryTreeSet<string>) {
    }

    public run() {
        while (this._loop) {
            console.log("Возможные операции:");
            console.log("1. Добавить элемент");
            console.log("2. Получить значение элемента по ключу");
            console.log("3. Удалить элемент");
            console.log("4. Вывести всё дерево");
            console.log("5. Создать дерево заного")
            console.log("6. Выход");

            let n = Number(readlineSync.question("Введите номер действия: "));
            switch (n) {
                case 1: {
                    let key = readlineSync.question("Введите ключ: ");
                    if (this._tree instanceof BinaryTreeSet) {
                        this._tree.addElement(key);
                    } else {
                        let value = readlineSync.question("Введите значение: ");
                        this._tree.addElement(key, value);
                    }
                    break;
                }
                case 2: {
                    let key = readlineSync.question("Введите ключ: ");
                    let value = this._tree.getElement(key);
                    if (typeof value === "string" || typeof value === "undefined") {
                        console.log(`Значение равно = ${value}`);
                    } else if (value) {
                        console.log("Элемент с таким ключём присутствует")
                    } else {
                        console.log("Элемент с таким ключём отсутствует");
                    }
                    break;
                }
                case 3: {
                    let key = readlineSync.question("Введите ключ: ");
                    let value = this._tree.removeElement(key);
                    if (typeof value === "string" || typeof value === "undefined") {
                        console.log(`Элемент удалён, его значение было равно = ${value}`);
                    } else if (value) {
                        console.log("Элемент удалён")
                    } else {
                        console.log("Элемент с таким ключём отсутствует");
                    }
                    break;
                }
                case 4: {
                    console.log("%s", this._tree);
                    break;
                }
                case 5: {
                    if (this._tree instanceof BinaryTreeSet) {
                        this._tree = new BinaryTreeSet();
                    } else {
                        this._tree = new BinaryTreeMap<string, string>();
                    }
                    break;
                }
                case 6: {
                    this._loop = false;
                    break;
                }
            }
        }
    }
}
