import React from 'react'

const Home = () => {
  return (
    <section className="landing">
    <div className="dark-overlay">
      <div className="landing-inner">
        <h1 className="x-large">Video Game Catalog</h1>
        <p className="lead">
          Browse video games, leave reviews, and add to favorites
        </p>
        <div className="buttons">
          <a href="register.html" className="btn btn-primary">Sign Up</a>
          <a href="login.html" className="btn btn-light">Login</a>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Home
