const inputText = document.getElementById("input-text"); // input
const inputBtn = document.getElementById("input-btn"); // input button
const list = document.getElementById("task-list"); // list of tasks

inputBtn.addEventListener("click", createElement); // 클릭 이벤트 발생시 함수 실행

let todoList = []; // 객체 배열 생성

function createElement() {
  const text = inputText.value; // input에 입력된 텍스트를 가져오기

  // 새로운 아이템 객체 생성
  const item = {
    id: new Date().getTime(),
    text: text,
    checked: false,
  };

  todoList.push(item); // 객체 배열에 새로운 아이템을 추가

  list.appendChild(createTask(item)); // div 요소를 list 요소에 추가
}

function createTask(item) {
  inputText.value = ""; // input 텍스트 초기화

  const container = document.createElement("div"); // div 요소 생성
  container.className = "task";
  // div 요소 생성
  const div = document.createElement("div");
  div.className = "checkbox-text";

  // checkbox input 요소 생성
  const checkbox = document.createElement("input");
  checkbox.setAttribute("id", item.id);
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "r");
  checkbox.setAttribute("value", "2");
  if (item.checked) { checkbox.checked = true; }

  // label 요소 생성
  const label = document.createElement("label");
  label.setAttribute("for", item.id);
  label.textContent = item.text; // 라벨에 표시할 텍스트 설정

  const button = document.createElement("button");
  button.className = "remove-btn";

  const img = document.createElement("img");
  img.setAttribute("src", "./assets/icons/cross.png");

  button.appendChild(img);

  // 요소들을 div 내부에 추가
  div.appendChild(checkbox);
  div.appendChild(label);

  // 요소들을 container 내부에 추가
  container.appendChild(div);
  container.appendChild(button);

  button.addEventListener("click", () => { // X 버튼 클릭 시 요소 제거
    todoList = todoList.filter((t) => t.id!= item.id);
    container.remove();

    saveToLocalStorage();
  });

  checkbox.addEventListener("click", () => { 
    item.checked =!item.checked;

    saveToLocalStorage();
  });

  saveToLocalStorage();
  return container;
}

function displayTodos() {
	loadFromLocalStorage();

	for (let i = 0; i < todoList.length; i++) {
		const item = todoList[i];

		list.appendChild(createTask(item));
	}
}

displayTodos();

function saveToLocalStorage() {
	const data = JSON.stringify(todoList);

	localStorage.setItem("my_todoList", data);
}

function loadFromLocalStorage() {
	const data = localStorage.getItem("my_todoList");

	if (data) {
		todoList = JSON.parse(data);
	}
}

// 클릭 유지 기능 추가 및 디자인 추가,