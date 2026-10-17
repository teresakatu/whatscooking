# Web Development Project 5 - *What's Cooking?*

Submitted by: **Teresa Nguyen**

This web app: **A React recipe dashboard that loads a few hundred meals from TheMealDB and lets you explore them with a live name search, category and cuisine dropdown filters, and summary statistics that update as you filter.**

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
    - Each row shows the meal's thumbnail, name, category, and cuisine
- [x] **`useEffect` React hook and `async`/`await` are used**
  - `App.jsx` fetches `search.php?f={letter}` for every letter a–z with `Promise.all`, plus the category and cuisine lists, inside an `async` function called from `useEffect`
- [x] **The app dashboard includes at least three summary statistics about the data**
  - The app dashboard includes at least three summary statistics about the data, such as:
    - Total number of meals currently shown
    - Most common cuisine (and how many meals it has)
    - Number of unique categories represented
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
  - Name search, category, and cuisine all combine in a single `.filter()` call
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
  - Text input for name search, dropdowns for category and cuisine
- [ ] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [x] Summary statistics are computed from the *filtered* list, so they update live with every search and filter change
* [x] "All" option in each dropdown and a "Clear filters" button that resets everything
* [x] Friendly "No meals match your filters" message when nothing matches
* [x] Loading message while data is fetched and an error message if any request fails
* [x] Dropdown options are loaded from the API (`list.php?c=list` and `list.php?a=list`) instead of being hard-coded
* [x] Responsive layout: stat cards and list rows stack on phone-sized screens

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

- TheMealDB has no "list all meals" endpoint, so the app requests meals by first letter (a–z) in parallel and merges the results. Letters with no meals return `{ "meals": null }`, which have to be skipped before combining.

## Running locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Project structure

```
src/
  App.jsx                 state, data fetching, combined filter logic
  App.css                 dashboard layout and component styles
  index.css               global styles and color variables
  main.jsx                mounts <App /> into index.html
  components/
    Header.jsx            app title
    StatsCards.jsx        computes and shows the three summary stats
    FilterBar.jsx         search input, category and cuisine dropdowns, clear button
    MealList.jsx          renders rows with .map(), or the "no matches" message
    MealRow.jsx           one meal: thumbnail, name, category, cuisine
```

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
