import { getUniqLanguages, sortUsers } from "./additionals.mjs";

// === DATA ===
let usersData = [];

// === DOM ELEMENTS ===
const errorMessage = document.getElementById("error_message");
const form = document.querySelector("form");
const languageSelector = document.getElementById("language_selector");
const resultsTable = document.getElementById("results_table");

// === FETCH ===
async function loadUsersData(usersId) {
  try {
    errorMessage.textContent = "";
    const inputtedUsers = usersId.split(",").map((user) => user.trim()).filter((user) => user !== "");
    usersData = await Promise.all(
      inputtedUsers.map((user) =>
        fetch(`https://www.codewars.com/api/v1/users/${user}`).then(
          (response) => response.json(),
        ),
      ),
    );
    usersData = usersData.filter(user => user.ranks !== undefined);
    if (usersData.length < inputtedUsers.length) {
    errorMessage.textContent = "Some users were not found.";
}
    if (usersData.length === 0) {errorMessage.textContent = "No users found. ";}
  } catch (error) {
    errorMessage.textContent = "Please check the usernames and try again.";
  }
}



// === RENDERING ===
function renderTable(usersData, lang) {
  resultsTable.innerHTML = "";
  const table = document.createElement("table");

  const thead = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Username", "Clan", "Score"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    headerRow.append(th);
  })
  thead.append(headerRow);
  table.append(thead);

  const data = sortUsers(usersData, lang);
  const tbody = document.createElement("tbody");
  let index = 0;
  for (const user of data) {
    const bodyRow = document.createElement("tr");
    if (index === 0) {
        bodyRow.style.backgroundColor = "gold";
    }
    index++;
    [user.username, user.clan, lang === "overall" ? user.ranks.overall.score : user.ranks.languages[lang].score].forEach((value) => {
      const td = document.createElement("td");
      td.textContent = value;
      bodyRow.append(td);
    })
    tbody.append(bodyRow);
  }
  table.append(tbody)
  resultsTable.append(table)
}

// === SELECTOR FILLING ===
function fillLanguageSelector(usersData) {
  languageSelector.innerHTML = "<option value='overall'>Overall</option>";
  getUniqLanguages(usersData).forEach((lang) => {
    const option = document.createElement("option");
    option.textContent = lang;
    languageSelector.append(option);
  });
}

// === HANDLE EVENT LISTENERS ===
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const usersId = document.getElementById("username_input").value;
  if (!usersId.trim()) {
    errorMessage.textContent = "Please enter at least one username.";
    return;
  }
  await loadUsersData(usersId);
  if (usersData.length === 0) {return};
  fillLanguageSelector(usersData);
  renderTable(usersData, "overall");
});
languageSelector.addEventListener("change", (event) => { 
  renderTable(usersData, event.target.value);
});
