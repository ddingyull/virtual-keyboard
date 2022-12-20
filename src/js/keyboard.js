export class Keyboard {
  #switchEl; //#를 붙인 값은 class 외부에서 다른 값을 덮어씌울 수 없게 함
  #fontSelectEl;
  constructor() {
    this.#assignElement(); //요소 가져오고
    this.#addEvent(); //이벤트 붙여줬고 constructor 실행먼저 해줌
  }
  #assignElement() {
    this.#switchEl = document.getElementById("switch");
    this.#fontSelectEl = document.getElementById("font");
  }

  #addEvent() {
    this.#switchEl.addEventListener("change", (e) => {
      document.documentElement.setAttribute(
        "theme",
        e.target.checked ? "dark-mode" : ""
      );
    });
    this.#fontSelectEl.addEventListener("change", (e) => {
      document.body.style.fontFamily = e.target.value;
    });
  }
}
