async function fetchLanguages(l) {
  try {
    const response = await fetch("./language_information.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching or parsing JSON:", error);
  }
}

const languages = await fetchLanguages();
const languageLookup = languages.reduce((accumulator, language) => {
  accumulator[language.Subtag] = language;
  return accumulator;
}, {});
export const getLanguages = () => languages;
export const getLanguage = (subtag) => {
  return languageLookup[subtag];
};
