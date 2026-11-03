(function () {
  var isEnglish = document.documentElement.lang === "en";
  var copyEmail = document.querySelector("[data-copy-email]");
  if (copyEmail) {
    var copyResetTimer;
    copyEmail.addEventListener("click", async function () {
      var emailLink = document.querySelector("[data-contact-email]");
      var status = document.querySelector("[data-copy-status]");
      try {
        await navigator.clipboard.writeText(emailLink.textContent.trim());
        status.textContent = isEnglish ? "Email copied." : "Correo copiado.";
        window.clearTimeout(copyResetTimer);
        copyEmail.classList.add("is-copied");
        copyEmail.setAttribute("aria-label", isEnglish ? "Email copied" : "Correo copiado");
        copyEmail.title = isEnglish ? "Email copied" : "Correo copiado";
        copyResetTimer = window.setTimeout(function () {
          copyEmail.classList.remove("is-copied");
          copyEmail.setAttribute("aria-label", isEnglish ? "Copy email" : "Copiar correo");
          copyEmail.title = isEnglish ? "Copy email" : "Copiar correo";
        }, 2500);
      } catch (error) {
        var range = document.createRange();
        range.selectNodeContents(emailLink);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = isEnglish ? "Email selected. Press Ctrl+C or Cmd+C to copy." : "Correo seleccionado. Presiona Ctrl+C o Cmd+C para copiar.";
      }
    });
  }
  document.querySelectorAll("[data-language]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.assign(link.getAttribute("href") + window.location.hash);
    });
  });

  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  var editorTabs = Array.prototype.slice.call(document.querySelectorAll("[data-editor-tab]"));

  var profileExplorer = document.querySelector("[data-profile-explorer]");
  var profilePath = document.querySelector("[data-profile-path]");
  var profileDesktop = window.matchMedia("(min-width: 48rem)");
  if (profileExplorer) {
    profileExplorer.open = profileDesktop.matches;
    profileDesktop.addEventListener("change", function () { profileExplorer.open = profileDesktop.matches; });
  }

  var profileFolders = Array.prototype.slice.call(document.querySelectorAll(".profile-folder"));
  var foldersToggle = document.querySelector("[data-folders-toggle]");
  function syncFoldersToggle() {
    if (!foldersToggle) return;
    var anyOpen = profileFolders.some(function (folder) { return folder.open; });
    var label = anyOpen
      ? (isEnglish ? "Collapse folders" : "Contraer carpetas")
      : (isEnglish ? "Expand folders" : "Expandir carpetas");
    foldersToggle.dataset.state = anyOpen ? "collapse" : "expand";
    foldersToggle.setAttribute("aria-label", label);
    foldersToggle.title = label;
  }
  if (foldersToggle) {
    foldersToggle.addEventListener("click", function () {
      var anyOpen = profileFolders.some(function (folder) { return folder.open; });
      profileFolders.forEach(function (folder) { folder.open = !anyOpen; });
      syncFoldersToggle();
    });
    profileFolders.forEach(function (folder) {
      folder.addEventListener("toggle", syncFoldersToggle);
    });
    syncFoldersToggle();
  }

  function selectEditorTab(selected, moveFocus) {
    editorTabs.forEach(function (tab) {
      tab.setAttribute("aria-pressed", String(tab === selected));
    });
    document.querySelectorAll("[data-editor-panel]").forEach(function (panel) {
      panel.hidden = panel.id !== selected.getAttribute("aria-controls");
      if (!panel.hidden) panel.setAttribute("aria-labelledby", selected.id);
    });
    document.querySelectorAll(".profile-folder").forEach(function (folder) {
      if (folder.contains(selected)) folder.open = true;
    });
    if (selected.hasAttribute("data-workspace-skill")) selectTechTab(selected.dataset.workspaceSkill);
    if (selected.hasAttribute("data-workspace-company")) {
      selectCompany(selected.dataset.workspaceCompany);
      selected.closest("details").open = true;
    }
    if (selected.hasAttribute("data-workspace-project")) {
      document.querySelectorAll("[data-project-panel]").forEach(function (panel) {
        panel.hidden = panel.id !== selected.dataset.workspaceProject;
      });
      selected.closest("details").open = true;
    }
    if (profilePath) profilePath.textContent = "portfolio › " + selected.dataset.file.replaceAll("/", " › ");
    var fileName = selected.dataset.file.split("/").pop();
    var fileKind = fileName.split(".").pop();
    document.querySelector("[data-active-file-name]").textContent = fileName;
    var fileType = document.querySelector("[data-active-file-type]");
    fileType.textContent = fileKind.toUpperCase();
    fileType.dataset.kind = fileKind;
    if (moveFocus) selected.focus();
    if (profileExplorer && !profileDesktop.matches) {
      profileExplorer.open = false;
      if (moveFocus || profileExplorer.contains(document.activeElement)) profileExplorer.querySelector("summary").focus({ preventScroll: true });
      window.requestAnimationFrame(function () {
        document.querySelector(".hero__editor").scrollIntoView({ block: "start" });
      });
    }
  }

  function editorHash(tab) {
    if (tab.hasAttribute("data-workspace-skill")) return "#skills-" + tab.dataset.file.split("/").pop().replace(/\.[^.]+$/, "");
    if (tab.dataset.workspaceProject) return "#" + tab.dataset.workspaceProject;
    if (tab.dataset.workspaceCompany !== undefined) return "#experiencia-" + tab.dataset.file.split("/").pop().replace(/\.md$/, "");
    return tab.id === "tab-perfil" ? "#inicio" : "#" + tab.getAttribute("aria-controls");
  }

  editorTabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      selectEditorTab(tab, false);
      window.history.replaceState(null, "", editorHash(tab));
    });
    tab.addEventListener("keydown", function (event) {
      var nextIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % editorTabs.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + editorTabs.length) % editorTabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = editorTabs.length - 1;
      else return;
      event.preventDefault();
      selectEditorTab(editorTabs[nextIndex], true);
      window.history.replaceState(null, "", editorHash(editorTabs[nextIndex]));
    });
  });

  function selectCompany(index) {
    document.querySelectorAll("[data-company-panel]").forEach(function (panel) {
      panel.hidden = panel.dataset.companyPanel !== String(index);
    });
  }

  function openEditorFromHash() {
    var hash = window.location.hash;
    if (hash === "#historia") hash = "#sobre-mi";
    var selected = hash === "#proyectos"
      ? editorTabs.find(function (tab) { return tab.id === "archivo-proyecto-0"; })
      : hash === "#tecnologias"
        ? editorTabs.find(function (tab) { return tab.dataset.workspaceSkill === "0"; })
      : hash === "#experiencia"
        ? editorTabs.find(function (tab) { return tab.dataset.workspaceCompany === "0"; })
        : editorTabs.find(function (tab) { return editorHash(tab) === hash; });
    if (!selected) return;
    selectEditorTab(selected, false);
    if (hash !== window.location.hash) window.history.replaceState(null, "", hash);
    window.requestAnimationFrame(function () {
      document.querySelector(".hero__editor").scrollIntoView({ block: "start" });
    });
    return selected;
  }
  window.addEventListener("hashchange", openEditorFromHash);
  document.querySelectorAll("a[href='/#inicio'], a[href='/#sobre-mi'], a[href='/#experiencia'], a[href='/#proyectos'], a[href='/#tecnologias'], a[href='/#contacto'], a[href='#sobre-mi'], a[href='#contacto'], a[href^='#proyecto-'], a[href^='#experiencia-'], a[href^='#skills-']").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var hash = link.hash;
      if (window.location.hash !== hash) window.history.pushState(null, "", hash);
      var selected = openEditorFromHash();
      if (selected && profileDesktop.matches) selected.focus({ preventScroll: true });
    });
  });
  openEditorFromHash();
  window.addEventListener("load", openEditorFromHash, { once: true });

  function selectTechTab(index) {
    document.querySelectorAll("[data-tech-panel]").forEach(function (panel) {
      panel.hidden = panel.id !== "tech-panel-" + index;
    });
  }

  var hero = document.querySelector(".hero");
  var typeTargets = Array.prototype.slice.call(document.querySelectorAll("[data-typewriter]"));
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (hero && typeTargets.length === 2 && !reducedMotion.matches) {
    var typeStarted = false;
    var fullTexts = typeTargets.map(function (node) { return node.textContent; });

    function typeText(node, content, baseDelay, complete) {
      var characters = Array.from(content);
      var index = 0;
      node.classList.add("is-typing");
      var codeRow = node.closest(".hero__code-row");
      if (codeRow) codeRow.classList.add("is-active");

      function next() {
        if (index === characters.length) {
          window.setTimeout(function () {
            node.classList.remove("is-typing");
            if (codeRow) codeRow.classList.remove("is-active");
            if (!complete) node.classList.add("is-finished");
            if (complete) complete();
          }, 380);
          return;
        }

        var character = characters[index++];
        node.textContent += character;
        var delay = character === " " ? baseDelay * 1.8 : /[";]/.test(character) ? baseDelay * 2.3 : baseDelay;
        window.setTimeout(next, delay);
      }

      next();
    }

    function startTyping() {
      if (typeStarted) return;
      typeStarted = true;
      typeTargets.forEach(function (node) { node.textContent = ""; });
      typeText(typeTargets[0], fullTexts[0], 90, function () {
        window.setTimeout(function () {
          typeText(typeTargets[1], fullTexts[1], 46);
        }, 180);
      });
    }

    if ("IntersectionObserver" in window) {
      var heroObserver = new IntersectionObserver(function (entries) {
        if (!entries[0].isIntersecting) return;
        heroObserver.disconnect();
        startTyping();
      }, { threshold: 0.15 });
      heroObserver.observe(hero);
    } else {
      startTyping();
    }
  }


  // A small virtual filesystem backed only by the portfolio's content files.
  var terminalForm = document.querySelector("[data-terminal-form]");
  if (terminalForm) {
    var terminal = document.querySelector("[data-terminal]");
    var terminalOpener = document.querySelector("[data-terminal-open]");
    var terminalInput = document.querySelector("[data-terminal-input]");
    var terminalOutput = document.querySelector("[data-terminal-output]");
    var terminalPrompt = document.querySelector("[data-terminal-prompt]");
    var nano = document.querySelector("[data-nano]");
    function closeNano(restoreFocus) {
      nano.hidden = true;
      terminal.classList.remove("is-nano-open");
      if (restoreFocus) terminalInput.focus({ preventScroll: true });
    }
    terminal.addEventListener("cancel", function (event) {
      if (!nano.hidden) { event.preventDefault(); closeNano(true); }
    });
    terminalOpener.addEventListener("click", function () {
      terminal.showModal();
      document.body.classList.add("has-terminal-open");
      terminalInput.focus({ preventScroll: true });
      terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
    });
    document.querySelector("[data-terminal-close]").addEventListener("click", function () { terminal.close(); });
    terminal.addEventListener("click", function (event) {
      if (event.target !== terminal) return;
      var bounds = terminal.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) terminal.close();
    });
    terminal.addEventListener("close", function () {
      closeNano(false);
      document.body.classList.remove("has-terminal-open");
      terminalOpener.focus({ preventScroll: true });
    });
    var cwd = "";
    var commandHistory = [];
    var historyIndex = 0;
    var historyDraft = "";
    var files = editorTabs.map(function (button) { return { path: button.dataset.file, button: button }; });
    var dirs = new Set([""]);
    files.forEach(function (file) {
      var parts = file.path.split("/");
      parts.pop();
      while (parts.length) { dirs.add(parts.join("/")); parts.pop(); }
    });
    function message(en, es) { return isEnglish ? en : es; }
    function resolvePath(input) {
      var absolute = /^(\/|~)/.test(input);
      input = input.replace(/^~(?:\/portfolio)?\/?/, "").replace(/^\/+/, "");
      var parts = absolute ? [] : cwd.split("/").filter(Boolean);
      input.split("/").forEach(function (part) {
        if (part === "..") parts.pop();
        else if (part && part !== ".") parts.push(part);
      });
      return parts.join("/");
    }
    function prompt() {
      return "max@portfolio:~/portfolio" + (cwd ? "/" + cwd : "") + "$";
    }
    function renderPrompt(node) {
      var user = document.createElement("span");
      user.className = "workspace-terminal__user";
      user.textContent = "max@portfolio";
      var path = document.createElement("span");
      path.className = "workspace-terminal__path";
      path.textContent = "~/portfolio" + (cwd ? "/" + cwd : "");
      node.replaceChildren(user, ":", path, "$ ");
    }
    function output(value, kind) {
      var line = document.createElement("pre");
      line.className = "workspace-terminal__line" + (kind ? " workspace-terminal__line--" + kind : "");
      if (kind === "command") {
        renderPrompt(line);
        line.appendChild(document.createTextNode(value.slice(prompt().length + 1)));
      } else line.textContent = value;
      terminalOutput.appendChild(line);
      while (terminalOutput.children.length > 60) terminalOutput.firstElementChild.remove();
      terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
    }
    function findFile(path) { return files.find(function (file) { return file.path === path; }); }
    function openFile(file) {
      selectEditorTab(file.button, false);
      window.history.replaceState(null, "", editorHash(file.button));
      var element;
      if (file.button.dataset.workspaceCompany !== undefined) element = document.getElementById("empresa-" + file.button.dataset.workspaceCompany);
      else if (file.button.hasAttribute("data-workspace-skill")) element = document.getElementById("tech-panel-" + file.button.dataset.workspaceSkill);
      else if (file.button.dataset.workspaceProject) element = document.getElementById(file.button.dataset.workspaceProject);
      else element = document.getElementById(file.button.getAttribute("aria-controls"));
      return element;
    }
    function showReader(file, content, isImage) {
      var readerContent = document.querySelector("[data-nano-content]");
      document.querySelector("[data-nano-file]").textContent = file.path;
      document.getElementById("nano-title").textContent = isImage
        ? message("Image preview · Read only", "Vista previa · Solo lectura")
        : message("GNU nano · Read only", "GNU nano · Solo lectura");
      readerContent.classList.toggle("nano-reader__content--image", isImage);
      if (isImage) readerContent.replaceChildren(content);
      else readerContent.textContent = content;
      nano.hidden = false;
      terminal.classList.add("is-nano-open");
      readerContent.scrollTop = 0;
      readerContent.focus({ preventScroll: true });
    }
    function readFile(file, useNano) {
      var element = openFile(file);
      if (file.path.endsWith(".jpg")) {
        var source = element.querySelector("img");
        if (!source) return output(message("Image not available.", "Imagen no disponible."), "error");
        var image = document.createElement("img");
        image.alt = source.alt;
        image.addEventListener("error", function () {
          showReader(file, message("Image could not be loaded: ", "No se pudo cargar la imagen: ") + file.path, false);
        });
        image.src = source.getAttribute("src");
        showReader(file, image, true);
        return;
      }
      function readable(node) {
        if (node.nodeType === 3) return node.textContent;
        if (node.nodeType !== 1 || node.matches("svg, script, style, [aria-hidden='true'], .visually-hidden, [data-workspace-nav]")) return "";
        var value = Array.from(node.childNodes).map(readable).join("");
        return /^(P|H[1-6]|LI|DT|DD|SECTION|ARTICLE|DETAILS|SUMMARY|DIV|DL|UL)$/.test(node.tagName) ? "\n" + value + "\n" : value;
      }
      var text;
      if (file.path === "profile.ts") {
        text = Array.from(element.querySelectorAll(".hero__code-row")).map(function (row) {
          var clone = row.cloneNode(true);
          clone.querySelectorAll(".hero__typed, .hero__line-number, .visually-hidden").forEach(function (node) { node.remove(); });
          var line = clone.textContent.trim();
          if (row.classList.contains("hero__code-row--field")) return "  " + line.replace(/:(?=["\[→])/, ": ");
          return line.replace(/^\/\//, "// ");
        }).join("\n");
      } else text = readable(element).replace(/\n{3,}/g, "\n\n").trim();
      if (useNano) showReader(file, text, false);
      else output(text);
    }
    function list(path) {
      var file = findFile(path);
      if (file) return output(path.split("/").pop());
      if (!dirs.has(path)) return output(message("Directory not found: ", "Carpeta no encontrada: ") + path, "error");
      var prefix = path ? path + "/" : "";
      var entries = new Set();
      files.forEach(function (item) {
        if (!item.path.startsWith(prefix)) return;
        var relative = item.path.slice(prefix.length).split("/");
        entries.add(relative[0] + (relative.length > 1 ? "/" : ""));
      });
      output([...entries].join("  "));
    }
    terminalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var command = terminalInput.value.trim();
      if (!command) return;
      commandHistory.push(command);
      historyIndex = commandHistory.length;
      historyDraft = "";
      terminalInput.value = "";
      output(prompt() + " " + command, "command");
      var tokens = command.match(/"[^"\n]*"|'[^'\n]*'|\S+/g).map(function (token) { return token.replace(/^(["'])(.*)\1$/, "$2"); });
      var name = tokens[0];
      var arg = tokens[1];
      if (name === "exit") { terminal.close(); return; }
      else if (name === "clear") terminalOutput.replaceChildren();
      else if (name === "help") output(message(
        "ls [path]       List files\ncd [directory]  Change directory (cd .. to go back)\npwd             Show current path\ncat <file>      Read in the terminal\nnano <file>     Open a read-only reader (^X or Esc to exit)\nclear           Clear output\nexit            Close terminal\n\nTry: nano about.md\nUse ↑ / ↓ for history and Tab to complete commands and paths (Shift+Tab to leave the input).",
        "ls [ruta]       Listar archivos\ncd [carpeta]    Cambiar carpeta (cd .. para volver)\npwd             Mostrar ruta actual\ncat <archivo>   Leer en la terminal\nnano <archivo>  Abrir el lector (^X o Esc para salir)\nclear           Limpiar salida\nexit            Cerrar terminal\n\nPrueba: nano about.md\nUsa ↑ / ↓ para el historial y Tab para completar comandos y rutas (Shift+Tab para salir del campo)."));
      else if (name === "pwd") output("/portfolio" + (cwd ? "/" + cwd : ""));
      else if (name === "ls") list(arg === "-a" ? cwd : arg ? resolvePath(arg) : cwd);
      else if (name === "cd") {
        var target = arg ? resolvePath(arg) : "";
        if (dirs.has(target)) cwd = target;
        else output(message("Directory not found: ", "Carpeta no encontrada: ") + arg, "error");
      } else if (name === "cat" || name === "nano") {
        var file = arg && findFile(resolvePath(arg));
        if (file) readFile(file, name === "nano");
        else output(arg ? message("File not found: ", "Archivo no encontrado: ") + arg : message("Usage: ", "Uso: ") + name + " <file>", "error");
      } else output(message("Unknown command. Type help.", "Comando desconocido. Escribe help."), "error");
      renderPrompt(terminalPrompt);
      document.getElementById("terminal-title").textContent = "max@portfolio: ~/portfolio" + (cwd ? "/" + cwd : "");
      if (nano.hidden) terminalInput.scrollIntoView({ block: "nearest" });
    });
    terminalInput.addEventListener("keydown", function (event) {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        if (historyIndex === commandHistory.length) historyDraft = terminalInput.value;
        historyIndex = Math.max(0, Math.min(commandHistory.length, historyIndex + (event.key === "ArrowUp" ? -1 : 1)));
        terminalInput.value = historyIndex === commandHistory.length ? historyDraft : commandHistory[historyIndex];
      }
      if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault();
        var value = terminalInput.value;
        var match = /^(\s*(ls|cd|cat|nano)\s+)([^\s]*)$/.exec(value);
        var completions = [];
        var fragment;
        var commandPrefix = "";
        if (match) {
          commandPrefix = match[1];
          fragment = match[3];
          var slash = fragment.lastIndexOf("/");
          var parent = slash < 0 ? "" : fragment.slice(0, slash + 1);
          var partial = fragment.slice(slash + 1);
          var directory = resolvePath(parent || ".");
          var prefix = directory ? directory + "/" : "";
          var candidates = [...dirs].filter(Boolean).map(function (dir) { return { path: dir, directory: true }; });
          if (match[2] !== "cd") candidates = candidates.concat(files);
          completions = candidates.filter(function (item) {
            if (!item.path.startsWith(prefix)) return false;
            var child = item.path.slice(prefix.length);
            return child.indexOf("/") === -1 && child.startsWith(partial);
          }).map(function (item) {
            return parent + item.path.slice(prefix.length) + (item.directory ? "/" : "");
          }).sort();
        } else if (/^\w*$/.test(value)) {
          fragment = value;
          completions = ["cat", "cd", "clear", "exit", "help", "ls", "nano", "pwd"].filter(function (command) { return command.startsWith(fragment); });
        } else return;
        if (!completions.length) return;
        var common = completions.reduce(function (shared, completion) {
          while (!completion.startsWith(shared)) shared = shared.slice(0, -1);
          return shared;
        });
        if (completions.length === 1 || common.length > fragment.length) {
          terminalInput.value = commandPrefix + common;
        } else output(completions.join("  "));
      }
    });
    document.querySelectorAll("[data-nano-close]").forEach(function (button) { button.addEventListener("click", function () { closeNano(true); }); });
    nano.addEventListener("keydown", function (event) {
      if (event.ctrlKey && event.key.toLowerCase() === "x") { event.preventDefault(); closeNano(true); }
    });
  }
})();
