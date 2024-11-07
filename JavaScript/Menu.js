document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector(".dropdown button");
    const dropdown = document.getElementById("dropdown");

    // Function to toggle menu visibility
    function toggleMenu() {
        dropdown.classList.toggle("show");
    }

    button.addEventListener("click", toggleMenu);

    // Close dropdown if clicked outside
    window.addEventListener("click", function (event) {
        if (!button.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove("show");
        }
    });
});