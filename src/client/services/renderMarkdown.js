import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Chat content is untrusted: the model's answer is steered by the user's query and by
// instance data placed in its prompt (app names, finding text from the rule table).
// Parse it as markdown, then let only sanitized HTML reach the page. Beyond scripts,
// forbid what injected output could still abuse inside the ServiceNow session: remote
// images (they load on render and can carry instance data out in the URL), forms and
// inputs (credential phishing), and styles (UI redress).
const SANITIZE_OPTIONS = {
  FORBID_TAGS: ['img', 'style', 'form', 'input', 'button', 'textarea', 'select'],
  FORBID_ATTR: ['style'],
};

export function renderMarkdown(content, purifier = DOMPurify) {
  const html = marked
    .parse(content || '', { async: false })
    .replace(
      /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
      '<pre class="mermaid">$1</pre>'
    );
  return purifier.sanitize(html, SANITIZE_OPTIONS);
}
