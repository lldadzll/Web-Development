// ---------------------------------------
// DARK MODE TOGGLE
// ---------------------------------------

const darkSwitch = document.getElementById("darkSwitch");

if (darkSwitch) {
    // load saved preference
    const saved = localStorage.getItem("gow-dark-mode");
    if (saved === "on") {
        document.body.classList.add("dark");
        darkSwitch.checked = true;
    }

    darkSwitch.addEventListener("change", () => {
        if (darkSwitch.checked) {
            document.body.classList.add("dark");
            localStorage.setItem("gow-dark-mode", "on");
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem("gow-dark-mode", "off");
        }
    });
}

// ---------------------------------------
// SIMPLE FADE-IN FOR WHOLE PAGE
// ---------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = 0;
    document.body.style.transition = "opacity 0.6s ease";
    requestAnimationFrame(() => {
        document.body.style.opacity = 1;
    });
});
