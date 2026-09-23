# Smart Dog Training School — Website

A completely rebuilt, modern marketing site for **Smart Dog Training School**, a family-run
dog training and boarding school serving Los Angeles County, CA since 1992.

## Stack

Vanilla HTML, CSS and JavaScript — no build step, no dependencies, no environment variables.
Open `index.html` in a browser or serve the folder with any static host.

```bash
python3 -m http.server 8000
```

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home — hero, stats, services overview, why-us, process, breeds, gallery preview, CTA |
| `about.html` | Story since 1992, approach, breeds, stats |
| `services.html` | Detailed breakdown of all five programs (anchored sections) |
| `gallery.html` | Photo gallery of dogs trained and boarded |
| `contact.html` | Contact details, enquiry form, next-steps timeline |

## Structure

```
.
├── index.html
├── about.html
├── services.html
├── gallery.html
├── contact.html
├── favicon.svg
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/styles.css
    └── js/main.js
```

## Features

- Responsive layout down to small phones (CSS grid + custom properties)
- Sticky header with accessible mobile menu and services dropdown
- Scroll-reveal animations and animated counters (both respect `prefers-reduced-motion`)
- Semantic HTML, skip link, ARIA labels, descriptive alt text on every image
- Meta tags, Open Graph / Twitter cards, `LocalBusiness` JSON-LD, sitemap and robots.txt
- Contact form with client-side validation that composes a prefilled email (no backend required)

## Business details used

- **Phone:** (661) 547-8165
- **Email:** steve.delarosa18@gmail.com
- **Location:** Los Angeles, CA — serving all of Los Angeles County
- **Services:** Dog Boarding, Puppy Training, On-Leash Dog Training, Advanced Off-Leash Training,
  Custom Dog Training Programs
- **Social:** [Facebook](https://www.facebook.com/p/Smart-Dog-Training-School-100063574960527/) ·
  [Yelp](https://www.yelp.com/biz/smart-dog-training-school-palmdale)

Photography is reused from the original Smart Dog Training School site.
