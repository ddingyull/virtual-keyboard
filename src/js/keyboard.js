export class Keyboard {
  #switchEl; //#를 붙인 값은 class 외부에서 다른 값을 덮어씌울 수 없게 함
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  constructor() {
    this.#assignElement(); //요소 가져오고
    this.#addEvent(); //이벤트 붙여줬고 constructor 실행먼저 해줌
  }
  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
  }

  #addEvent() {
    // 다크모드 기능
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    // 폰트변경 기능
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    // 키보드 누르면 작성되는 기능
    document.addEventListener("keydown", (e) => {
      this.#keyboardEl
        .querySelector(`[data-code=${e.code}]`)
        ?.classList.add("active");
    });
    document.addEventListener("keyup", (e) => {
      this.#keyboardEl
        .querySelector(`[data-code=${e.code}]`)
        ?.classList.remove("active");
    });
  }

  #onChangeTheme(e) {
    document.documentElement.setAttribute(
      "theme",
      e.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(e) {
    document.body.style.fontFamily = e.target.value;
  }
}
