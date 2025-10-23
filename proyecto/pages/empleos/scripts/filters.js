import { fetchData, setJobs } from "./results.js";

const search = document.getElementById("search-input");
const filters = document.getElementById("filters");

search.addEventListener("keyup", async (event) => {
  const input = event.target.value;
  const data = await fetchData();
  let filtered = [];

  if (input) {
    filtered.push(...data.filter((j) => fuzzyFilter(j.titulo, input)));
    filtered.push(...data.filter((j) => fuzzyFilter(j.descripcion, input)));
  } else {
    filtered = data;
  }

  setJobs(filtered);
});

filters.addEventListener("change", async (event) => {
  const target = event.target;
  let data = await fetchData();

  if (target.value) {
    data = data.filter((j) => j.data[target.name] === target.value);
  }

  setJobs(data);
});

function fuzzyFilter(source, target) {
  return sanitizeString(source).includes(sanitizeString(target));
}

function sanitizeString(string) {
  return string.toLowerCase().normalize("NFD").replace(
    "/[\u0300-\u036f]/g",
    "",
  );
}
