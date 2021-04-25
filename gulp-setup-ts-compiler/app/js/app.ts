"use strict";

let url: any = new URL("https://openlibrary.org/search.json");
let favorites: any = { data: [] };

const handleSubmit = () => {
  document.querySelector("ul").innerHTML = "";
  let titleVal = document.querySelector<HTMLInputElement>("#title").value;
  let authorVal = document.querySelector<HTMLInputElement>("#author").value;

  let searchObject = {};

  if (titleVal) {
    searchObject["title"] = titleVal;
  }
  if (authorVal) {
    searchObject["author"] = authorVal;
  }

  url.search = new URLSearchParams(searchObject);

  getBook();
};

let submit = document.querySelector("#submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  handleSubmit();
});

const getBook = async () => {
  let hbs = await fetch("template.hbs");
  let hbsData = await hbs.text();

  let data = await fetch(url);
  let result = await data.json();

  //@ts-ignore;
  const template = Handlebars.compile(hbsData);
  const html = template(result);
  document.querySelector("#searchResults").innerHTML = html;

  addToLibrary();
};

const addToLibrary = () => {
  let btn = document.querySelectorAll<HTMLElement>(".add");
  btn.forEach((button) => {
    button.addEventListener("click", (event: Event) => {
      if ((event.target as Element).textContent !== "added") {
        (event.target as Element).textContent = "added";
        favorites.data.push({
          cover_i: (event.target as Element).parentNode
            .querySelector("img")
            .getAttribute("src"),

          title: (event.target as Element).parentNode.querySelector(".title")
            .textContent,

          author: (event.target as Element).parentNode.querySelector(".author")
            .textContent,

          first_published: (event.target as Element).parentNode.querySelector(
            ".firstPublished"
          ).textContent,
        });
        displayFavorites();
      }
    });
  });
};

const displayFavorites = async () => {
  let title = (document.querySelector<HTMLElement>(
    ".myLibTitle"
  ).style.display = "block");
  let data = await fetch("myLibrary.hbs");
  let result = await data.text();

  //@ts-ignore;
  const template = Handlebars.compile(result);
  const html = template(favorites);
  document.querySelector("#myFavorites").innerHTML = html;

  handleDelete();
};

const handleDelete = () => {
  let deleteBook = document.querySelectorAll<HTMLElement>(".delete");
  deleteBook.forEach((button) => {
    button.addEventListener("click", (event: Event) => {
      //@ts-ignore;
      (event.target as Element).parentNode.remove();
    });
  });
};
