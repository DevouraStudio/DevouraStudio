const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SAMPLE = process.argv.includes('--sample');

let sharp = null;
try {
  sharp = require('sharp');
} catch (err) {
  sharp = null;
}
let simpleIcons = null;
try {
  simpleIcons = require('simple-icons');
} catch (err) {
  simpleIcons = null;
}

// ---------------------------------------------------------------- CONFIG
const CONFIG = {
  user: process.env.GH_USER || 'DevouraStudio',
  name: 'Devoura Studio',
  role: 'Full-Stack Web Development',
  location: 'Tehran, IR',
  status: 'Designing, Developing, Deploying',
  website: 'www.devoura.ir',
  email: 'linkedinmiran@gmail.com',
  welcome: 'Welcome To Devoura Studio!',
  logo: 'assets/icons/logo',
  featured: {
    title: 'Yelpcamp',
    badge: 'Flagship',
    screenLabel: 'Yelpcamp - PREVIEW',
    image: 'assets/projects/Yelpcamp',
    tagline: 'A Campground Discovery Web Application',
    description:
      'A full-stack campground discovery and review application where users can browse campgrounds, view photo galleries and interactive maps, search listings, leave star-rated reviews, and manage their own listings. Built with Node.js, Express, and MongoDB.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Node.js', 'Express.js', 'MongoDB', 'ejs', '...'],
    demo: 'https://devoura.ir/yelpcamp',
    repo: 'https://github.com/DevouraStudio/Yelpcamp'
  },
  // A stack item is a plain name, or an object: { name, icon: 'simple-icons-slug', logo: 'assets/icons/x.svg', text: 'AB' }
  stack: [
    { name: 'HTML5', icon: 'HTML', logo: 'assets/icons/HTML.svg', text: 'HTML' },
    { name: 'CSS3', icon: 'CSS', logo: 'assets/icons/CSS.svg', text: 'CSS' },
    { name: 'Bootstrap', icon: 'Bootstrap', logo: 'assets/icons/Bootstrap.svg', text: 'B' },
    { name: 'Express.js', icon: 'Express.js', logo: 'assets/icons/Express.js.svg', text: 'EX' },
    { name: 'REST API', text: '{}' },
    { name: 'SQL', icon: 'SQL', logo: 'assets/icons/SQL.svg', text: 'SQL' },
    { name: 'PostgreSQL', icon: 'PostgreSQL', logo: 'assets/icons/PostgreSQL.svg', text: 'PSQL' },
    { name: 'Git', icon: 'Git', logo: 'assets/icons/Git.svg', text: 'GIT' },
    { name: 'GitHub', icon: 'GitHub', logo: 'assets/icons/GitHub.svg', text: 'GH' },
    { name: 'Bash', icon: 'Bash', logo: 'assets/icons/Bash.svg', text: 'BASH' },
    { name: 'Claude', icon: 'Claude', logo: 'assets/icons/Claude.svg', text: 'Claude' },
    { name: 'ChatGPT', icon: 'ChatGPT', logo: 'assets/icons/ChatGPT.svg', text: 'GPT' },
    { name: 'JavaScript', icon: 'JavaScript', logo: 'assets/icons/JavaScript.svg', text: 'JS' },
    { name: 'React.js', icon: 'React.js', logo: 'assets/icons/React.js.svg', text: 'REACT' },
    { name: 'Node.js', icon: 'Node.js', logo: 'assets/icons/Node.js.svg', text: 'NODE' },
    { name: 'MongoDB', icon: 'MongoDB', logo: 'assets/icons/MongoDB.svg', text: 'MONGO' },
    { name: 'Wordpress', icon: 'Wordpress', logo: 'assets/icons/Wordpress.svg', text: 'WP' },
    { name: 'Elementor', icon: 'Elementor', logo: 'assets/icons/Elementor.svg', text: 'ELEMENTOR' },
    { name: 'Figma', icon: 'Figma', logo: 'assets/icons/Figma.svg', text: 'FIGMA' }
  ],
  projects: [
    { slug: 'SimpleOmeletteRecipe', title: 'Simple Omelette Recipe', tag: 'Recipe Landing Page', url: 'https://devoura.ir/simple-omelette-recipe/' },
    { slug: 'FAQAccordion', title: 'FAQ Accordion', tag: 'FAQ Accordion', url: 'https://devoura.ir/faq-accordion/' },
    { slug: 'BlogPreviewCard', title: 'Blog Preview Card', tag: 'Blog Preview Card', url: 'https://devoura.ir/blog-preview-card/' },
    { slug: 'ProductReviewCard', title: 'Product Review Card', tag: 'e-Commerce Product Card', url: 'https://devoura.ir/product-review/' },
    { slug: 'SummaryResults', title: 'Summary Results', tag: 'Summary Component', url: 'https://devoura.ir/summary-results/' },
    { slug: 'PingPongScoreKeeper', title: 'Ping Pong Score Keeper', tag: 'Score Keeper', url: 'https://devoura.ir/ping-pong-score-keeper/' },
    { slug: 'TipCalculatorApp', title: 'Tip Calculator App', tag: 'Tip Calculator', url: 'https://devoura.ir/tip-calculator-app/' },
    { slug: 'IntroSection', title: 'Intro Section', tag: 'Website Landing Page', url: 'https://devoura.ir/intro-section' },
    { slug: 'Yelpcamp', title: 'Yelpcamp', tag: 'Full-Stack Yelp Web Application', url: 'https://devoura.ir/yelpcamp' },
    { slug: 'ReactCoreConcepts', title: 'React Core Concepts', tag: 'React - React Essetials Landing Page', url: 'https://devoura.ir/react-core-concepts/' },
    { slug: 'ReactTicTacToe', title: 'React Tic Tac Toe', tag: 'React - 2 Player Tic-Tac-Toe Game', url: 'https://devoura.ir/react-tic-tac-toe/' },
    { slug: 'ReactInvestmentCalculator', title: 'React Investment Calculator', tag: 'React - Investment Calculator', url: 'https://devoura.ir/react-investment-calculator/' },
    { slug: 'ReactFinalCountdown', title: 'React Final Countdown', tag: 'React - Countdown Timer Game', url: 'https://devoura.ir/react-final-countdown/' },
    { slug: 'ReactTodoList', title: 'React Todo List', tag: 'React - Todo List Web Application', url: 'https://devoura.ir/react-todo-list/' },
    { slug: 'ReactQuiz', title: 'React Quiz', tag: 'React - A Tiny Quiz Web Application', url: 'https://devoura.ir/react-quiz/' },
    { slug: 'ComingSoon', title: 'Coming Soon...', tag: 'Coming Soon...', url: '#' }
  ]
};

const G = '#50BD49';
const D = '#002913';
const W = 820;

// ---------------------------------------------------------------- HELPERS
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function trunc(text, max) {
  const s = String(text);
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '...';
}

function wrap(text, max) {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = (cur + ' ' + w).trim();
    if (next.length > max && cur.length > 0) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur.length > 0) lines.push(cur);
  return lines;
}

