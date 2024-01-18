// спиннер
const spinner = document.querySelector(".spinner");
const showSpinner = () => spinner.style.visibility = "visible";
const hideSpinner = () => spinner.style.visibility = "hidden";

// отображение контента
const contentElement = document.getElementById("content");
const resultContainer = document.getElementById("result-container");
const hideContentButton = document.querySelector(".delete");
const setContent = content => contentElement.innerHTML = content;
const showContentBlock = () => resultContainer.style.visibility = "visible";
const hideContentBlock = () => resultContainer.style.visibility = "hidden";

// элементы поиска
const byQueryBlock = document.getElementById("byQueryBlock");
const byQuerySelect = byQueryBlock.querySelector("select");
const byQueryInput = byQueryBlock.querySelector("input");
const submitByQueryButton = document.getElementById("byQueryBtn");

const byIdBlock = document.getElementById("byIdBlock");
const byIdSelect = byIdBlock.querySelector("select");
const byIdInput = byIdBlock.querySelector("input");
const submitByIdButton = document.getElementById("byIdBtn");

// взаимодействие пользователя со страницей
const handleSubmitClick = async (param, option, value) => {
  showSpinner();
  const content = await fetchContent(param, option, value);
  const serializeContent = param === "byQuery" ? await contentSerializer(content) : await oneEntityContentSerializer(content);
  setContent(serializeContent);
  showContentBlock();
  hideSpinner();
};

submitByQueryButton.addEventListener("click", () => handleSubmitClick("byQuery", byQuerySelect.value, byQueryInput.value));
submitByIdButton.addEventListener("click", () => handleSubmitClick("byId", byIdSelect.value, byIdInput.value));
hideContentButton.addEventListener("click", () => hideContentBlock());
