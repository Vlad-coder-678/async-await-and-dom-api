// обработка опции запроса
const fetchContent = async (param, option, value) => {
  if (param === "byId") {
    switch(option){
      case "planets": return await starWars.getPlanetsById(value);
      case "species": return await starWars.getSpeciesById(value);
      default: return await starWars.getCharactersById(value);
    }
  }

  switch(option){
    case "planets": return await starWars.searchPlanets(value);
    case "species": return await starWars.searchSpecies(value);
    default: return await starWars.searchCharacters(value);
  }
};

// генерация HTML элементов
const _getElement = (tag, text) => `<${tag}>${text}</${tag}>`;
const _getUnorderedList = text => _getElement("ul", text);
const _getListItem = text => _getElement("li", text);
const _getElementList = values => _getUnorderedList(values.reduce((acc, value) => `${acc}${_getListItem(value)}`, ""));

// приведение к виду списка ul, в случае, если значение пришло в виде массива
const _normalizeValue = (value) => {
  if (!value || !value.length) return "";
  if (Array.isArray(value) && value.length) return _getElementList(value);
  return value;
};

// запрос имени планеты
const _fetchHomeWorldName = async (link) => {
  if (!link || !link.length) return link;
  const url = new URL(link);
  const id = url.pathname.split("/")[3];
  const { name } = await starWars.getPlanetsById(id);
  return name;
};

// обработка значения, в случае, если в значении лежит ссылка и значение необходимо запросить по этой ссылке
const _getExtendedValue = async (key, value) => {
  switch (key) {
    case "homeworld": return await _fetchHomeWorldName(value);
    default: return value;
  }
};

// приведение контента к виду html элементов
const contentSerializer = async ({ results }) => {
  let content = "";
  for await (const oneEntityData of results) {
    content += `${await oneEntityContentSerializer(oneEntityData)}<br />`;
  };
  return content;
};

const oneEntityContentSerializer = async (data) => {
  let oneEntityContent = "";
  const formattedData = Object.entries(data); // [[key, value], [key, value], ...]
  for await (const [key, value] of formattedData) {
    const extendedValue = _normalizeValue(await _getExtendedValue(key, value));
    const extendedData = _getListItem(`${key}: ${extendedValue}`);
    oneEntityContent += extendedData;
  }
  return _getUnorderedList(oneEntityContent);
};