// deterministic pseudo-random number in [0, 1)
function rnd(a, b) {
  const v = Math.sin(a * 12.9898 + b * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

function open(w, h, extraStyle) {
  const extra = extraStyle || '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
<defs>
<style>
text{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace}
.fade{opacity:0;animation:fade .7s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes fade{to{opacity:1}}
.fade-up{opacity:0;animation:fade-up .7s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes fade-up{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:translateY(0)}}
.blink{animation:blink 1.4s steps(1) infinite}
@keyframes blink{50%{opacity:.25}}
.float{animation:float 6s ease-in-out infinite}
@keyframes float{50%{transform:translateY(-5px)}}
.metric-card{transform-box:fill-box;transform-origin:center;transition:transform .28s ease,filter .28s ease}
.metric-card:hover{transform:translateY(-4px);filter:url(#glow)}
.metric-card .metric-outline{transition:stroke-opacity .28s ease,stroke-width .28s ease}
.metric-card:hover .metric-outline{stroke-opacity:.95;stroke-width:2}
.project-card{opacity:0;animation:fade .65s ease forwards;transform-box:fill-box;transform-origin:center;transition:transform .25s ease,filter .25s ease}
.project-card:hover{transform:translateY(-3px);filter:url(#glow)}
@keyframes breathe{0%,100%{opacity:.72}50%{opacity:1}}
.metric-accent{animation:breathe 4.5s ease-in-out infinite}
@media (prefers-reduced-motion:reduce){.fade,.fade-up{opacity:1;animation:none}.blink,.float,.metric-accent{animation:none}.metric-card,.project-card{transition:none}.metric-card:hover,.project-card:hover{transform:none;filter:none}}
${extra}
</style>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${G}" stop-opacity=".16"/><stop offset=".6" stop-color="${G}" stop-opacity=".03"/><stop offset="1" stop-color="${G}" stop-opacity=".08"/></linearGradient>
<linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${G}" stop-opacity=".8"/><stop offset=".5" stop-color="${G}" stop-opacity=".25"/><stop offset="1" stop-color="${G}" stop-opacity=".6"/></linearGradient>
<filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>
`;
}

function frame(w, h) {
  return `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="16" fill="${D}"/>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="16" fill="url(#bg)" stroke="url(#edge)" stroke-width="1.5"/>\n`;
}

// inset panel: solid dark base with a faint green outline
function panel(x, y, w, h, r) {
  const rad = r || 10;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${D}" stroke="${G}" stroke-opacity=".3"/>`;
}

function heading(title, sub) {
  return `<text x="34" y="46" font-size="22" font-weight="700" fill="${G}" filter="url(#glow)">${esc(title)}</text>
<text x="34" y="68" font-size="12" fill="${G}" fill-opacity=".7">${esc(sub)}</text>\n`;
}

function write(file, content) {
  const full = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content);
}

// ---------------------------------------------------------------- IMAGES
// SVG files shown through <img> cannot load other files, so images are embedded as data URIs.
function findImage(baseRel, withSvg) {
  const exts = ['.png', '.jpg', '.jpeg', '.webp'];
  if (withSvg) exts.push('.svg');
  for (const e of exts) {
    if (fs.existsSync(path.join(ROOT, baseRel + e))) return baseRel + e;
  }
  return null;
}

// opts: { width, height, fit: 'cover' | 'inside', position, format: 'jpeg' | 'png' }
async function embedImage(rel, opts) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) return null;
  const ext = path.extname(full).toLowerCase();
  if (ext === '.svg') {
    return 'data:image/svg+xml;base64,' + fs.readFileSync(full).toString('base64');
  }
  if (sharp) {
    try {
      const pipe = sharp(full).resize({
        width: opts.width,
        height: opts.height,
        fit: opts.fit,
        position: opts.position,
        withoutEnlargement: opts.fit === 'inside'
      });
      if (opts.format === 'png') {
        const png = await pipe.png({ compressionLevel: 9 }).toBuffer();
        return 'data:image/png;base64,' + png.toString('base64');
      }
      const jpg = await pipe.flatten({ background: D }).jpeg({ quality: 80 }).toBuffer();
      return 'data:image/jpeg;base64,' + jpg.toString('base64');
    } catch (err) {
      console.warn('Could not process ' + rel + ': ' + err.message);
      return null;
    }
  }
  const buf = fs.readFileSync(full);
  if (buf.length > 300 * 1024) {
    console.warn('Skipped ' + rel + ' (over 300 KB). Run "npm install" so sharp can shrink it.');
    return null;
  }
  let mime = 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') mime = 'image/jpeg';
  if (ext === '.webp') mime = 'image/webp';
  return 'data:' + mime + ';base64,' + buf.toString('base64');
}

// ---------------------------------------------------------------- ICONS
const BUILTIN_ICONS = {
  database:
    'M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4zM4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4S4 11.21 4 9zm0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z'
};

// stack name (lowercase) -> simple-icons slug, or 'builtin:<key>'
const ICON_ALIASES = {
  'html5': 'html5',
  'html': 'html5',
  'css3': 'css',
  'css': 'css',
  'bootstrap': 'bootstrap',
  'express.js': 'express',
  'express': 'express',
  'sql': 'builtin:database',
  'postgresql': 'postgresql',
  'git': 'git',
  'github': 'github',
  'bash': 'gnubash',
  'claude': 'claude',
  'javascript': 'javascript',
  'react.js': 'react',
  'react': 'react',
  'node.js': 'nodedotjs',
  'mongodb': 'mongodb',
  'wordpress': 'wordpress',
  'elementor': 'elementor',
  'figma': 'figma'
};

let SLUG_MAP = null;
function iconPathBySlug(slug) {
  if (!simpleIcons || !slug) return null;
  if (!SLUG_MAP) {
    SLUG_MAP = {};
    for (const key of Object.keys(simpleIcons)) {
      const ic = simpleIcons[key];
      if (ic && ic.slug && ic.path) SLUG_MAP[ic.slug] = ic.path;
    }
  }
  return SLUG_MAP[slug] || null;
}

// returns { kind: 'path' | 'image' | 'text', value }
async function resolveIcon(item) {
  if (item.logo) {
    const uri = await embedImage(item.logo, { width: 96, height: 96, fit: 'inside', format: 'png' });
    if (uri) return { kind: 'image', value: uri };
  }
  let slug = item.icon;
  if (!slug) slug = ICON_ALIASES[item.name.toLowerCase()];
  if (slug && slug.indexOf('builtin:') === 0) {
    const d = BUILTIN_ICONS[slug.slice(8)];
    if (d) return { kind: 'path', value: d };
  }
  const p = iconPathBySlug(slug);
  if (p) return { kind: 'path', value: p };
  let text = item.text;
  if (!text) text = item.name.slice(0, 2);
  return { kind: 'text', value: text };
}

// ---------------------------------------------------------------- DATA
function sampleDays() {
  // Sample data is used only by the explicit --sample command.
  const days = [];
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const start = today.getTime() - (today.getUTCDay() + 52 * 7) * 86400000;
  let i = 0;
  for (let t = start; t <= today.getTime(); t += 86400000) {
    const d = new Date(t);
    const v = rnd(i, 3);
    let count = v > 0.35 ? Math.floor(v * 6) : 0;
    if (d.getUTCDay() === 0 || d.getUTCDay() === 6) count = Math.floor(count / 2);
    days.push({ date: d.toISOString().slice(0, 10), count, weekday: d.getUTCDay() });
    i++;
  }
  return days;
}

async function githubJson(url, headers) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`GitHub API ${response.status} for ${url}: ${detail.slice(0, 240)}`);
  }
  return response.json();
}

async function fetchAllRepositories(headers) {
  const all = [];
  let url = `https://api.github.com/users/${encodeURIComponent(CONFIG.user)}/repos?per_page=100&type=owner&sort=updated`;
  while (url) {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`Repository request failed (${response.status})`);
    const page = await response.json();
    if (!Array.isArray(page)) throw new Error('GitHub returned an invalid repository list');
    all.push(...page);
    const link = response.headers.get('link') || '';
    const next = link.split(',').find((part) => part.includes('rel="next"'));
    url = next ? next.match(/<([^>]+)>/)[1] : null;
  }
  return all;
}

// Count commits authored by this GitHub user on each owned repository's
// default branch. per_page=1 lets GitHub's pagination metadata provide the
// total without downloading every commit.
async function countAuthoredCommits(repo, headers) {
  const url = `https://api.github.com/repos/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}/commits?author=${encodeURIComponent(CONFIG.user)}&per_page=1`;
  const response = await fetch(url, { headers });
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    throw new Error(`Commit count request failed for ${repo.full_name} (${response.status}): ${detail.slice(0, 180)}`);
  }
  const commits = await response.json();
  if (!Array.isArray(commits)) throw new Error(`GitHub returned an invalid commit list for ${repo.full_name}`);
  const link = response.headers.get('link') || '';
  const last = link.match(/<([^>]+)>;\s*rel="last"/);
  if (last) {
    const page = new URL(last[1]).searchParams.get('page');
    return page ? Number(page) : commits.length;
  }
  return commits.length;
}

