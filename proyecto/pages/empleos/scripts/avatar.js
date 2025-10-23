class UserAvatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  createUrl(service, username) {
    return `https://unavatar.io/${service}/${username}`;
  }

  render() {
    const service = this.getAttribute("service") ?? "github";
    const username = this.getAttribute("username") ?? "midudev";
    const size = this.getAttribute("size") ?? 40;

    const image = this.createUrl(service, username);

    this.shadowRoot.innerHTML = `
        <img
            src="${image}"
            alt="Avatar"
            class="avatar"
        />

        <style>
            img {
                width: ${size}px;
                height: ${size}px;
                border-radius: 100%;
            }
        </style>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

customElements.define("user-avatar", UserAvatar);
