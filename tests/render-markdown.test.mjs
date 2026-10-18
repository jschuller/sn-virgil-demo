import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import { renderMarkdown } from '../src/client/services/renderMarkdown.js';

const purifier = createDOMPurify(new JSDOM('').window);
const render = (content) => renderMarkdown(content, purifier);

test('strips script-bearing HTML from model output', () => {
  const html = render('Hello <img src=x onerror="alert(1)"> <script>alert(2)</script> <a href="javascript:alert(3)">x</a>');
  assert.doesNotMatch(html, /onerror|<script|javascript:/i);
  assert.match(html, /<img src="x">/);
});

test('keeps markdown formatting', () => {
  const html = render('**bold** and `code`\n\n- item');
  assert.match(html, /<strong>bold<\/strong>/);
  assert.match(html, /<code>code<\/code>/);
  assert.match(html, /<li>item<\/li>/);
});

test('turns mermaid fences into mermaid blocks', () => {
  const html = render('```mermaid\ngraph TD\n  A-->B\n```');
  assert.match(html, /<pre class="mermaid">graph TD\n {2}A--&gt;B\n<\/pre>/);
});

test('handles empty content', () => {
  assert.equal(render(''), '');
  assert.equal(render(undefined), '');
});
