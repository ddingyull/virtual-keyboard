export class Keyboard {
  #switchEl; //#를 붙인 값은 class 외부에서 다른 값을 덮어씌울 수 없게 함
  #fontSelectEl;
  #containerEl;
  #keyboardEl;
  #inputGroupEl;
  #inputEl;
  #keyPress = false;
  #mouseDown = false;
  constructor() {
    this.#assignElement(); //요소 가져오고
    this.#addEvent(); //이벤트 붙여줬고 constructor 실행먼저 해줌
  }
  #assignElement() {
    this.#containerEl = document.getElementById("container");
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
    this.#inputGroupEl = this.#containerEl.querySelector("#input-group");
    this.#inputEl = this.#inputGroupEl.querySelector("#input");
  }

  #addEvent() {
    // 다크모드 기능
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    // 폰트변경 기능
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);
    // 키보드 누르면 작성되는 기능
    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));
    this.#inputEl.addEventListener("input", this.#onInput);
    this.#keyboardEl.addEventListener(
      "mousedown",
      this.#onMouseDown.bind(this)
    );
    document.addEventListener("mouseup", this.#onMouseUp.bind(this));
  }

  #onMouseUp(e) {
    if (this.#keyPress) return;
    this.#mouseDown = false;
    const keyEl = e.target.closest("div.key");
    const isActive = !!keyEl?.classList.contains("active");
    const val = keyEl?.dataset.val;
    if (isActive && !!val && (val !== "Space") & (val !== "Backspace")) {
      this.#inputEl.value += val;
    }
    if (isActive && val == "Space") {
      this.#inputEl.value = " ";
    }
    if (isActive && val == "Backspace") {
      this.#inputEl.value = this.#inputEl.value.slice(0, -1);
    }
    this.#keyboardEl.querySelector(".active")?.classList.remove("active");
  }
  #onMouseDown(e) {
    if (this.#keyPress) return;
    e.target.closest("div.key")?.classList.add("active");
  }
  #onInput(e) {
    e.target.value = e.target.value.replace(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/, "");
  }
  #onKeyDown(e) {
    if (this.#mouseDown) return;
    this.#keyPress = true;
    // 한글 작성 시 에러문구 표시
    this.#inputGroupEl.classList.toggle(
      "error",
      /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.key)
    );
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.add("active");
  }
  #onKeyUp(e) {
    if (this.#mouseDown) return;
    this.#keyPress = false;
    this.#keyboardEl
      .querySelector(`[data-code=${e.code}]`)
      ?.classList.remove("active");
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