async function fetchData() {
  if (SAMPLE) {
    const days = sampleDays();
    return {
      commits: 200, contributions: days.reduce((sum, day) => sum + day.count, 0),
      repos: 18, followers: 41,
      languages: [
        { name: 'JavaScript', pct: 71.65 }, { name: 'HTML', pct: 9.00 },
        { name: 'CSS', pct: 14.33 }, { name: 'EJS', pct: 5.03 }
      ],
      days, activeDays: days.filter((day) => day.count > 0).length
    };
  }

  // Do not publish fabricated statistics. A user PAT is required for the
  // contribution calendar GraphQL query; configure it as PROFILE_TOKEN.
  const token = process.env.PROFILE_TOKEN || process.env.GH_TOKEN;
  if (!token) throw new Error('Missing PROFILE_TOKEN secret. Create a GitHub token with read:user access and add it to repository Actions secrets.');

  const headers = {
    'User-Agent': 'DevouraStudio-Profile-README',
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28'
  };

  const user = await githubJson(`https://api.github.com/users/${encodeURIComponent(CONFIG.user)}`, headers);
  const repositories = await fetchAllRepositories(headers);
  const publicRepositories = repositories.filter((repo) => !repo.private);
  const ownedRepos = publicRepositories.filter((repo) => !repo.fork);
  const totalCommits = (await Promise.all(
    ownedRepos.map((repo) => countAuthoredCommits(repo, headers))
  )).reduce((sum, count) => sum + count, 0);

  // GitHub's language endpoint returns bytes of code per language. Summing
  // these values is materially more accurate than counting repository primaries.
  const languageTotals = Object.create(null);
  await Promise.all(ownedRepos.map(async (repo) => {
    const languageUrl = repo.languages_url;
    if (!languageUrl) return;
    const languageBytes = await githubJson(languageUrl, headers);
    for (const [language, bytes] of Object.entries(languageBytes)) {
      languageTotals[language] = (languageTotals[language] || 0) + Number(bytes || 0);
    }
  }));
  const totalLanguageBytes = Object.values(languageTotals).reduce((sum, bytes) => sum + bytes, 0);
  const languages = Object.entries(languageTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, bytes]) => ({ name, pct: Number(((bytes / totalLanguageBytes) * 100).toFixed(2)) }));
  if (!languages.length || !Number.isFinite(totalLanguageBytes) || totalLanguageBytes <= 0) {
    throw new Error('GitHub did not return language byte statistics for the account repositories.');
  }

  const query = `query($login:String!){user(login:$login){contributionsCollection(from:"${new Date(Date.now() - 365 * 86400000).toISOString()}",to:"${new Date().toISOString()}"){contributionCalendar{totalContributions weeks{contributionDays{contributionCount date weekday}}}}}}`;
  const gqlResponse = await fetch('https://api.github.com/graphql', {
    method: 'POST', headers,
    body: JSON.stringify({ query, variables: { login: CONFIG.user } })
  });
  if (!gqlResponse.ok) throw new Error(`GitHub contribution query failed (${gqlResponse.status})`);
  const gql = await gqlResponse.json();
  if (gql.errors && gql.errors.length) throw new Error(`GitHub contribution query: ${gql.errors.map((e) => e.message).join('; ')}`);
  const calendar = gql.data && gql.data.user && gql.data.user.contributionsCollection && gql.data.user.contributionsCollection.contributionCalendar;
  if (!calendar || !Array.isArray(calendar.weeks)) throw new Error('GitHub returned no contribution calendar. Check PROFILE_TOKEN permissions.');
  const days = calendar.weeks.flatMap((week) => week.contributionDays.map((day) => ({
    date: day.date, count: day.contributionCount, weekday: day.weekday
  })));

  return {
    commits: totalCommits,
    contributions: calendar.totalContributions,
    repos: user.public_repos,
    followers: user.followers,
    languages,
    days,
    activeDays: days.filter((day) => day.count > 0).length
  };
}

// ---------------------------------------------------------------- CARDS
// Colors: only G (#50BD49) and D (#002913). Tints come from opacity.

function titleBar(w, label) {
  return `<rect x="1" y="1" width="${w - 2}" height="34" rx="16" fill="${G}" fill-opacity=".08"/>
<rect x="1" y="20" width="${w - 2}" height="15" fill="${D}"/>
<rect x="1" y="20" width="${w - 2}" height="15" fill="${G}" fill-opacity=".08"/>
<circle cx="28" cy="18" r="5" fill="${G}" fill-opacity=".35"/><circle cx="46" cy="18" r="5" fill="${G}" fill-opacity=".6"/><circle cx="64" cy="18" r="5" fill="${G}"/>
<text x="${w / 2}" y="22" font-size="10" fill="${G}" fill-opacity=".65" text-anchor="middle">${esc(label)}</text>
<text x="${w - 34}" y="22" font-size="10" fill="${G}" text-anchor="end">LIVE</text>
<circle cx="${w - 24}" cy="18" r="3" fill="${G}" class="blink"/>\n`;
}

async function header(data) {
  const h = 340;
  const rows = [
    ['Subject', CONFIG.name],
    ['Handle', '@' + CONFIG.user],
    ['Role', CONFIG.role],
    ['Status', CONFIG.status],
    ['Languages', data.languages.slice(0, 4).map((l) => l.name).join(', ')],
    ['Repositories', String(data.repos)],
    ['Contributions', String(data.contributions)],
    ['Total Commits', String(data.commits)],
    ['Followers', String(data.followers)],
    ['Active Days', String(data.activeDays)],
    ['Contact', CONFIG.website]
  ];
  let rowsSvg = '';
  rows.forEach((row, i) => {
    const y = 124 + i * 17;
    rowsSvg += `<g class="fade" style="animation-delay:${(0.5 + i * 0.12).toFixed(2)}s"><text x="404" y="${y}" font-size="11" fill="${G}" fill-opacity=".6">${esc(row[0])}</text><text x="510" y="${y}" font-size="11" fill="${G}">${esc(row[1])}</text></g>\n`;
  });

  // logo panel (left)
  const cx = 200;
  const cy = 197;
  let logoSvg = '';
  const logoRel = findImage(CONFIG.logo, true);
  let logoUri = null;
  if (logoRel) {
    logoUri = await embedImage(logoRel, { width: 320, height: 320, fit: 'inside', format: 'png' });
  }
  if (logoUri) {
    logoSvg = `<image href="${logoUri}" x="${cx - 72}" y="${cy - 72}" width="144" height="144" preserveAspectRatio="xMidYMid meet"/>`;
  } else {
    logoSvg = `<text x="${cx}" y="${cy + 26}" font-size="80" font-weight="700" fill="${G}" text-anchor="middle" filter="url(#glow)">${esc(CONFIG.name.slice(0, 1))}</text>`;
  }
  const logoPanel = `<text x="46" y="102" font-size="10" fill="${G}" fill-opacity=".7">IDENTITY</text>
<circle cx="${cx}" cy="${cy}" r="86" fill="${G}" fill-opacity=".05"/>
<circle cx="${cx}" cy="${cy}" r="98" fill="none" stroke="${G}" stroke-opacity=".3"><animate attributeName="r" values="94;102;94" dur="4s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values=".15;.5;.15" dur="4s" repeatCount="indefinite"/></circle>
<circle cx="${cx}" cy="${cy}" r="108" fill="none" stroke="${G}" stroke-opacity=".65" stroke-dasharray="3 9"><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="40s" repeatCount="indefinite"/></circle>
<circle cx="${cx}" cy="${cy}" r="90" fill="none" stroke="${G}" stroke-opacity=".5" stroke-dasharray="40 20 6 20"><animateTransform attributeName="transform" type="rotate" from="360 ${cx} ${cy}" to="0 ${cx} ${cy}" dur="26s" repeatCount="indefinite"/></circle>
${logoSvg}`;

  return (
    open(W, h) +
    frame(W, h) +
    titleBar(W, CONFIG.user.toLowerCase() + ' - profile-scan') +
    `<text x="34" y="66" font-size="13"><tspan fill="${G}" fill-opacity=".65">${esc(CONFIG.user.toLowerCase())}@github:~$ </tspan><tspan fill="${G}">./DevouraStudio ${SAMPLE ? '--sample' : '--live'}</tspan><tspan fill="${G}" class="blink"> _</tspan></text>
${panel(30, 82, 340, 230)}
${panel(390, 82, 400, 230)}
${logoPanel}
<text x="404" y="102" font-size="10" fill="${G}" fill-opacity=".7">SYSTEM STATS</text>
${rowsSvg}<rect x="2" y="-40" width="${W - 4}" height="40" fill="${G}" opacity=".07"><animateTransform attributeName="transform" type="translate" from="0 0" to="0 ${h + 40}" dur="5s" repeatCount="indefinite"/></rect>
</svg>
`
  );
}

