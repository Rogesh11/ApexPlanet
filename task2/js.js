
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let msg = document.getElementById("message").value.trim();

    let valid = true;

    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    if (name === "") {
        document.getElementById("err-name").textContent = "Name is required";
        valid = false;
    }

    if (email === "") {
        document.getElementById("err-email").textContent = "Email is required";
        valid = false;
    } else if (!email.includes("@") || !email.includes(".")) {
        document.getElementById("err-email").textContent = "Invalid email";
        valid = false;
    }

    if (msg === "") {
        document.getElementById("err-message").textContent = "Message is required";
        valid = false;
    }

    if (valid) {
        alert("Form submitted successfully!");
        document.getElementById("contactForm").reset();
    }
});

let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

document.getElementById("addTaskBtn").addEventListener("click", addTask);

function addTask() {
    let text = taskInput.value.trim();
    if (text === "") {
        alert("Enter a task!");
        return;
    }

    let li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
        <div class="left">
            <input type="checkbox" class="check">
            <span class="task-text">${text}</span>
        </div>

        <div class="buttons">
            <button class="complete">✔</button>
            <button class="edit">✏</button>
            <button class="delete">🗑</button>
        </div>
    `;

    taskList.appendChild(li);
    taskInput.value = "";

    updateStatus();


    li.querySelector(".complete").onclick = () => {
        li.querySelector(".task-text").classList.toggle("completed-text");
        li.querySelector(".check").checked =
            !li.querySelector(".check").checked;
        updateStatus();
    };

    li.querySelector(".check").onclick = () => {
        li.querySelector(".task-text").classList.toggle("completed-text");
        updateStatus();
    };

   
    li.querySelector(".edit").onclick = () => {
        let newText = prompt("Edit task:", text);
        if (newText && newText.trim() !== "") {
            li.querySelector(".task-text").textContent = newText;
        }
    };

    li.querySelector(".delete").onclick = () => {
        li.remove();
        updateStatus();
    };
}

function updateStatus() {
    let total = document.querySelectorAll(".task-item").length;
    let completed = document.querySelectorAll(".completed-text").length;
    let pending = total - completed;

    document.getElementById("total").textContent = total;
    document.getElementById("completed").textContent = completed;
    document.getElementById("pending").textContent = pending;
}
