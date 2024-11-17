document.addEventListener("DOMContentLoaded", function () {
    const buttonMenu = document.querySelector(".dropdown button#dropdownMenuButton");
    const buttonChapters = document.querySelector(".dropdown button#dropdownChaptersButton");
    const dropdownMenu = document.getElementById("dropdown");
    const dropdownChapters = document.getElementById("dropdownChapters");

    // Función para mostrar o esconder un menú específico
    function toggleMenu(type) {
        // Si el tipo es 'menu', primero cerramos el menú de capítulos
        if (type === 'menu') {
            dropdownMenu.classList.toggle("show");
            // Si se abre el menú, aseguramos que el menú de capítulos esté cerrado
            if (dropdownMenu.classList.contains("show")) {
                dropdownChapters.classList.remove("show"); // Cierra el menú de capítulos
                const buttonRect = buttonMenu.getBoundingClientRect();
                dropdownMenu.style.left = `0px`;
                dropdownMenu.style.top = `2.5rem`;
            }
        } else if (type === 'chapters') {
            dropdownChapters.classList.toggle("show");
            // Si se abre el menú de capítulos, aseguramos que el menú de menú esté cerrado
            if (dropdownChapters.classList.contains("show")) {
                dropdownMenu.classList.remove("show"); // Cierra el menú de menú
                const buttonRect = buttonChapters.getBoundingClientRect();
                dropdownChapters.style.left = `0px`;
                dropdownChapters.style.top = `2.5rem`;
            }
        }
    }

    // Cuando el botón de "Menú" es clickeado, alternamos la visibilidad del menú
    buttonMenu.addEventListener("click", function (event) {
        event.stopPropagation(); // Esto evita que el clic en el botón dispare el evento de clic global
        toggleMenu('menu');
    });

    // Cuando el botón de "Capítulos" es clickeado, alternamos la visibilidad del menú
    buttonChapters.addEventListener("click", function (event) {
        event.stopPropagation(); // Esto evita que el clic en el botón dispare el evento de clic global
        toggleMenu('chapters');
    });

    // Cuando se hace clic en cualquier parte del documento que no sea un menú o el botón correspondiente
    window.addEventListener("click", function (event) {
        // Si el clic no es en el menú de "Menú" ni en su botón, lo cerramos
        if (!dropdownMenu.contains(event.target) && !buttonMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
        // Si el clic no es en el menú de "Capítulos" ni en su botón, lo cerramos
        if (!dropdownChapters.contains(event.target) && !buttonChapters.contains(event.target)) {
            dropdownChapters.classList.remove("show");
        }
    });
});