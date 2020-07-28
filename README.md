# **Be**rkeley **G**ateway to **In**novation (**BEGIN**)

[![Netlify Status](https://api.netlify.com/api/v1/badges/fd23ba04-2e53-4410-bb9d-0e8fc3391a27/deploy-status)](https://app.netlify.com/sites/confident-shaw-66a094/deploys)


## About BEGIN:
The University of California, Berkeley offers entrepreneurs an unparalleled education, top research centers and faculty, and the opportunity to be part of the innovative culture in the San Francisco Bay Area and Silicon Valley.

The Berkeley innovation & entrepreneurship ecosystem is both vast and nuanced, and the fragmented nature of information about it makes it difficult for students, faculty, researchers, entrepreneurs, and investors to make the most of what's available.

The Berkeley Gateway to Innovation (BEGIN) is the portal to the I&E ecosystem at UC Berkeley. Our goal is assist in navigating visitors to the most relevant resources, opportunities, and more for the stage they're at in their entrepreneurial journey.

---

## Why BEGIN 2.0?
While the mission of BEGIN holds strong, the first iteration of the site had a number of issues:
1. Poor UX. The overall design and interactivity of the site were heavily constrained by WordPress's styling capabilities.
2. Poor content collection. We were using WordPress Automatic to pull in Facebook events and RSS feeds, but this was prone to error, mostly unconfigurable, and impossible to format and style well.
3. Poor load times. A lot of software bloat resulting from using WordPress plugins (custom development on WP is just not feasible sometimes).
3. Poor extensibility. Adding new features was incredibly difficult due to the WordPress tech stack (PHP 🤮).

For BEGIN 2.0, then, our goals are to make the site **responsive**, **interactive** (featuring a new roadmap section!), **efficient** at fetching and serving content, and **extensible** for future development.

To do this, we're building BEGIN 2.0 on the ✨*J a m s t a c k* ✨. We're using a headless CMS (Netlify CMS) and a static site generator (Gatsby), along with a CI pipeline and hosting from Netlify.

This way, extending BEGIN becomes much more developer-friendly with the access to the React and Node ecosystems offered by Gatsby and Netlify. Simultaneusly, content creation remains user-friendly and accessible thanks to Netlify CMS.

And, of course, we experience the benefits in loading time, SEO, and content versioning enabled by Jamstack practices.

---

## Tech Specs

### Technologies in Use
* [Netlify](https://github.com/netlify/cli)
* [Netlify Functions](https://github.com/netlify/functions) (Node)
* [Netlify Identity](https://github.com/netlify/netlify-identity-widget)
* [Netlify CMS](https://github.com/netlify/netlify-cms)
* [Gatsby](https://github.com/gatsbyjs/gatsby) (React)
* [Github API](https://github.com/github-tools/github)

### Development Roadmap
- [ ] [Implement data sourcing pipelines](https://github.com/akirillo/begin_2.0-jamstack/issues?q=is%3Aissue+is%3Aopen+label%3A%22data+sourcing%22)
- [ ] [Integrate Netlify CMS](https://github.com/akirillo/begin_2.0-jamstack/issues/8)
- [ ] [Design pages](https://github.com/akirillo/begin_2.0-jamstack/issues?q=is%3Aissue+is%3Aopen+label%3Apages)

### Setup Instructions
`WIP`

### Docs/Resources
`WIP`

---

## Giving Credit Where Credit is Due

This is a fork of https://github.com/sw-yx/jamstack-hackathon-starter which shows how to use Netlify Identity and Netlify Functions (via [Netlify Dev](https://www.netlify.com/products/dev/)) with Gatsby. Start here for your next JAMstack hackathon or use this as a reference implementation.
