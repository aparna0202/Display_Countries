let page = 1;
let lastPage = null;
const API = `https://jsonmock.hackerrank.com/api/countries?page=`;

const prevpage = document.getElementById("prev");
const nextpage = document.getElementById("next");

const fetchData = (url, pageNumber) => {
  console.clear();
  // console.log(page);

  fetch(url + page)
    .then((res) => res.json())
    .then((data) => populateHtml(data));
};

const populateHtml = (data) => {
  // console.log(data.data[0].name);
  lastPage = data.total / 10;
  setButton();
  for (let i = 0; i < data.per_page; i++) {
    const space = document.createElement("div");
    space.textContent = data.data[i].name;
    const element = document.getElementById("contents");
    // console.log(space);
    element.appendChild(space);
  }
};

function setButton() {
  if (page > 1) {
    prevpage.disabled = false;
  } else {
    prevpage.disabled = true;
  }

  if (page < lastPage) {
    nextpage.disabled = false;
  } else {
    nextpage.disabled = true;
  }
}

function init() {
  console.clear();

  fetchData(API, page);
}

prevpage.addEventListener("click", () => {
  const element = document.getElementById("contents");
  element.innerText = "";
  fetchData(API, --page);
});
nextpage.addEventListener("click", () => {
  const element = document.getElementById("contents");
  element.innerText = "";
  fetchData(API, ++page);
});

init();
