import {BinaryTreeMap, BinaryTreeSet} from "./tree/binary_tree.js";
import * as readlineSync from "readline-sync";
import {PseudoMenu} from "./menu/pseudo_menu.js";

console.log("Выберите тип коллекции:");
console.log("1. BinaryTreeMap");
console.log("2. BinaryTreeSet");
let num = Number(readlineSync.question("Номер: "));
let menu = num == 1? new PseudoMenu(new BinaryTreeMap<string, string>()): new PseudoMenu(new BinaryTreeSet());
menu.run();