// Full-width animated "signal map": spectrum bars, sweeping glow, waves, scanner and pings.
function signalMap() {
  const h = 250;
  const N = 64;
  const x0 = 34;
  const span = W - 68;
  const stepX = span / N;
  const bw = 7;
  const cy = 150;
  const maxH = 116;
  const K = 7;
  const splines = [];
  for (let k = 0; k < K - 1; k++) splines.push('.45 0 .25 1');

  let bars = '';
  for (let i = 0; i < N; i++) {
    const env = Math.pow(Math.sin((Math.PI * (i + 0.5)) / N), 0.8);
    const base = 0.25 + 0.75 * env;
    const hs = [];
    for (let k = 0; k < K - 1; k++) {
      hs.push(8 + base * maxH * (0.12 + 0.88 * rnd(i + 1, k + 1)));
    }
    hs.push(hs[0]);
    const hv = hs.map((v) => v.toFixed(1)).join(';');
    const yv = hs.map((v) => (cy - v / 2).toFixed(1)).join(';');
    const dur = 1.4 + (i % 9) * 0.17;
    const begin = -(rnd(i, 99) * dur);
    const x = x0 + i * stepX + (stepX - bw) / 2;
    const common = `dur="${dur.toFixed(2)}s" begin="${begin.toFixed(2)}s" repeatCount="indefinite" calcMode="spline" keyTimes="0;.17;.33;.5;.67;.83;1" keySplines="${splines.join(';')}"`;
    bars += `<rect x="${x.toFixed(2)}" y="${(cy - hs[0] / 2).toFixed(1)}" width="${bw}" height="${hs[0].toFixed(1)}" rx="3.5" fill="url(#sweep)"><animate attributeName="height" values="${hv}" ${common}/><animate attributeName="y" values="${yv}" ${common}/></rect>`;
  }

  function wavePath(amp, lambda, phase) {
    let d = '';
    for (let x = x0; x <= W - 34; x += 12) {
      const y = cy + amp * Math.sin((2 * Math.PI * (x - x0)) / lambda + phase);
      if (x === x0) {
        d += 'M' + x + ' ' + y.toFixed(1);
      } else {
        d += 'L' + x + ' ' + y.toFixed(1);
      }
    }
    return d;
  }
  function waveValues(amp, lambda, dir) {
    const list = [];
    for (let k = 0; k <= 8; k++) list.push(wavePath(amp, lambda, (dir * k * 2 * Math.PI) / 8));
    return list.join(';');
  }
  const wave1 = `<path d="${wavePath(36, 260, 0)}" fill="none" stroke="${G}" stroke-width="2.2" filter="url(#glow)"><animate attributeName="d" values="${waveValues(36, 260, 1)}" dur="6s" repeatCount="indefinite"/></path>`;
  const wave2 = `<path d="${wavePath(22, 150, 0)}" fill="none" stroke="${G}" stroke-opacity=".6" stroke-width="1.4"><animate attributeName="d" values="${waveValues(22, 150, -1)}" dur="5s" repeatCount="indefinite"/></path>`;

  let grid = '';
  [90, 120, 180, 210].forEach((y) => {
    grid += `<line x1="${x0}" y1="${y}" x2="${W - 34}" y2="${y}" stroke="${G}" stroke-opacity=".1" stroke-dasharray="2 6"/>`;
  });
  grid += `<line x1="${x0}" y1="${cy}" x2="${W - 34}" y2="${cy}" stroke="${G}" stroke-opacity=".3"/>`;

  let axis = '';
  ['0', '25', '50', '75', '100'].forEach((t, i) => {
    const ax = x0 + (span * i) / 4;
    let anchor = 'middle';
    if (i === 0) anchor = 'start';
    if (i === 4) anchor = 'end';
    axis += `<text x="${ax}" y="232" font-size="8.5" fill="${G}" fill-opacity=".5" text-anchor="${anchor}">${t} MHz</text>`;
  });

  let pings = '';
  [120, 290, 430, 600, 710].forEach((px, i) => {
    const b = (i * 0.6).toFixed(1);
    pings += `<circle cx="${px}" cy="${cy}" r="3" fill="${G}" filter="url(#glow)"><animate attributeName="opacity" values="1;.3;1" dur="1.8s" begin="${b}s" repeatCount="indefinite"/></circle>
<circle cx="${px}" cy="${cy}" r="3" fill="none" stroke="${G}" stroke-width="1.5"><animate attributeName="r" values="3;24" dur="3s" begin="${b}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="3s" begin="${b}s" repeatCount="indefinite"/></circle>`;
  });

  let readouts = '';
  for (let j = 0; j < 4; j++) {
    const vals = [];
    for (let i = 0; i < 4; i++) {
      if (i === j) {
        vals.push('1');
      } else {
        vals.push('0');
      }
    }
    readouts += `<text x="${W - 34}" y="46" font-size="12" fill="${G}" text-anchor="end" opacity="0">SIG ${96 + j}%  SNR ${58 + j * 3}dB<animate attributeName="opacity" values="${vals.join(';')}" calcMode="discrete" dur="4.8s" repeatCount="indefinite"/></text>`;
  }

  return (
    open(W, h) +
    `<defs>
<linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="${x0}" y1="0" x2="${x0 + 250}" y2="0" spreadMethod="repeat"><stop offset="0" stop-color="${G}" stop-opacity=".3"/><stop offset=".5" stop-color="${G}" stop-opacity="1"/><stop offset="1" stop-color="${G}" stop-opacity=".3"/><animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="250 0" dur="3.2s" repeatCount="indefinite"/></linearGradient>
<linearGradient id="trail" x1="0" x2="1"><stop offset="0" stop-color="${G}" stop-opacity="0"/><stop offset="1" stop-color="${G}" stop-opacity=".25"/></linearGradient>
</defs>
` +
    frame(W, h) +
    heading('Signal Map', 'Real-time activity feed') +
    readouts +
    `<circle cx="${W - 24}" cy="30" r="3" fill="${G}" class="blink"/>
${grid}
<g filter="url(#glow)" opacity=".95">${bars}</g>
${wave1}
${wave2}
${pings}
<g transform="translate(${x0} 0)"><g><animateTransform attributeName="transform" type="translate" values="0 0;${span} 0;${span} 0" keyTimes="0;.85;1" dur="4.5s" repeatCount="indefinite"/><rect x="-60" y="84" width="60" height="132" fill="url(#trail)"/><rect x="-1" y="84" width="2" height="132" fill="${G}" filter="url(#glow)"/></g></g>
${axis}
</svg>
`
  );
}

function welcome() {
  const text = CONFIG.welcome;
  const n = text.length;
  const cw = 12;
  const x0 = (W - n * cw) / 2;
  const vals = [];
  const xs = [];
  for (let k = 0; k <= n; k++) {
    vals.push(k * cw);
    xs.push((x0 + k * cw).toFixed(1));
  }
  const dur = (n * 0.09).toFixed(2);
  return (
    open(W, 60) +
    `<clipPath id="t"><rect x="${x0}" y="10" width="0" height="34"><animate attributeName="width" values="${vals.join(';')}" calcMode="discrete" dur="${dur}s" begin="0.4s" fill="freeze"/></rect></clipPath>
<text x="${x0}" y="38" font-size="20" font-weight="700" fill="${G}" textLength="${n * cw}" lengthAdjust="spacing" clip-path="url(#t)" filter="url(#glow)">${esc(text)}</text>
<rect y="20" width="9" height="20" fill="${G}" class="blink"><animate attributeName="x" values="${xs.join(';')}" calcMode="discrete" dur="${dur}s" begin="0.4s" fill="freeze"/></rect>
</svg>
`
  );
}

