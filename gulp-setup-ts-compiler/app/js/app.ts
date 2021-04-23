"use strict";

let url: any = new URL("https://openlibrary.org/search.json");

const handleSubmit = () => {
  document.querySelector("ul").innerHTML = "";
  let authorVal: string = document.querySelector("#author").value;
  let titleVal: string = document.querySelector("#title").value;

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
