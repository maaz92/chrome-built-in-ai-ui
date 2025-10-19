const fs = require("fs");
const path = require("path");
const { Parser } = require("htmlparser2");

const COMPONENT_DIR = path.join(__dirname, "..", "sidepanel", "components");

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

function validateHtml(fragment) {
  const errors = [];
  const stack = [];

  const parser = new Parser(
    {
      onopentag(name) {
        // ignore void elements
        if (!VOID_ELEMENTS.has(name)) stack.push(name);
      },
      onclosetag(name) {
        console.log(name);
        if (!VOID_ELEMENTS.has(name) && stack.length === 0) {
          errors.push(`Closing tag </${name}> without matching open tag`);
          return;
        }
        const top = stack.pop();
        if (!VOID_ELEMENTS.has(name) && top !== name) {
          errors.push(`Mismatched closing tag </${name}>; expected </${top}>`);
        }
      },
      onend() {
        if (stack.length) {
          errors.push(`Unclosed tags: ${stack.join(", ")}`);
        }
      },
    },
    { decodeEntities: true }
  );

  parser.write(fragment);
  parser.end();
  return errors;
}

function findTemplates(content) {
  // captures template literals like this.innerHTML = `...`
  const re = /(?:this\.innerHTML|innerHTML)\s*=\s*`([\s\S]*?)`/g;
  const matches = [];
  let m;
  while ((m = re.exec(content))) {
    matches.push({ html: m[1], index: m.index });
  }
  return matches;
}

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  let anyErrors = false;
  files.forEach((f) => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      scanDir(full);
      return;
    }
    if (!f.endsWith(".js")) return;
    const content = fs.readFileSync(full, "utf8");
    const templates = findTemplates(content);
    templates.forEach((t, i) => {
      const errors = validateHtml(t.html);
      if (errors.length) {
        anyErrors = true;
        console.log(`\nFile: ${full} (template #${i + 1})`);
        errors.forEach((e) => console.log("  - " + e));
      }
    });
  });
  if (!anyErrors) {
    console.log("No template HTML tag errors found in", COMPONENT_DIR);
    process.exit(0);
  } else {
    process.exit(1);
  }
}

scanDir(COMPONENT_DIR);
