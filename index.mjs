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
    const inputtedUsers = usersId.split(",").map((user) => user.trim());
    usersData = await Promise.all(
      inputtedUsers.map((user) =>
        fetch(`https://www.codewars.com/api/v1/users/${user}`).then(
          (response) => response.json(),
        ),
      ),
    );
    console.log(usersData);
  } catch (error) {
    errorMessage.textContent = "Please check the usernames and try again.";
  }
}

// === FILTER & SORT ===
function sortUsers(usersData, lang) {
    let filteredData = usersData.filter((user) => Object.keys(user.ranks.languages).includes(lang))
    return filteredData.sort((a, b) => b.ranks.languages[lang] - a.ranks.languages[lang])
}
// === RENDERING ===
function renderTable() {}
// === SELECTOR FILLING ===
function getUniqLanguages(usersData) {
  const languages = [];
  for (const user of usersData) {
    const usersLang = Object.keys(user.ranks.languages);
    for (const lang of usersLang) {
      if (!languages.includes(lang)) {
        languages.push(lang);
      }
    }
  }
  return languages;
}
function fillLanguageSelector(usersData) {
  languageSelector.innerHTML = "<option value='default'>Overall</option>";
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
  await loadUsersData(usersId);
  fillLanguageSelector(usersData);
});
languageSelector.addEventListener("change", () => {});
