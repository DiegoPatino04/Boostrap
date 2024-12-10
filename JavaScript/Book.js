const flipBook = (elBook) => {
  elBook.style.setProperty("--c", 0);
  const pages = elBook.querySelectorAll(".page");
  const totalPages = pages.length - 1;
  let currentPage = 0;
  let currentAudio = null;

  pages.forEach((page, idx) => {
    page.style.setProperty("--i", idx);
    page.addEventListener("click", (evt) => {
      const curr = evt.target.closest(".back") ? idx : idx + 1;
      updatePage(curr);
    });
  });

  const updatePage = (newPage) => {
    currentPage = Math.max(0, Math.min(newPage, totalPages));
    elBook.style.setProperty("--c", currentPage);

    if (currentAudio) {
      currentAudio.pause();
    }

    loadBookContent(`page${currentPage + 1}`);

    currentAudio = new Audio(`audio/page${currentPage + 1}.mp3`);
    currentAudio.load();
  };

  document.getElementById("prevBtn").addEventListener("click", () => {
    updatePage(currentPage - 1);
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    updatePage(currentPage + 1);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      updatePage(currentPage - 1);
    } else if (event.key === "ArrowRight") {
      updatePage(currentPage + 1);
    } else if (event.code === "Space") {
      event.preventDefault();
      toggleAudio();
    }
  });

  const toggleAudio = () => {
    if (currentAudio) {
      if (currentAudio.paused) {
        currentAudio.play();
      } else {
        currentAudio.pause();
      }
    }
  };

  const goToSpecificPage = (pageId) => {
    const pageIndex = parseInt(pageId.replace("page", "")) - 1;
    updatePage(pageIndex);
  };

  document.querySelectorAll(".dropdown-item").forEach((item) => {
    const href = item.getAttribute("href");
    if (href && href.startsWith("#page")) {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        goToSpecificPage(href.substring(1));
      });
    }
  });
};

document.querySelectorAll(".book").forEach(flipBook);

async function loadBookContent(pageId) {
  try {
    const response = await fetch(`utilities/${pageId}.txt`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const pageContent = await response.text();

    const frontContainer = document.querySelector(
      `.page[data-page="${pageId}"] .front`
    );
    const backContainer = document.querySelector(
      `.page[data-page="${pageId}"] .back`
    );

    frontContainer.querySelectorAll("p").forEach((p) => p.remove());
    backContainer.querySelectorAll("p").forEach((p) => p.remove());

    const [frontText, backText] = pageContent.split("<!--BACK-->");

    if (frontText) {
      const contentElement = document.createElement("p");
      contentElement.style.fontFamily = "Garamond";
      contentElement.style.fontSize = "14px";
      contentElement.innerHTML = frontText.trim();
      frontContainer.appendChild(contentElement);
    }

    if (backText) {
      const contentElementBack = document.createElement("p");
      contentElementBack.style.fontFamily = "Garamond";
      contentElementBack.style.fontSize = "14px";
      contentElementBack.innerHTML = backText.trim();
      backContainer.appendChild(contentElementBack);
    }
  } catch (error) {
    console.error("Error loading book content:", error);
  }
}

loadBookContent("page1");