function divider() {
  return (
    open(W, 16) +
    `<defs><linearGradient id="d" x1="0" x2="1"><stop offset="0" stop-color="${G}" stop-opacity="0"/><stop offset=".5" stop-color="${G}" stop-opacity=".8"/><stop offset="1" stop-color="${G}" stop-opacity="0"/></linearGradient></defs>
<rect x="20" y="7" width="${W - 40}" height="2" fill="url(#d)"/>
<circle cy="8" r="3.5" fill="${G}" filter="url(#glow)"><animate attributeName="cx" values="60;${W - 60};60" dur="6s" repeatCount="indefinite"/></circle>
</svg>
`
  );
}

function signal(data) {
  const h = 200;
  const items = [
    { label: 'Total Commits', value: data.commits, target: Math.max(data.commits, 1) },
    { label: 'Contributions', value: data.contributions, target: Math.max(data.contributions, 1) },
    { label: 'Public Repos', value: data.repos, target: Math.max(data.repos, 1) },
    { label: 'Followers', value: data.followers, target: Math.max(data.followers, 1) }
  ];
  const gap = 16;
  const cw = (W - 68 - gap * 3) / 4;
  let cards = '';
  items.forEach((it, i) => {
    const x = 34 + i * (cw + gap);
    const pct = Math.max(0.06, Math.min(1, it.value / it.target));
    const barW = cw - 36;
    cards += `<g class="fade metric-card" style="animation-delay:${(0.2 + i * 0.12).toFixed(2)}s">
${panel(x, 84, cw, 92, 12)}
<rect class="metric-outline" x="${x}" y="84" width="${cw}" height="92" rx="12" fill="none" stroke="${G}" stroke-opacity=".3"/>
<text x="${x + 18}" y="106" font-size="11" fill="${G}" fill-opacity=".7">${it.label}</text>
<text x="${x + 18}" y="144" font-size="34" font-weight="700" fill="${G}" filter="url(#glow)">${it.value}</text>
<rect x="${x + 18}" y="158" width="${barW}" height="4" rx="2" fill="${G}" fill-opacity=".2"/>
<rect x="${x + 18}" y="158" width="0" height="4" rx="2" fill="${G}" class="metric-accent"><animate attributeName="width" from="0" to="${(barW * pct).toFixed(1)}" dur="1.2s" begin="0.6s" fill="freeze"/></rect>
</g>\n`;
  });
  return open(W, h) + frame(W, h) + heading('Profile Signal', SAMPLE ? 'SAMPLE DATA — NOT LIVE ACCOUNT STATISTICS' : 'Verified Devoura statistics') + cards + '</svg>\n';
}

async function featured() {
  const f = CONFIG.featured;
  const lines = wrap(f.description, 52);
  let desc = '';
  lines.forEach((l, i) => {
    desc += `<text x="372" y="${142 + i * 18}" font-size="12" fill="${G}" fill-opacity=".85">${esc(l)}</text>\n`;
  });

  // tags flow onto as many rows as they need
  let tags = '';
  const tagsTop = 142 + (lines.length - 1) * 18 + 18;
  const maxX = W - 34;
  let tx = 372;
  let ty = tagsTop;
  f.tags.forEach((t) => {
    const tw = t.length * 7 + 20;
    if (tx + tw > maxX) {
      tx = 372;
      ty += 28;
    }
    tags += `<rect x="${tx}" y="${ty}" width="${tw}" height="22" rx="11" fill="none" stroke="${G}" stroke-opacity=".6"/><text x="${tx + tw / 2}" y="${ty + 15}" font-size="10.5" fill="${G}" text-anchor="middle">${esc(t)}</text>\n`;
    tx += tw + 8;
  });
  const contentBottom = ty + 22;
  const h = Math.max(300, contentBottom + 34);
  const ph = h - 86 - 34;
  const badgeW = f.badge.length * 8 + 22;

  // screenshot box
  let shot = '';
  const imgRel = findImage(f.image);
  let uri = null;
  if (imgRel) {
    uri = await embedImage(imgRel, { width: 616, height: (ph - 2) * 2, fit: 'cover', position: 'top', format: 'jpeg' });
  }
  if (uri) {
    shot = `<clipPath id="pc"><rect x="35" y="87" width="308" height="${ph - 2}" rx="9"/></clipPath>
<image href="${uri}" x="35" y="87" width="308" height="${ph - 2}" preserveAspectRatio="xMidYMin slice" clip-path="url(#pc)"/>
<rect x="35" y="87" width="308" height="22" rx="9" fill="${D}" fill-opacity=".82"/>
<text x="48" y="102" font-size="9" fill="${G}" fill-opacity=".9">${esc(f.screenLabel)}</text>`;
  } else {
    shot = `<rect x="35" y="87" width="308" height="22" rx="9" fill="${G}" fill-opacity=".08"/>
<text x="48" y="102" font-size="9" fill="${G}" fill-opacity=".7">${esc(f.screenLabel)}</text>
<g transform="translate(189 ${86 + ph / 2 + 6})" filter="url(#glow)"><g class="float">
<polygon points="0,-46 40,-23 40,23 0,46 -40,23 -40,-23" fill="${G}" fill-opacity=".06" stroke="${G}" stroke-width="1.5"/>
<polyline points="-40,-23 0,0 40,-23" fill="none" stroke="${G}" stroke-width="1.5"/>
<line x1="0" y1="0" x2="0" y2="46" stroke="${G}" stroke-width="1.5"/>
<polygon points="0,-20 17,-10 17,10 0,20 -17,10 -17,-10" fill="none" stroke="${G}" stroke-opacity=".6"><animateTransform attributeName="transform" type="scale" values="1;1.25;1" dur="5s" repeatCount="indefinite"/></polygon>
</g></g>
<text x="48" y="${86 + ph - 12}" font-size="8.5" fill="${G}" fill-opacity=".6">ADD assets/featured.png</text>`;
  }

  return (
    open(W, h) +
    frame(W, h) +
    heading('Featured Work', f.tagline) +
    `${panel(34, 86, 310, ph)}
${shot}
<text x="372" y="114" font-size="20" font-weight="700" fill="${G}">${esc(f.title)}</text>
<rect x="${W - 34 - badgeW}" y="96" width="${badgeW}" height="24" rx="12" fill="${G}" fill-opacity=".14" stroke="${G}" stroke-opacity=".7"/>
<text x="${W - 34 - badgeW / 2}" y="112" font-size="11" fill="${G}" text-anchor="middle">${esc(f.badge)}</text>
${desc}${tags}</svg>
`
  );
}

// small clickable buttons, placed under the featured card in the README
function button(label, filled) {
  const w = 170;
  const h = 40;
  let rect = `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="10" fill="${D}" stroke="${G}" stroke-opacity=".85" stroke-width="1.5"/>`;
  let fill = G;
  if (filled) {
    rect = `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="10" fill="${G}"/>`;
    fill = D;
  }
  return (
    open(w, h) +
    `${rect}
<text x="${w / 2}" y="25" font-size="12" font-weight="700" fill="${fill}" text-anchor="middle">${esc(label)}</text>
</svg>
`
  );
}

function projectsHead() {
  const h = 88;
  return (
    open(W, h) +
    frame(W, h) +
    heading('Projects', 'A Collection Of Digital Products & Experiences') +
    `<text x="${W - 34}" y="46" font-size="12" fill="${G}" fill-opacity=".8" text-anchor="end">${CONFIG.projects.length} entries</text>
</svg>
`
  );
}

