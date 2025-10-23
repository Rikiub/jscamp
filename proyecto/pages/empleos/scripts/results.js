const results = document.getElementById("jobs-results");

export function initRender() {
  results.addEventListener("click", (event) => {
    const target = event.target;

    if (target.tagName == "BUTTON") {
      target.innerText = "¡Aplicado!";
      target.classList.add("applied");
      target.disabled = true;
    }
  });

  (async () => {
    const data = await fetchData();
    setJobs(data);
  })();
}

export function setJobs(jobs) {
  results.innerHTML = "";

  for (const job of jobs) {
    const el = createJobElement(job);
    results.appendChild(el);
  }
}

export async function fetchData() {
  const response = await fetch("./data.json");
  const json = await response.json();
  return json;
}

function createJobElement(job) {
  const el = document.createElement("job-article");

  el.setAttribute("title", job.titulo);
  el.setAttribute("description", job.descripcion);
  el.setAttribute("company", job.empresa);
  el.setAttribute("location", job.ubicacion);

  el.setAttribute("technology", job.data.technology);
  el.setAttribute("modalidad", job.modalidad);
  el.setAttribute("nivel", job.data.nivel);

  return el;
}
