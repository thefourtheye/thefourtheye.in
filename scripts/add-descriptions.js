const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, '..', 'content', 'posts');

function extractDescription(content, title) {
  // Remove HTML tags and get first meaningful paragraph
  const text = content
    .replace(/<[^>]+>/g, ' ')  // Remove HTML tags
    .replace(/\s+/g, ' ')       // Normalize whitespace
    .trim();

  // Get first 150-200 characters as description
  const firstSentence = text.split(/[.!?]/).filter(s => s.trim().length > 20)[0];
  if (firstSentence && firstSentence.length > 30) {
    let desc = firstSentence.trim();
    if (desc.length > 200) {
      desc = desc.substring(0, 197) + '...';
    }
    return desc;
  }

  // Fallback to first 200 chars of content
  if (text.length > 30) {
    let desc = text.substring(0, 200).trim();
    if (text.length > 200) desc += '...';
    return desc;
  }

  return title;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if it's HTML or Markdown
  const ext = path.extname(filePath);
  const isMarkdown = ext === '.md';
  const isOrg = ext === '.org';

  let frontmatter = {};
  let body = content;
  let title = '';

  if (isMarkdown || !isOrg) {
    // Parse YAML frontmatter
    if (content.startsWith('---')) {
      const endIdx = content.indexOf('---', 3);
      if (endIdx !== -1) {
        const fmStr = content.substring(3, endIdx).trim();
        body = content.substring(endIdx + 3);

        // Parse frontmatter lines
        fmStr.split('\n').forEach(line => {
          const match = line.match(/^(\w+):\s*(.*)$/);
          if (match) {
            frontmatter[match[1]] = match[2].replace(/^["']|["']$/g, '').trim();
          }
        });

        title = frontmatter.title || '';
      }
    }
  } else if (isOrg) {
    // Parse Org-mode frontmatter
    const lines = content.split('\n');
    let inFm = false;
    let fmLines = [];

    for (const line of lines) {
      if (line.startsWith('#+')) {
        inFm = true;
        fmLines.push(line);
      } else if (inFm && line.trim() === '') {
        break;
      } else if (inFm) {
        fmLines.push(line);
      }
    }

    fmLines.forEach(line => {
      const match = line.match(/^#\+(\w+):\s*(.*)$/);
      if (match) {
        if (match[1] === 'TITLE') title = match[2].trim();
      }
    });

    body = content;
  }

  if (!title) {
    // Try to get title from filename
    const basename = path.basename(filePath, ext);
    title = basename.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  // Extract description from body
  const description = extractDescription(body, title);

  // Reconstruct content with description added
  let newContent;

  if (isMarkdown || !isOrg) {
    if (content.startsWith('---')) {
      const endIdx = content.indexOf('---', 3);
      const fmEnd = content.substring(3, endIdx).trim();

      // Check if description already exists
      if (!fmEnd.includes('description:')) {
        // Add description after title in frontmatter
        const lines = fmEnd.split('\n');
        const titleIdx = lines.findIndex(l => l.startsWith('title:'));
        if (titleIdx !== -1) {
          lines.splice(titleIdx + 1, 0, `description: "${description}"`);
        }

        newContent = '---\n' + lines.join('\n') + '\n---' + content.substring(endIdx + 3);
      } else {
        // Description already exists, skip
        return false;
      }
    }
  } else if (isOrg) {
    // For org files, add DESCRIPTION after TITLE
    if (!content.includes('#+DESCRIPTION:')) {
      newContent = content.replace(/(#\+TITLE:[^\n]*\n)/, `$1#+DESCRIPTION: ${description}\n`);
    } else {
      return false;
    }
  }

  if (newContent && newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    return true;
  }

  return false;
}

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walkDir(filePath, callback);
    } else {
      callback(filePath);
    }
  });
}

let count = 0;
walkDir(postsDir, filePath => {
  const ext = path.extname(filePath);
  if (['.html', '.md', '.org'].includes(ext)) {
    try {
      if (processFile(filePath)) {
        count++;
        console.log(`Updated: ${path.relative(postsDir, filePath)}`);
      }
    } catch (e) {
      console.error(`Error processing ${filePath}: ${e.message}`);
    }
  }
});

console.log(`\nTotal files updated: ${count}`);