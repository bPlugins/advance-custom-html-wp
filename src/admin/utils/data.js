const slug = 'advance-custom-html';

export const dashboardInfo = (info) => {
  const { version, isPremium, hasPro, adminUrl = '', licenseActiveNonce } = info;

  const proSuffix = isPremium ? ' Pro' : '';

  return {
    name: `Advance Custom HTML${proSuffix}`,
    displayName: `Advance Custom HTML${proSuffix} -  Display Code Snippets with Syntax Highlighter`,
    description: "Advance Custom HTML lets you embed and display code snippets (HTML, CSS, JavaScript, PHP, Python, etc.) in WordPress posts, pages, or widgets. It features a live preview, syntax highlighting, and a customizable front-end editor with draggable panels and themes—perfect for tutorials, documentation, and technical content.",
    slug,
    version,
    isPremium,
    hasPro,
    adminUrl,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
      // proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}-pro.png`,
      // video: 'https://www.youtube.com/watch?v=milYZrqLJsE',
      // isYoutube: true
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      landing: `https://bplugins.com/products/${slug}/`,
      // docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`,
    },
    freemius: {
      product_id: 16894,
      plan_id: 28164,
      public_key: 'pk_e99f567863d84a62f963ac66aeb42',
    },
    licenseActiveNonce,
    changelogs: [
      {
        version: "2.1.1 - 5 July 2026",
        type: 'update',
        list: [
          "Update: Updated modern dashboard layout and style."
        ],
      },
      {
        version: "2.1.0 - 4 June 2026",
        type: 'new',
        list: [
          "New: Reorganized block settings with custom panel iconography.",
          "Update: Unlocked Word Wrap, Line Numbers, Title Bar, and Copy Button for free users.",
          "Update: Unlocked HTML, CSS, JavaScript syntaxes and basic editor color themes.",
          "Fix: Resolved icon layout and coloring style alignment conflicts in block sidebar."
        ],
      },
      {
        version: "2.0.4 - 23 February 2026",
        type: 'update',
        list: ["Redesigned the dashboard with a modern and improved user interface, replacing the previous outdated layout."],
      },
      {
        version: "2.0.3 - 2 December 2025",
        type: 'update',
        list: ["Updated and offers to plugins description."],
      },
      {
        version: "2.0.2 - 25 November 2025",
        type: 'update', 
        list: ["Update freemius sdk and little fixes."],
      },
      {
        version: "2.0.1 - 5 November 2025",
        type: 'update',
        list: ["Update free SDK"],
      },
      {
        version: "2.0.0, 15 September, 2025",
        type: 'update',
        list: ["Update Modern Dashboard and Fixed Issues"],
      },
    ],
    proFeatures: [
      "40+ editor themes",
      "Tab size, line wrapping, editor height / width",
      "Syntax mode per snippet: HTML, CSS, JS, PHP, Python, and more",
      "Copy button, Fold gutter, Highlight active line, etc",
      "Customize the Copy to Clipboard button",
      "Hide Headings or Labels",
      "Hide or Show Line numbers",
      "Enable or Disable Wrap",
      "Customize Code Editor / Snippet",
      "Fold Gutter to collapse code blocks",
      "Highlight Active Line"
    ],
    // startButton: {
    //   label: 'Start Now',
    //   url: `wp-admin/post-new.php?post_type=apb`
    // }
  }
}

export const demoInfo = {
  allInOneLabel: 'See All Demos',
  allInOneLink: "https://bblockswp.com/demo/advance-custom-html-all-demos/",
  demos: [
    {
      icon: "",
      title: "Created a Design",
      description: "Created a Table Using Advance Custom HTML",
      type: "iframe",
      url: "https://bblockswp.com/demo/advance-custom-html/",
    },
    {
      icon: "",
      title: "Code Snippets like GitHub",
      description: "Display code snippets in GitHub(Dark) theme",
      type: "iframe",
      url: "https://bblockswp.com/demo/display-code-snippets-in-githubdark/",
    },
    {
      icon: "",
      title: "Code Snippets with Heading & Copy Button",
      description: "Display code snippets with heading & copy button (Pro)",
      type: "iframe",
      url: "https://bblockswp.com/demo/display-code-snippets-with-heading-copy-button-pro/",
    },
    {
      icon: "",
      title: "Python Code Snippets with Copy Button",
      description: "Display some python code with copy button(Pro)",
      type: "iframe",
      url: "https://bblockswp.com/demo/display-some-python-code-snippets-with-copy-button-pro/",
    },
    {
      icon: "",
      title: "Snippets with Copy Button at Bottom Right Position",
      description:
        "Code snippets wit copy button text in Bottom Right position (Pro)",
      type: "iframe",
      url: "https://bblockswp.com/demo/code-snippets-with-heading-copy-button-text-in-bottom-right-position-pro/",
    },
  ]
}

export const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`, // Optional
  pluginId: 16894,
  planId: 28164,
  licenses: [
    1,
    3,
    null
  ],
  button: {
    label: 'Buy Now ➜'
  },
  featured: {
    selected: 3, // choose from licenses item
  }
}

export const gutenbergTabIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth={2} strokeLinecap='round' strokeLinejoin='round'>
    <rect x='3' y='3' width='7' height='7' rx='1' />
    <rect x='14' y='3' width='7' height='7' rx='1' />
    <rect x='3' y='14' width='7' height='7' rx='1' />
    <rect x='14' y='14' width='7' height='7' rx='1' />
  </svg>
);

export const welcomeInfo = (adminUrl) => ({
  keywords: ['Gutenberg Block', 'Code Snippets', 'Live Preview', 'Syntax Highlighting', 'Custom Themes', 'Front-end Editor'],
  keywordsLabel: 'Features',
  gettingStarted: {
    tabs: [
      {
        key: 'gutenberg',
        label: 'Gutenberg',
        icon: gutenbergTabIcon,
        steps: [
          {
            num: 1,
            title: 'Insert the Block',
            body: 'Click <strong>+</strong> in the Gutenberg editor and search for <strong>Advance Custom HTML</strong>.',
            link: { url: `${adminUrl}post-new.php`, label: 'Open Editor' }
          },
          {
            num: 2,
            title: 'Add Your Code',
            body: 'Write or paste your custom HTML, CSS, JavaScript, PHP, or other code snippets directly into the editor block.'
          },
          {
            num: 3,
            title: 'Live Preview & Customize',
            body: 'Adjust themes, toggle wrap, line numbers, and styling from the block settings panel, then click <strong>Publish</strong>.'
          }
        ]
      }
    ]
  }
});
