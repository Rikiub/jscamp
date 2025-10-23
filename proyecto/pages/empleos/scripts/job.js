class JobArticle extends HTMLElement {
  constructor() {
    super();
  }

  render() {
    const title = this.getAttribute("title");
    const description = this.getAttribute("description");

    const company = this.getAttribute("company");
    const location = this.getAttribute("location");

    const modalidad = this.getAttribute("modalidad");
    const technology = this.getAttribute("technology");
    const nivel = this.getAttribute("nivel");

    this.dataset.modalidad = modalidad;
    this.dataset.technology = technology;
    this.dataset.nivel = nivel;

    this.innerHTML = `
        <article>
            <header>
                <div>
                    <h2>${title}</h2>
                    <p>${company} | ${location}</p>
                </div>
        
                <button>Aplicar</button>
            </header>
    
            <p>${description}</p>
        </article>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("job-article", JobArticle);
