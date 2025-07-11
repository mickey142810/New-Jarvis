function handleJarvisCommand() {
  const input = document.getElementById('chatInput').value.toLowerCase();
  const output = document.getElementById('chatOutput');

  if (input.includes("play music")) {
    document.getElementById("musicBox").style.display = "block";
    playMusic();
    output.textContent = "🎵 Opening music player.";
  } else if (input.includes("stop music") || input.includes("hide music")) {
    document.getElementById("musicBox").style.display = "none";
    stopMusic();
    output.textContent = "🎵 Music player hidden.";
  }

  else if (input.includes("fortnite")) {
    document.getElementById("fortniteBox").style.display = "block";
    getFortniteTips();
    output.textContent = "🎮 Displaying Fortnite tips.";
  }

  else if (input.includes("homework")) {
    document.getElementById("homeworkBox").style.display = "block";
    askHomework(input.replace("homework", "").trim());
    output.textContent = "📚 Working on your homework...";
  }

  else if (input.includes("to-do") || input.includes("todo")) {
    document.getElementById("todoBox").style.display = "block";
    output.textContent = "✅ To-do list opened.";
  }

  else if (input.includes("hide all")) {
    ["musicBox", "fortniteBox", "homeworkBox", "todoBox"].forEach(id => {
      document.getElementById(id).style.display = "none";
    });
    stopMusic();
    output.textContent = "All modules hidden.";
  }

  else {
    output.textContent = "🤖 I don't recognize that command.";
  }
}

// Music Controls
function playMusic() {
  document.getElementById("bgMusic").play();
}
function stopMusic() {
  document.getElementById("bgMusic").pause();
}

// Fortnite Tips
function getFortniteTips() {
  const tips = [
    "Build to gain height advantage.",
    "Use headphones for better awareness.",
    "Drop in quiet areas to last longer.",
    "Carry healing and shield items.",
    "Master building/editing quickly."
  ];
  document.getElementById('fortniteTips').textContent =
    tips[Math.floor(Math.random() * tips.length)];
}

// Homework Help using OpenAI API
async function askHomework(question) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: "Help with homework: " + question }]
    })
  });
  const data = await response.json();
  document.getElementById("homeworkOutput").textContent =
    data.choices[0].message.content;
}

// To-Do
function addTask() {
  const input = document.getElementById('todoInput');
  const task = input.value;
  if (!task.trim()) return;
  const li = document.createElement('li');
  li.textContent = task;
  li.onclick = () => li.remove();
  document.getElementById('todoList').appendChild(li);
  input.value = '';
}
