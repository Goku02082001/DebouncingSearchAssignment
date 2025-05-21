let todos = [];

fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => {
    todos = data.slice(0, 100); 
  })
  .catch(err => {
    console.error("Failed to fetch todos:", err);
  });

function highlight(text, query) {
  const re = new RegExp(`(${query})`, 'gi');
  return text.replace(re, `<span class="highlight">$1</span>`);
}

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

function throttle(fn, limit) {
  let lastRun = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      fn(...args);
    }
  };
}

function searchTodos(query) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!query) return;

  const results = todos.filter(todo =>
    todo.title.toLowerCase().includes(query.toLowerCase())
  );

  results.forEach(todo => {
    const div = document.createElement("div");
    div.className = "item";
    const highlightedTitle = highlight(todo.title, query);
    div.innerHTML = `
      <strong>ID:</strong> ${todo.id}<br>
      <strong>Title:</strong> ${highlightedTitle}<br>
      <small>Status: ${todo.completed ? " Completed" : "Pending"}</small>
    `;
    resultsDiv.appendChild(div);
  });
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", debounce(e => {
  searchTodos(e.target.value.trim());
}, 300));

window.addEventListener("resize", throttle(() => {
  console.log("Resized at", new Date().toLocaleTimeString());
}, 1000));