async function projectCard(p, i) {
  const w = 200;
  const h = 158;
  const imgX = 8;
  const imgY = 8;
  const imgW = 184;
  const imgH = 104;
  const imgRel = findImage('assets/projects/' + p.slug);
  let uri = null;
  if (imgRel) {
    uri = await embedImage(imgRel, { width: imgW * 2, height: imgH * 2, fit: 'cover', position: 'top', format: 'jpeg' });
  }
  let shot = '';
  if (uri) {
    shot = `<image href="${uri}" x="${imgX}" y="${imgY}" width="${imgW}" height="${imgH}" preserveAspectRatio="xMidYMin slice" clip-path="url(#ic)"/>`;
  } else {
    shot = `<rect x="${imgX}" y="${imgY}" width="${imgW}" height="${imgH}" rx="6" fill="${G}" fill-opacity=".06" stroke="${G}" stroke-opacity=".35" stroke-dasharray="4 4"/>
<rect x="24" y="35" width="70" height="6" rx="3" fill="${G}" fill-opacity=".7"/>
<rect x="24" y="47" width="120" height="3" rx="1.5" fill="${G}" fill-opacity=".35"/>
<rect x="24" y="55" width="96" height="3" rx="1.5" fill="${G}" fill-opacity=".25"/>
<text x="${imgX + imgW / 2}" y="92" font-size="10" fill="${G}" fill-opacity=".8" text-anchor="middle">${esc(trunc(p.tag, 24).toUpperCase())}</text>`;
  }
  const num = String(i + 1).padStart(2, '0');
  let live = '';
  if (p.url && p.url !== '#') {
    live = `<rect x="${imgX + imgW - 48}" y="14" width="42" height="15" rx="7.5" fill="${D}" fill-opacity=".82" stroke="${G}" stroke-opacity=".6"/>
<circle cx="${imgX + imgW - 38}" cy="21.5" r="2.5" fill="${G}"/>
<text x="${imgX + imgW - 31}" y="25" font-size="8" fill="${G}">LIVE</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
<defs><style>text{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,"Liberation Mono",monospace}@keyframes fade{to{opacity:1}}.project-card{opacity:0;animation:fade .65s ease forwards;transform-box:fill-box;transform-origin:center;transition:transform .25s ease,filter .25s ease}.project-card:hover{transform:translateY(-3px);filter:drop-shadow(0 4px 7px #50BD4966)}@media(prefers-reduced-motion:reduce){.project-card{transition:none}.project-card:hover{transform:none;filter:none}}</style>
<clipPath id="ic"><rect x="${imgX}" y="${imgY}" width="${imgW}" height="${imgH}" rx="6"/></clipPath>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${G}" stop-opacity=".16"/><stop offset="1" stop-color="${G}" stop-opacity=".03"/></linearGradient></defs>
<g class="project-card">\n<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="12" fill="${D}"/>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="12" fill="url(#g)" stroke="${G}" stroke-opacity=".6" stroke-width="1.5"/>
${shot}
<rect x="${imgX}" y="${imgY}" width="${imgW}" height="${imgH}" rx="6" fill="none" stroke="${G}" stroke-opacity=".35"/>
<rect x="14" y="14" width="26" height="15" rx="7.5" fill="${D}" fill-opacity=".82" stroke="${G}" stroke-opacity=".6"/>
<text x="27" y="25" font-size="8.5" font-weight="700" fill="${G}" text-anchor="middle">${num}</text>
${live}
<text x="14" y="131" font-size="10.5" font-weight="700" fill="${G}">${esc(trunc(p.title, 25))}</text>
<text x="14" y="146" font-size="9" fill="${G}" fill-opacity=".7">${esc(trunc(p.tag, 30))}</text>
</g>
</svg>
`;
}

function languages(data) {
  const rows = data.languages;
  const h = 100 + rows.length * 34;
  const barX = 180;
  const barW = W - 34 - barX - 60;
  const shades = [1, 0.8, 0.62, 0.46, 0.34];
  let out = `<text x="${W - 34}" y="46" font-size="12" fill="${G}" fill-opacity=".7" text-anchor="end">&gt; Percentage(%100)</text>\n`;
  rows.forEach((l, i) => {
    const y = 96 + i * 34;
    const op = shades[i % shades.length];
    out += `<g class="fade" style="animation-delay:${(0.2 + i * 0.1).toFixed(2)}s">
<circle cx="44" cy="${y - 4}" r="4" fill="${G}" fill-opacity="${op}"/>
<text x="58" y="${y}" font-size="13" font-weight="700" fill="${G}">${esc(l.name)}</text>
<rect x="${barX}" y="${y - 10}" width="${barW}" height="8" rx="4" fill="${G}" fill-opacity=".15"/>
<rect x="${barX}" y="${y - 10}" width="0" height="8" rx="4" fill="${G}" fill-opacity="${op}"><animate attributeName="width" from="0" to="${((barW * l.pct) / 100).toFixed(1)}" dur="1.1s" begin="0.5s" fill="freeze"/></rect>
<text x="${W - 34}" y="${y}" font-size="12" fill="${G}" fill-opacity=".8" text-anchor="end">${l.pct}%</text>
</g>\n`;
  });
  return open(W, h) + frame(W, h) + heading('Most Used Languages', SAMPLE ? 'SAMPLE DATA — NOT LIVE' : "What's Cooking in My Codebase?") + out + '</svg>\n';
}

async function stack() {
  const items = CONFIG.stack.map((s) => {
    if (typeof s === 'string') return { name: s };
    return s;
  });
  const cols = 5;
  const gap = 12;
  const tw = (W - 68 - gap * (cols - 1)) / cols;
  const all = items.concat([{ name: '__more' }]);
  const rowsN = Math.ceil(all.length / cols);
  const h = 96 + rowsN * 82 + 8;
  let out = '';
  for (let i = 0; i < all.length; i++) {
    const item = all[i];
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = 34 + col * (tw + gap);
    const y = 86 + row * 82;
    const cx = x + tw / 2;
    const delay = (0.1 + i * 0.04).toFixed(2);
    if (item.name === '__more') {
      out += `<g class="fade" style="animation-delay:${delay}s"><rect x="${x}" y="${y}" width="${tw}" height="70" rx="10" fill="none" stroke="${G}" stroke-opacity=".5" stroke-dasharray="4 4"/>
<text x="${cx}" y="${y + 40}" font-size="10.5" fill="${G}" fill-opacity=".8" text-anchor="middle">That's it :)</text></g>\n`;
      continue;
    }
    const icon = await resolveIcon(item);
    let glyph = '';
    if (icon.kind === 'path') {
      glyph = `<path d="${icon.value}" transform="translate(${(cx - 11).toFixed(1)} ${y + 17}) scale(${(22 / 24).toFixed(4)})" fill="${G}"/>`;
    } else if (icon.kind === 'image') {
      glyph = `<image href="${icon.value}" x="${(cx - 12).toFixed(1)}" y="${y + 16}" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>`;
    } else {
      glyph = `<text x="${cx}" y="${y + 32}" font-size="11" font-weight="700" fill="${G}" text-anchor="middle">${esc(icon.value)}</text>`;
    }
    out += `<g class="fade" style="animation-delay:${delay}s">
${panel(x, y, tw, 70)}
<circle cx="${cx}" cy="${y + 28}" r="18" fill="${G}" fill-opacity=".1" stroke="${G}" stroke-opacity=".6"/>
${glyph}
<text x="${cx}" y="${y + 61}" font-size="10" fill="${G}" fill-opacity=".85" text-anchor="middle">${esc(item.name)}</text>
</g>\n`;
  }
  return open(W, h) + frame(W, h) + heading('Stack', 'Everyday tools: The full kit behind every moment') + out + '</svg>\n';
}

// Real contribution calendar: month labels, weekday labels, shimmer sweep, pulsing "today" cell.
function heatmap(data) {
  const h = 226;
  const days = data.days;
  const gx = 64;
  const gy = 106;
  const step = (W - 34 - gx) / 53;
  const size = step - 2.8;
  const opac = [0.1, 0.3, 0.5, 0.75, 1];
  let max = 1;
  days.forEach((d) => {
    if (d.count > max) max = d.count;
  });

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  let cells = '';
  let clip = '';
  let months = '';
  let col = 0;
  let lastMonth = -1;
  let lastLabelCol = -10;
  let lastX = 0;
  let lastY = 0;
  days.forEach((d, i) => {
    if (i > 0 && d.weekday === 0) col++;
    const x = gx + col * step;
    const y = gy + d.weekday * step;
    let lvl = 0;
    if (d.count > 0) lvl = Math.min(4, Math.ceil((d.count / max) * 4));
    cells += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${size.toFixed(1)}" height="${size.toFixed(1)}" rx="2.5" fill="${G}" fill-opacity="${opac[lvl]}"/>`;
    clip += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${size.toFixed(1)}" height="${size.toFixed(1)}" rx="2.5"/>`;
    const month = parseInt(d.date.slice(5, 7), 10) - 1;
    if (d.weekday === 0 || i === 0) {
      if (month !== lastMonth && col - lastLabelCol >= 3) {
        months += `<text x="${x.toFixed(1)}" y="${gy - 8}" font-size="9" fill="${G}" fill-opacity=".7">${monthNames[month]}</text>`;
        lastLabelCol = col;
        lastMonth = month;
      }
    }
    lastX = x;
    lastY = y;
  });

  let weekdays = '';
  [['Mon', 1], ['Wed', 3], ['Fri', 5]].forEach((wd) => {
    weekdays += `<text x="34" y="${(gy + wd[1] * step + size - 1).toFixed(1)}" font-size="9" fill="${G}" fill-opacity=".6">${wd[0]}</text>`;
  });

  let legend = `<text x="${W - 34 - 5 * 14 - 62}" y="64" font-size="10" fill="${G}" fill-opacity=".7" text-anchor="end">Less</text>`;
  opac.forEach((o, i) => {
    legend += `<rect x="${W - 34 - 5 * 14 - 52 + i * 14}" y="55" width="11" height="11" rx="2.5" fill="${G}" fill-opacity="${o}"/>`;
  });
  legend += `<text x="${W - 34 - 40}" y="64" font-size="10" fill="${G}" fill-opacity=".7">More</text>`;

  const sweepFrom = gx - 160;
  const sweepTo = W - 34;
  return (
    open(W, h) +
    `<defs>
<clipPath id="cc">${clip}</clipPath>
<linearGradient id="band" x1="0" x2="1"><stop offset="0" stop-color="${G}" stop-opacity="0"/><stop offset=".5" stop-color="${G}" stop-opacity=".75"/><stop offset="1" stop-color="${G}" stop-opacity="0"/></linearGradient>
</defs>
` +
    frame(W, h) +
    heading('Contribution Activity', (SAMPLE ? 'SAMPLE — ' : '') + data.contributions + ' contributions in the last year') +
    legend +
    months +
    weekdays +
    `<g class="fade" style="animation-delay:.3s">${cells}</g>
<g clip-path="url(#cc)"><rect x="0" y="${gy - 4}" width="160" height="${(7 * step + 8).toFixed(1)}" fill="url(#band)"><animateTransform attributeName="transform" type="translate" values="${sweepFrom} 0;${sweepTo} 0;${sweepTo} 0" keyTimes="0;.7;1" dur="6s" repeatCount="indefinite"/></rect></g>
<rect x="${(lastX - 1.5).toFixed(1)}" y="${(lastY - 1.5).toFixed(1)}" width="${(size + 3).toFixed(1)}" height="${(size + 3).toFixed(1)}" rx="3.5" fill="none" stroke="${G}" stroke-width="1.5"><animate attributeName="opacity" values="1;.15;1" dur="1.6s" repeatCount="indefinite"/></rect>
</svg>
`
  );
}

function contact() {
  const pills = [
    ['GitHub', '@' + CONFIG.user],
    ['Web', CONFIG.website]
  ];
  if (CONFIG.email) pills.push(['Email', CONFIG.email]);
  if (CONFIG.telegram) pills.push(['Telegram', CONFIG.telegram]);
  const pw = 230;
  const gap = 14;
  const total = pills.length * pw + (pills.length - 1) * gap;
  const x0 = (W - total) / 2;
  let out = '';
  pills.forEach((p, i) => {
    const x = x0 + i * (pw + gap);
    out += `<rect x="${x}" y="12" width="${pw}" height="42" rx="21" fill="${D}" stroke="${G}" stroke-opacity=".5"/>
<circle cx="${x + 22}" cy="33" r="11" fill="${G}" fill-opacity=".14" stroke="${G}" stroke-opacity=".7"/>
<circle cx="${x + 22}" cy="33" r="3" fill="${G}"/>
<text x="${x + 42}" y="29" font-size="9.5" fill="${G}" fill-opacity=".7">${esc(p[0])}</text>
<text x="${x + 42}" y="44" font-size="12" font-weight="700" fill="${G}">${esc(p[1])}</text>\n`;
  });
  return open(W, 66) + out + '</svg>\n';
}

const FONT = {
  A: ['.###.', '#...#', '#####', '#...#', '#...#'], B: ['####.', '#...#', '####.', '#...#', '####.'],
  C: ['.####', '#....', '#....', '#....', '.####'], D: ['####.', '#...#', '#...#', '#...#', '####.'],
  E: ['#####', '#....', '####.', '#....', '#####'], F: ['#####', '#....', '####.', '#....', '#....'],
  G: ['.####', '#....', '#..##', '#...#', '.###.'], H: ['#...#', '#...#', '#####', '#...#', '#...#'],
  I: ['#####', '..#..', '..#..', '..#..', '#####'], J: ['..###', '...#.', '...#.', '#..#.', '.##..'],
  K: ['#...#', '#..#.', '###..', '#..#.', '#...#'], L: ['#....', '#....', '#....', '#....', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#...#', '#...#'], N: ['#...#', '##..#', '#.#.#', '#..##', '#...#'],
  O: ['.###.', '#...#', '#...#', '#...#', '.###.'], P: ['####.', '#...#', '####.', '#....', '#....'],
  Q: ['.###.', '#...#', '#.#.#', '#..#.', '.##.#'], R: ['####.', '#...#', '####.', '#..#.', '#...#'],
  S: ['.####', '#....', '.###.', '....#', '####.'], T: ['#####', '..#..', '..#..', '..#..', '..#..'],
  U: ['#...#', '#...#', '#...#', '#...#', '.###.'], V: ['#...#', '#...#', '#...#', '.#.#.', '..#..'],
  W: ['#...#', '#...#', '#.#.#', '##.##', '#...#'], X: ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'],
  Y: ['#...#', '.#.#.', '..#..', '..#..', '..#..'], Z: ['#####', '...#.', '..#..', '.#...', '#####']
};

// discrete width keyframes that reveal `count` characters one by one, then clear at endT
function typedSpec(start, step, count, cw, T, endT) {
  const values = ['0'];
  const times = ['0'];
  for (let k = 0; k < count; k++) {
    values.push(((k + 1) * cw).toFixed(1));
    times.push(((start + k * step) / T).toFixed(4));
  }
  values.push('0');
  times.push((endT / T).toFixed(4));
  values.push('0');
  times.push('1');
  return { values: values.join(';'), times: times.join(';') };
}

// Footer: a terminal that types a command, prints the name in block letters, then types a status line. Loops.
function footer() {
  const name = CONFIG.user.toUpperCase().replace(/[^A-Z]/g, '');
  const n = name.length;
  const cell = Math.max(4, Math.min(10, Math.floor(740 / (n * 6))));
  const textW = n * 6 * cell - cell;
  const x0 = (W - textW) / 2;
  const letterH = 5 * cell - 1.5;
  const lettersY = 96;
  const line2Y = lettersY + 5 * cell + 32;
  const h = line2Y + 28;

  const cw = 7.2;
  const promptStr = CONFIG.user.toLowerCase() + '@github:~$ ';
  const cmd = 'cat Devoura.txt';
  const out2 = '> ' + CONFIG.status;
  const px0 = 34 + promptStr.length * cw;

  const stepC = 0.07;
  const stepL = 0.28;
  const stepC2 = 0.05;
  const tCmd0 = 0.8;
  const tLet0 = tCmd0 + cmd.length * stepC + 0.7;
  const tLine2 = tLet0 + (n - 1) * stepL + 0.7;
  const lastT = tLine2 + (out2.length - 1) * stepC2;
  const T = Math.max(12, lastT + 4.5);
  const endT = T - 0.8;

  // cursor keyframes
  const cmdGeo = { y: 55, w: 7, h: 14 };
  const letGeo = { y: lettersY, w: cell - 1.5, h: letterH };
  const frames = [];
  frames.push({ t: 0, x: px0, y: cmdGeo.y, w: cmdGeo.w, h: cmdGeo.h });
  for (let k = 1; k <= cmd.length; k++) {
    frames.push({ t: tCmd0 + (k - 1) * stepC, x: px0 + k * cw, y: cmdGeo.y, w: cmdGeo.w, h: cmdGeo.h });
  }
  frames.push({ t: tLet0 - 0.3, x: x0, y: letGeo.y, w: letGeo.w, h: letGeo.h });
  for (let li = 0; li < n; li++) {
    frames.push({ t: tLet0 + li * stepL, x: x0 + (li + 1) * 6 * cell, y: letGeo.y, w: letGeo.w, h: letGeo.h });
  }
  frames.push({ t: tLine2 - 0.3, x: 34, y: line2Y - 11, w: 7, h: 14 });
  for (let k = 1; k <= out2.length; k++) {
    frames.push({ t: tLine2 + (k - 1) * stepC2, x: 34 + k * cw, y: line2Y - 11, w: 7, h: 14 });
  }
  frames.push({ t: endT, x: px0, y: cmdGeo.y, w: cmdGeo.w, h: cmdGeo.h });
  const lastFrame = frames[frames.length - 1];
  frames.push({ t: T, x: lastFrame.x, y: lastFrame.y, w: lastFrame.w, h: lastFrame.h });
  const times = frames.map((f) => (f.t / T).toFixed(4)).join(';');
  function anim(attr, key) {
    return `<animate attributeName="${attr}" values="${frames.map((f) => f[key].toFixed(1)).join(';')}" keyTimes="${times}" calcMode="discrete" dur="${T.toFixed(2)}s" repeatCount="indefinite"/>`;
  }
  const cursor = `<rect x="${px0}" y="${cmdGeo.y}" width="${cmdGeo.w}" height="${cmdGeo.h}" fill="${G}" class="blink">${anim('x', 'x')}${anim('y', 'y')}${anim('width', 'w')}${anim('height', 'h')}</rect>`;

  const s1 = typedSpec(tCmd0, stepC, cmd.length, cw, T, endT);
  const s2 = typedSpec(tLine2, stepC2, out2.length, cw, T, endT);

  // block letters, each appears when the cursor passes it
  let px = '';
  for (let li = 0; li < n; li++) {
    const glyph = FONT[name[li]];
    if (!glyph) continue;
    let g = '';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (glyph[r][c] === '#') {
          g += `<rect x="${(x0 + (li * 6 + c) * cell).toFixed(1)}" y="${lettersY + r * cell}" width="${cell - 1.5}" height="${cell - 1.5}" rx="1.5" fill="${G}"/>`;
        }
      }
    }
    const a = ((tLet0 + li * stepL) / T).toFixed(4);
    px += `<g opacity="0" filter="url(#glow)"><animate attributeName="opacity" values="0;1;0;0" keyTimes="0;${a};${(endT / T).toFixed(4)};1" calcMode="discrete" dur="${T.toFixed(2)}s" repeatCount="indefinite"/>${g}</g>\n`;
  }

  return (
    open(W, h) +
    frame(W, h) +
    titleBar(W, CONFIG.user.toLowerCase() + ' - bash') +
    `<clipPath id="c1"><rect x="${px0}" y="50" width="0" height="22"><animate attributeName="width" values="${s1.values}" keyTimes="${s1.times}" calcMode="discrete" dur="${T.toFixed(2)}s" repeatCount="indefinite"/></rect></clipPath>
<clipPath id="c2"><rect x="34" y="${line2Y - 16}" width="0" height="22"><animate attributeName="width" values="${s2.values}" keyTimes="${s2.times}" calcMode="discrete" dur="${T.toFixed(2)}s" repeatCount="indefinite"/></rect></clipPath>
<text x="34" y="66" font-size="12" fill="${G}" fill-opacity=".65" textLength="${(promptStr.length * cw).toFixed(1)}" lengthAdjust="spacing" xml:space="preserve">${esc(promptStr)}</text>
<text x="${px0}" y="66" font-size="12" fill="${G}" textLength="${(cmd.length * cw).toFixed(1)}" lengthAdjust="spacing" clip-path="url(#c1)">${esc(cmd)}</text>
${px}<text x="34" y="${line2Y}" font-size="12" fill="${G}" fill-opacity=".85" textLength="${(out2.length * cw).toFixed(1)}" lengthAdjust="spacing" clip-path="url(#c2)" xml:space="preserve">${esc(out2)}</text>
${cursor}
</svg>
`
  );
}

