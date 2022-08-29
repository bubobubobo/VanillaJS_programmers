import { renderSelected, renderInput, renderMatched } from "./view.js";

// variables
const baseURL =
  "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

// state
let state = {
  keyword: "",
  selected: [],
  matched: [],
  currentIdx: 0,
};

const setState = (newState, action) => {
  state = { ...state, ...newState };

  const { keyword, selected, matched, currentIdx } = state;

  switch (action) {
    case "search":
      renderInput(keyword);
      renderMatched(matched, keyword, currentIdx);
      break;
    case "change":
      renderMatched(matched, keyword, currentIdx);
      break;
    case "select":
      renderSelected(selected);
      break;
    default:
      renderSelected(selected);
      renderInput(keyword);
      renderMatched(matched, keyword, currentIdx);
  }
};

const fetchMatchItems = async (keyword) => {
  if (!keyword) {
    return setState({ keyword, matched: [] });
  }

  const response = await fetch(baseURL + "/languages?keyword=" + keyword);
  response.json().then((matched) => {
    setState({ keyword, matched }, "search");
  });
};

const addSelectedItem = (idx) => {
  const { selected, matched, currentIdx } = state;
  // submit event
  if (idx === undefined) {
    alert(matched[currentIdx]);
    if (!selected.includes(matched[currentIdx]))
      setState(
        {
          selected:
            selected.length === 5
              ? [...selected.slice(1), matched[currentIdx]]
              : [...selected, matched[currentIdx]],
        },
        "select"
      );
    else {
      const selectedItem = matched[currentIdx];
      const existIdx = matched.indexOf(selectedItem);
      setState(
        {
          selected: [
            ...selected.slice(0, existIdx),
            ...selected.slice(existIdx + 1),
            selectedItem,
          ],
        },
        "select"
      );
    }
  }
  // click event
  else {
    alert(matched[idx]);
    if (!selected.includes(matched[idx]))
      setState(
        {
          selected:
            selected.length === 5
              ? [...selected.slice(1), matched[idx]]
              : [...selected, matched[idx]],
        },
        "select"
      );
    else {
      const selectedItem = matched[idx];
      const existIdx = matched.indexOf(selectedItem);
      setState(
        {
          selected: [
            ...selected.slice(0, existIdx),
            ...selected.slice(existIdx + 1),
            selectedItem,
          ],
        },
        "select"
      );
    }
  }
};

const changeSelectedItem = (action) => {
  const { matched, currentIdx } = state;
  switch (action) {
    case "up":
      setState(
        {
          currentIdx:
            currentIdx === 0
              ? matched.length === 0
                ? 0
                : matched.length - 1
              : currentIdx - 1,
        },
        "change"
      );
      break;
    case "down":
      setState(
        {
          currentIdx:
            matched.length === 0
              ? 0
              : currentIdx === matched.length - 1
              ? 0
              : currentIdx + 1,
        },
        "change"
      );
      break;
    default:
      return;
  }
};

export { fetchMatchItems, addSelectedItem, changeSelectedItem };
