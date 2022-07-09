
document.addEventListener("DOMContentLoaded", () => {
    browser.storage.sync.get("toneHighlight").then(s => {
        document.getElementById("tone-toggle").checked = s.toneHighlight || true;
    })
});

document.getElementById("tone-settings").addEventListener("submit", (e) => {
    e.preventDefault();
    browser.storage.sync.set({
        toneHighlight: document.getElementById("tone-toggle").checked
    });
});
