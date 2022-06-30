const tabList = document.querySelector('[role="tablist"]'); // para mais info: https://www.w3.org/TR/wai-aria-1.1/#tablist
const tabs = tabList.querySelectorAll('[role="tab"]');
let maxLongitude = tabs.length;

// Este evento chama a funçom changeTabFocus, que só responde aos pulsados de "Esquerda" e "Direita"
tabList.addEventListener("keydown", changeTabFocus);

//Este evento activa-se com CLICK-ESQUERDO tamém coa tecla SPACEBAR
tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

//****** Funçom que muda o elemento com Focus premendo as teclas "Esquerda" e "Direita"
let tabFocus = 0; // Variável para controlar o índice de TABS da TABLIST
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  // Change tabindex of the current tab to -1
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);
    // if the right key is pushed, move to the next tab on the right
    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= maxLongitude) tabFocus = 0;
    } else if (e.keyCode === keydownLeft) {
      // if the right key is pushed, move to the next tab on the left
      tabFocus--;
      if (tabFocus < 0) tabFocus = maxLongitude - 1;
    }
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}

//*****  Funçom que apresenta o contido ("tabpanel") de cada "tab" seleccionado dentro dumha "tablist"
function changeTabPanel(e) {
  const targetTab = e.target; // guarda o objecto seleccionado no evento (um elemento JTML e os seus filhos)
  const targetPanel = targetTab.getAttribute("aria-controls"); // guarda o valor do atributo "aria-controls"
  const targetImage = targetTab.getAttribute("data-image"); // guarda o valor do atributo "data-image"

  // Navegamos polo DOM até o nodo pai que nos interessa
  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode; // O elemento <main> contem os elementos <article> que nos interessam
  // Mudamos o atributo aria-selected ("true" para o elemento que recebe o click/SPACEBAR)
  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);
  targetTab.setAttribute("aria-selected", true);
  // tabpanel (contido do TAB)
  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);
  // Image associada ao TAB
  hideContent(mainContainer, "picture");
  showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true)); // primeiro pomos todos os elementos seleccionados em "hidden"
}

function showContent(parent, content) {
  // procuramos o elemento que tenha um "id" = "valor_de_content" e eliminamos o seu atributo "hidden"
  parent.querySelector(content).removeAttribute("hidden");
}
