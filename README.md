# Web Development Project 6 - What's Cooking

Submitted by: **Teresa Nguyen**

This web app: **A React recipe dashboard built on TheMealDB. Part 2 adds a shared sidebar, React Router navigation with a unique detail page for every meal, and two Recharts visualizations (meals by cuisine/category and an ingredient-count histogram) that update live with the search and filters.**

Time spent: **X** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
    - Full-size photo, ingredient list with measurements and ingredient images, step-by-step instructions, tags, ingredient and step counts, YouTube video and original recipe links, and "More meals in this category"
  - The same sidebar is displayed in detail view as in dashboard view
    - The sidebar lives in a shared `Layout` route that wraps every page with `<Outlet />`
- [x] **Each detail view of an item has a direct, unique URL link to that item's detail view page**
  - Every meal lives at `/meal/:id` (e.g. `/meal/52772`); `MealDetail` reads the id with `useParams()` and fetches `lookup.php?i={id}`, so the link works when opened directly or refreshed
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset
    - **Where the meals come from**: horizontal bar chart of meals per cuisine (or per category), with the long tail folded into an "other" bar
    - **How many ingredients?**: histogram of how many ingredients each recipe needs, annotated with the average

## Optional Features

The following **optional** features are implemented:

- [x] The site's customized dashboard contains more content that explains what is interesting about the data
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
    - A "What the data says" summary computed from the filtered meals (median ingredient count, simplest and most involved recipe)
    - One-click filter suggestions ("Desserts only", "Japanese cuisine", …)
    - A one-line takeaway under each chart and an "avg" annotation on the histogram
    - An "About the data" page explaining the dataset and how to read the charts
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations
    - "Hide charts / Show charts" button, plus a Cuisine / Category toggle on the first chart

## Additional Features

* [x] "Surprise me" button in the sidebar opens a random meal's detail page
* [x] Filters are kept when you go to a detail page and come back to the dashboard
* [x] Charts, stat cards, and the summary all update with the current search and filters
* [x] Custom chart tooltips and an "active" highlight on the current sidebar link
* [x] Loading, error, and "meal not found" states on the detail page, plus a 404 page for unknown URLs
* [x] Responsive layout: the sidebar becomes a top bar and the charts stack on phone-sized screens
* [x] Carried over from Part 1: name search, category and cuisine dropdowns that combine, three summary stats, and a "Clear filters" button

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

GIF created with [Kap](https://getkap.co/) for macOS

## Notes

* Routing uses `BrowserRouter`, so a static host needs a rewrite rule that serves `index.html` for every path (on Render: Redirects/Rewrites → Source `/*`, Destination `/index.html`, Action `Rewrite`). Without it, opening `/meal/52772` directly returns a 404.
* The dashboard list comes from `search.php` (one request per letter), which already includes ingredients and instructions. The detail page still fetches `lookup.php?i={id}` so a shared link works before the dashboard data has loaded.

## License

    Copyright 2026 Teresa Nguyen

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
