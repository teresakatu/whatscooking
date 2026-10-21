import { Link } from 'react-router-dom'
import Header from '../components/Header.jsx'

function About() {
  return (
    <>
      <Header
        badge="About the data"
        title="Reading the dashboard"
        subtitle="Where the recipes come from, and what to look for in the charts."
      />

      <main className="page">
        <section className="card prose">
          <h2>The dataset</h2>
          <p>
            Every recipe comes from <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">TheMealDB</a>,
            a free, crowd-sourced recipe database. The dashboard asks the API for every meal
            starting with each letter from A to Z, which gives a few hundred meals. Each one has a
            category (Beef, Dessert, Vegetarian…), a cuisine or “area” (Italian, Mexican,
            Japanese…), up to 20 ingredients with measurements, and written instructions.
          </p>
        </section>

        <section className="card prose">
          <h2>What the charts show</h2>
          <p>
            <strong>Where the meals come from</strong> counts meals by cuisine or by category.
            Use the toggle to switch views. If a few bars dwarf the rest, that tells you the
            database is not an even sample of world food, so keep that in mind when comparing
            cuisines.
          </p>
          <p>
            <strong>How many ingredients?</strong> is a histogram of how long each ingredient
            list is, with a dashed line at the average. It is a rough measure of how much
            shopping and prep a recipe needs.
          </p>
          <p>
            Both charts, the stat cards, and the summary under the charts are computed from the
            <em> filtered</em> list, so they change as you search and filter.
          </p>
        </section>

        <section className="card prose">
          <h2>Things to try</h2>
          <ul>
            <li>Filter to <strong>Dessert</strong> and compare the ingredient chart to the full menu.</li>
            <li>Pick a single cuisine and switch the first chart to <strong>Category</strong> to see what that cuisine is known for.</li>
            <li>Search for a word like “chicken” or “pie” and see which cuisines use it most.</li>
            <li>Click any meal to see its full ingredient list, step-by-step instructions, and video.</li>
          </ul>
          <Link to="/" className="button button-link">
            Go to the dashboard
          </Link>
        </section>
      </main>
    </>
  )
}

export default About
