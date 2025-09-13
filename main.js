// Keep track of loaded CSS files to avoid duplicates
const loadedCSS = new Set();

/**
 * Load a component (HTML + optional CSS) into a container
 * @param {string} id - The ID of the container element
 * @param {string} htmlFile - Path to the component's HTML file
 * @param {string} cssFile - Path to the component's CSS file (optional)
 */
async function loadComponent(id, htmlFile, cssFile) {
    const container = document.getElementById(id);
    if (!container) {
        console.warn(`Element with id="${id}" not found`);
        return;
    }

    try {
        // Load HTML
        const response = await fetch(htmlFile);
        if (!response.ok) throw new Error(`Failed to load ${htmlFile}`);
        const html = await response.text();
        container.innerHTML = html;

        // Load CSS if provided and not already loaded
        if (cssFile && !loadedCSS.has(cssFile)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssFile;
            document.head.appendChild(link);
            loadedCSS.add(cssFile);
        }
    } catch (err) {
        console.error(`Error loading component "${id}":`, err);
    }
}

// Define all components in an array
const components = [
    // { id: "nav-bar", path: "./src/navigation/navigation" },
    // { id: "home", path: "./src/home/home" }
    { id: "about", path: "./src/about/about" },
    { id: "education", path: "./src/education/education" },
    { id: "experience", path: "./src/experience/experience" },
    { id: "research", path: "./src/publications/publications" },
    { id: "projects", path: "./src/projects/projects" },
    { id: "skills", path: "./src/skills/skills" },
    { id: "certifications", path: "./src/certifications/certifications" },
    { id: "contact", path: "./src/contact/contact" },
    { id: "footer", path: "./src/footer/footer" }
];

// Load all components
components.forEach(c => loadComponent(c.id, `${c.path}.html`, `${c.path}.css`));
