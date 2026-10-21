# Web Development Project 6 - *What's Cooking?*

Submitted by: **Teresa Nguyen**

This web app: **A React recipe dashboard built on TheMealDB. You can search and filter a few hundred meals by name, category, and cuisine, see charts and stats that update with your filters, and click any meal to open its own detail page with the full ingredient list, step-by-step instructions, and video link.**

Time spent: **6** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
    - Full-size photo, ingredient and step counts, tags, ingredient list with measurements and pictures, numbered instructions, YouTube and original recipe links, and "More meals in this category"
  - The same sidebar is displayed in detail view as in dashboard view
    - The sidebar is part of a shared `Layout` route that wraps every page with `<Outlet />`
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  - Every meal has its own URL at `/meal/:id` (e.g. `/meal/52772`). `MealDetail` reads the id with `useParams()` and fetches `lookup.php?i={id}`, so the link works when opened directly or refreshed
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset
    - **Where the meals come from**: bar chart of how many meals each cuisine (or category) has
    - **How many ingredients?**: histogram of how many ingredients each recipe needs, with a line marking the average


The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
    - "What the data says" summary with the median ingredient count and links to the simplest and most involved recipes
    - One-click filter suggestions (Desserts only, Japanese cuisine, Vegetarian meals, Anything with "curry")
    - A one-line takeaway under each chart and an "avg" annotation on the histogram
    - An "About the data" page that explains the dataset and how to read the charts
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 
    - "Hide charts / Show charts" button above the charts
    - Cuisine / Category toggle on the first chart

  
The following **additional** features are implemented:

* [x] Charts, stat cards, and the summary all update live with the current search and filters
* [x] "Surprise me" button in the sidebar opens a random meal's detail page
* [x] Filters are kept when you open a detail page and come back to the dashboard
* [x] Active page is highlighted in the sidebar
* [x] Custom chart tooltips with the exact count when you hover a bar
* [x] Smaller cuisines are grouped into one "other" bar, and meals with no cuisine get their own "Not listed" bar
* [x] Loading, error, and "meal not found" states on the detail page, plus a 404 page for unknown URLs
* [x] Responsive layout: the sidebar becomes a top bar and the charts stack on phone-sized screens
* [x] Carried over from Part 1: name search, category and cuisine dropdowns that work together, three summary stats, and a "Clear filters" button

## Video Walkthrough

Here's a walkthrough of implemented user stories:

https://i.imgur.com/TNDqfoM.gif

GIF created with [Kap](https://getkap.co/) for macOS

## Notes

* Routing uses `BrowserRouter`, so a static host needs a rewrite rule that serves `index.html` for every path (on Render: Redirects/Rewrites → Source `/*`, Destination `/index.html`, Action `Rewrite`). Without it, opening `/meal/52772` directly returns a 404.
* Some meals in TheMealDB have no cuisine (`strArea` is `null`). At first the "Most common cuisine" card showed the word "null", because counting with a plain object turns a `null` key into the string `"null"`. Those meals are now left out of the cuisine stat, shown as a separate "Not listed" bar in the chart, and labeled "Unknown" in the list.
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