// ---------------------------------------------------------------- README
function readme() {
  const f = CONFIG.featured;
  const img = (name, alt) => `<img src="assets/${name}.svg" width="100%" alt="${alt}"/>`;

  let buttons = '';
  if (f.demo) {
    buttons += `<a href="${f.demo}"><img src="assets/btn-demo.svg" height="40" alt="Live demo"/></a> `;
  }
  if (f.repo) {
    buttons += `<a href="${f.repo}"><img src="assets/btn-repo.svg" height="40" alt="GitHub"/></a>`;
  }

  let cards = '';
  for (const p of CONFIG.projects) {
    let tag = `<img src="assets/cards/${p.slug}.svg" width="196" alt="${esc(p.title)}"/>`;
    if (p.url && p.url !== '#') {
      tag = `<a href="${p.url}">${tag}</a>`;
    }
    cards += tag + '\n';
  }

  return `${SAMPLE ? '> **SAMPLE PREVIEW — statistics below are illustrative and are not live GitHub account data. Run the GitHub Actions workflow with a valid PROFILE_TOKEN to replace them.**\n\n' : ''}<div align="center">

${img('header', CONFIG.name + ' terminal header')}
${img('signalmap', 'Signal map')}
${img('welcome', CONFIG.welcome)}
${img('divider', '')}
${img('signal', 'Profile signal')}
${img('divider', '')}
${img('featured', 'Featured work')}

<br/>

${buttons}

<br/>

${img('divider', '')}
${img('projects-head', 'Projects')}

<br/>

${cards}
<br/>
${img('divider', '')}
${img('languages', 'Language stack')}
${img('stack', 'Stack')}
${img('heatmap', 'Contribution activity')}
${img('divider', '')}
${img('contact', 'Contact')}
${img('footer', 'Footer')}

</div>
`;
}

