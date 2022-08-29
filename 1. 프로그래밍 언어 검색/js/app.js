import {
  fetchMatchItems,
  addSelectedItem,
  changeSelectedItem,
} from "./model.js";

const $inputForm = document.querySelector(".SearchInput");
const $input = document.querySelector(".SearchInput__input");
const $suggestion = document.querySelector(".Suggestion");

document.addEventListener("DOMContentLoaded", () => {
  fetchMatchItems("");
});

$input.addEventListener("keyup", (e) => {
  if (e.key === "ArrowUp") changeSelectedItem("up");
  if (e.key === "ArrowDown") changeSelectedItem("down");
  else {
    fetchMatchItems(e.target.value);
  }
});

$inputForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addSelectedItem();
});

$suggestion.addEventListener("click", (e) => {
  const idx = [...$suggestion.querySelectorAll("li")].indexOf(e.target);
  addSelectedItem(idx);
});
