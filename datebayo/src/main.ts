import "./style.css";

const BASE_URL = "https://api.thecatapi.com/v1/images/search";
const API_KEY =
    "live_Tp5pbcy22dN8MM23paiJ7MmnqzzmKzysJVCstBz6KUJWogOizXT7d88QuMAld7LR";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="root">
  </div>
`;
const root: HTMLDivElement = document.querySelector<HTMLDivElement>("#root")!;
// const body: HTMLBodyElement = document.querySelector<HTMLBodyElement>("body")!;

const nextButton: HTMLButtonElement = document.createElement("button");
const svgNext: SVGSVGElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
);
const svgNextPath: SVGPathElement = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path"
);
svgNextPath.setAttribute(
    "d",
    "M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"
);
svgNextPath.setAttribute("fill", "#000000");

svgNext.setAttribute("width", "3rem");
svgNext.setAttribute("height", "3rem");
svgNext.setAttribute("viewBox", "0 0 320 512");
svgNext.appendChild(svgNextPath);

nextButton.appendChild(svgNext);
nextButton.className = "next-button";

const initFetch = async (baseUrl: string) => {
    const response = await fetch(baseUrl, {
        method: "GET",
        headers: {
            "x-api-key": API_KEY,
        },
    });
    if (!response.ok) {
        throw new Error(`Respponse state: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    const backImage: HTMLDivElement = document.createElement("div");
    const app: HTMLDivElement = document.querySelector<HTMLDivElement>("#app")!;
    const image: HTMLImageElement = document.createElement("img");
    const name: HTMLParagraphElement = document.createElement("p");

    backImage.className = "background-image";
    backImage.style.backgroundImage = `url(${json[0].url})`;

    image.src = json[0].url;
    image.alt = "Gambar";

    name.textContent = json[0].breeds[0]?.name;

    // name.textContent = "name";
    name.className = "name";

    json[0].breeds.length > 0 ? app.appendChild(name) : null;
    app?.appendChild(backImage);
    root?.appendChild(image);
};

nextButton.addEventListener("click", () => {
    const backi = document.querySelectorAll(".background-image");
    const names = document.querySelectorAll(".name");
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    if (names.length >= 1) {
        names.forEach((b, i) => {
            document.querySelector("#app")?.removeChild(b);
            if (i == names.length - 1) {
                return;
            }
        });
    }

    if (backi.length >= 1) {
        backi.forEach((b, i) => {
            document.querySelector("#app")?.removeChild(b);
            if (i == backi.length - 1) {
                return;
            }
        });
    }
    initFetch(BASE_URL);
});

initFetch(BASE_URL);
document.querySelector("#app")?.appendChild(nextButton);