// ---------------------------------------------------------------- RUN
async function main() {
  const data = await fetchData();
  write('assets/header.svg', await header(data));
  write('assets/signalmap.svg', signalMap());
  write('assets/welcome.svg', welcome());
  write('assets/divider.svg', divider());
  write('assets/signal.svg', signal(data));
  write('assets/featured.svg', await featured());
  if (CONFIG.featured.demo) write('assets/btn-demo.svg', button('LIVE DEMO', true));
  if (CONFIG.featured.repo) write('assets/btn-repo.svg', button('GITHUB', false));
  write('assets/projects-head.svg', projectsHead());
  for (let i = 0; i < CONFIG.projects.length; i++) {
    const p = CONFIG.projects[i];
    write(`assets/cards/${p.slug}.svg`, await projectCard(p, i));
  }
  write('assets/languages.svg', languages(data));
  write('assets/stack.svg', await stack());
  write('assets/heatmap.svg', heatmap(data));
  write('assets/contact.svg', contact());
  write('assets/footer.svg', footer());
  write('README.md', readme());
  const mode = SAMPLE ? '(sample preview — not live account data)' : '(verified GitHub API data)';
  let notes = '';
  if (!sharp) notes += ' [sharp not installed]';
  if (!simpleIcons) notes += ' [simple-icons not installed]';
  console.log('Generated', mode + notes);
}

main().catch((error) => {
  console.error('Profile generation failed. Existing README/assets were not updated.');
  console.error(error.message);
  process.exitCode = 1;
});
