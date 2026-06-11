// === FILTER & SORT ===

export function sortUsers(usersData, lang) {
  let filteredData =
    lang === "overall"
      ? usersData
      : usersData.filter((user) =>
          Object.keys(user.ranks.languages).includes(lang),
        );

  return filteredData.sort((a, b) => {
    const scoreA =
      lang === "overall"
        ? a.ranks.overall.score
        : a.ranks.languages[lang].score;
    const scoreB =
      lang === "overall"
        ? b.ranks.overall.score
        : b.ranks.languages[lang].score;
    return scoreB - scoreA;
  });
}

export function getUniqLanguages(usersData) {
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
