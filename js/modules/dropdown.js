/** Codigo que adiciona um comportamento interativo para os 'menus dropdown', permitindo que eles sejam abertos ao clicar(ou tocar) e fechados ao CLICAR FORA */

export default function initDropdown() {}

/** Selecionando todos os menus que contenham  'data-dropdown' */
const dropdownMenus = document.querySelectorAll("[data-dropdown]");

/** Para cada dropdown encontrado, o codigo adiciona dois ouvintes do evento (toutchstar e click (tocar e clicar)). Ou seja, se o usuario clicar ou tocar a função 'handleClick será executada  */
dropdownMenus.forEach((menu) => {
  ["touchstart", "click"].forEach((userEvent) => {
    menu.addEventListener(userEvent, handleClick);
  });
});

/**event.preventDefault(): Impede o comportamento padrão do evento (como o redirecionamento, se fosse um link).

this.classList.add("active"): Adiciona a classe active ao menu que foi clicado, para que ele seja exibido.

outsideClick: Chama a função outsideClick para fechar o menu se o usuário clicar fora dele. */
function handleClick(event) {
  event.preventDefault();
  this.classList.add("active");
  outsideClick(this, () => {
    this.classList.remove("active");
  });
}

/**Adiciona um evento no html para detectar cliques fora do menu! */
function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  /** verifica se o atributo 'data-outside' EXISTE (mencionado na constante acima) */
  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      html.addEventListener(userEvent, handleOutsideClick);
    });
    element.setAttribute(outside, "");
  }

  /**Se o clique (ou toque) acontecer fora do menu (!element.contains(event.target)), a função:
Remove o atributo data-outside do menu.
Remove os ouvintes de evento do html para evitar execuções desnecessárias no futuro.
Chama a função callback() para remover a classe active e fechar o menu. */

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
}

/** Resumo
Esse código permite que:

O menu dropdown abra quando clicado ou tocado.
O menu feche automaticamente se o usuário clicar ou tocar fora dele. */
