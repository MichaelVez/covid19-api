import { btnClick } from "./fetch.js";
export function buttonEvent() {
  let buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => btn.addEventListener("click", btnClick));
}

let sel = document.querySelector("#select");
import { changeFun } from "./fetch.js";
sel.addEventListener("change", changeFun);
