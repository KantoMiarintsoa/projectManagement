document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("theme-slider");

    // Load saved theme from local storage
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.className = savedTheme;

    // Set slider position based on the theme
    slider.value = savedTheme === "dark" ? 1 : 0;

    // Add event listener for slider changes
    slider.addEventListener("input", () => {
        if (slider.value == 1) {
            // Switch to dark mode
            document.body.className = "dark";
            localStorage.setItem("theme", "dark");
        } else {
            // Switch to light mode
            document.body.className = "light";
            localStorage.setItem("theme", "light");
        }
    });
});
