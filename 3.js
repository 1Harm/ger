    const searchBarContainerEl = document.querySelector(
        ".search-bar-wrapper"
      );
      const magnifierEl = document.querySelector(".magnifier");
      magnifierEl.addEventListener("click", () => {
        searchBarContainerEl.classList.toggle("active");
      });