import React from "react";
import ReactDOM from "react-dom/client";
// Components will now be loaded dynamically based on the container's
// data-component attribute, so we no longer import them statically.

// HTMX event: after new content is swapped in
document.body.addEventListener("htmx:afterSwap", async (event) => {
  const container = document.getElementById("react-root");

  if (container && !container.dataset.hydrated) {
    container.dataset.hydrated = "true";

    // Pick the component to hydrate from a data attribute. If none is set, default to "Game".
    const componentName = container.dataset.component || "TickTackToe";

    try {
      // Dynamically import the component. This allows any component placed in
      // src/app/components to be hydrated without changing this file.
      const module = await import(`./app/components/${componentName}`);
      const Component = module.default ?? module[componentName];

      if (Component) {
        ReactDOM.createRoot(container).render(<Component />);
      } else {
        console.error(
          `Component '${componentName}' does not have a default export or named export matching its filename.`
        );
      }
    } catch (error) {
      console.error(`Failed to dynamically import component '${componentName}'.`, error);
    }
  }
});