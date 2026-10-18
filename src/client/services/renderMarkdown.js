import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Chat content is untrusted: the model's answer is steered by the user's query and by
// instance data placed in its prompt (app names, finding text from the rule table).
// Parse it as markdown, then let only sanitized HTML reach the page.
export function renderMarkdown(content, purifier = DOMPurify) {
  const html = marked
    .parse(content || '', { async: false })
    .replace(
      /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
      '<pre class="mermaid">$1</pre>'
    );
  return purifier.sanitize(html);
}
