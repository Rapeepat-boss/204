async function loadMarkdown() {
    const response = await fetch("README.md");
    const markdown = await response.text();
    document.getElementById("content").innerHTML = marked.parse(markdown);
}

window.onload = loadMarkdown;
