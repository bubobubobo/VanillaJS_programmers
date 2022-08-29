// where to render
const $selectedLanguage = document.querySelector(".SelectedLanguage");
const $input = document.querySelector(".SearchInput__input");
const $suggestion = document.querySelector(".SUggestion");

const renderSelected = (items) => {
  // if (items.length === 0) return;

  $selectedLanguage.innerHTML = `
    <ul>
      ${items
        .map(
          (item) => `
          <li>${item}</li>
        `
        )
        .join("")}
    </ul>
  `;
};

const renderInput = (value) => {
  $input.value = value;
};

const renderMatched = (matched, keyword, currentIdx) => {
  if (matched.length === 0) {
    $suggestion.style.display = "none";
    return;
  }

  $suggestion.style.display = "block";
  $suggestion.innerHTML = `
  <ul>
    ${matched
      .map((match, idx) => {
        const regExp = new RegExp(keyword, "ig");

        return `
          <li class=${idx === currentIdx ? "Suggestion__item--selected" : ""}>
            ${match.replace(
              regExp,
              (m) => `<span class="Suggestion__item--matched">${m}</span>`
            )}
          </li>
        `;
      })
      .join("")}
  </ul>
  `;
};

export { renderSelected, renderInput, renderMatched };
