"use strict";

let url: any = new URL("https://openlibrary.org/search.json");

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
  document.querySelector("ul").innerHTML = html;
};
