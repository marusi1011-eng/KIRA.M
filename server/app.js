let token = "";

async function register() {
    await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });
    alert("Зарегистрирован");
}

async function login() {
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: email.value,
            password: password.value
        })
    });

    const data = await res.json();
    token = data.token;

    auth.style.display = "none";
    profile.style.display = "block";
}

async function saveProfile() {
    const traits = getTraits();

    await fetch("http://localhost:3000/profile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify(traits)
    });

    drawChart(traits);
}

function getTraits() {
    return {
        comm: +comm.value,
        stress: +stress.value,
        creative: +creative.value,
        leader: +leader.value,
        focus: +focus.value
    };
}

function drawChart(data) {
    new Chart(document.getElementById("chart"), {
        type: "radar",
        data: {
            labels: ["Комм", "Стресс", "Креатив", "Лидер", "Фокус"],
            datasets: [{
                label: "Ты",
                data: Object.values(data)
            }]
        }
    });
}

async function findJobs() {
    const res = await fetch("http://localhost:3000/jobs", {
        headers: { "Authorization": token }
    });

    const jobs = await res.json();

    jobsDiv.innerHTML = jobs.map(j =>
        `<div>${j.title} — ${j.score}%</div>`
    ).join("");
}
