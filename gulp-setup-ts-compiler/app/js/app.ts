"use strict";

let url: any = new URL("https://openlibrary.org/search.json");

const handleSubmit = () => {
  document.querySelector("ul").innerHTML = "";
  let authorVal = document.querySelector<HTMLInputElement>("#author").value;
  let titleVal = document.querySelector<HTMLInputElement>("#title").value;

  url.search = new URLSearchParams({
    title: titleVal,
    author: authorVal,
  });

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

  const template = Handlebars.compile(hbsData);
  const html = template(result);
  document.querySelector("ul").innerHTML = html;
};
