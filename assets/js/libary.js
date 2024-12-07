console.info("Made by Mithun\nMarkdown Reader and Writer\nVersion: 0.0.1");

let darkMode = false;



function toggleDarkMode() {
    const body = document.getElementById("body");

    if (darkMode) {
        body.setAttribute("data-bs-theme")
    } else {
        body.className = "container-fluid bg-dark text-white"; // Switch to dark mode
    }

    darkMode = !darkMode;
}

function loadExampleMarkdown() {
    document.getElementById('markdown_reader').innerHTML = marked.parse("# Open a file!\n\nOpen a **file** to get started!\n\n*This is an example markdown. It'll be overriden when you open a new file*");
}

function loadMarkdown(file) {
    try {
        const reader = new FileReader();

        reader.onload = function(event) {
            const markdown = event.target.result;
            document.getElementById("markdown_reader").className = "text-break border-top border-right border-bottom border-dark p-3 mt-3"
            document.getElementById('markdown_reader').innerHTML = marked.parse(markdown);
            const links = document.querySelectorAll('a');
            links.forEach(link => {
                link.setAttribute("target", "_blank")
            })
            hljs.highlightAll();
            console.info("Successfully retrieved markdown data!");
        };

        reader.onerror = function(event) {
            console.error("Failed to read the file.");
            console.error(`Error: ${event.target.error.message}`);
            alert(`Sorry! Something went wrong.\nError: ${event.target.error.message}`);
        };

        reader.readAsText(file);
    } catch (error) {
        console.error("Unexpected error.");
        console.error(`Error: ${error.message}`);
        alert(`Sorry! Something went wrong.\nError: ${error.message}`);
    }
}

function getMode() {
    try {
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (userPrefersDark) { 
            document.getElementById("body").setAttribute("data-bs-theme", "dark");
            localStorage.setItem("mode", "dark");
        } else {
            document.getElementById("body").setAttribute("data-bs-theme", "light");
            localStorage.setItem("mode", "light");
        }
    } catch (error) {
        console.error("Failed to get default mode :(. Error: " + error.message + "\nDefaulting to light mode.");
        document.getElementById("body").setAttribute("data-bs-theme", "light");
    }
}