import kitchenImage from "../assets/hero-food.jpg";

const features = [
  { icon: "◎", title: "Our mission", description: "To provide convenient, affordable and delicious meals for all students." },
  { icon: "♧", title: "Quality food", description: "Fresh ingredients prepared daily." },
  { icon: "▰", title: "Fast delivery", description: "Delivered to your campus residence." },
];

export default function About({ onBrowseMenu }) {
  return (
    <main className="about-page">
      <h1>About</h1>
      <p className="about-tagline">Good food. Brighter days.</p>
      <img className="about-image" src={kitchenImage} alt="Fresh food from the campus tuckshop" />
      <p className="about-description">
        BC Food Delivery is a campus-based food delivery service that brings
        tasty, affordable meals directly to your door. We are here to make
        student life easier, with a variety of meals, drinks and snacks
        prepared with quality ingredients.
      </p>
      <section className="about-story" aria-labelledby="about-story-title">
        <span className="about-label">MADE FOR CAMPUS LIFE</span>
        <h2 id="about-story-title">More time for what matters.</h2>
        <p>Between lectures, study sessions and residence life, finding time
          for a meal should be easy. BC Food Delivery brings the tuckshop
          experience into one place, so you can browse, choose and organise
          your order without interrupting your day.</p>
      </section>
      <div className="about-features">
        {features.map(({ icon, title, description }) => (
          <div className="about-feature" key={title}>
            <span className="about-icon" aria-hidden="true">{icon}</span>
            <div><h2>{title}</h2><p>{description}</p></div>
          </div>
        ))}
      </div>

      <section className="about-section" aria-labelledby="about-steps-title">
        <h2 id="about-steps-title">Your next meal, in three simple steps</h2>
        <ol className="about-steps">
          <li><strong>Find your favourite</strong><p>Explore meals, snacks and drinks. Filter the menu to find what you are craving.</p></li>
          <li><strong>Make it yours</strong><p>Adjust quantities, choose a campus delivery point and add a note for your order.</p></li>
          <li><strong>Follow your order</strong><p>Review your total, submit your order and explore the order progress screen.</p></li>
        </ol>
      </section>

      <section className="about-section" aria-labelledby="about-benefits-title">
        <h2 id="about-benefits-title">Small details. A better experience.</h2>
        <div className="about-benefits">
          <article><h3>Clear prices</h3><p>See item prices in Rand and your delivery charge before submitting your order.</p></article>
          <article><h3>Your campus, your spot</h3><p>Choose from residences, the library, lecturer offices and the sports field.</p></article>
          <article><h3>Easy on any screen</h3><p>Browse the menu and manage your cart from your phone, tablet or laptop.</p></article>
          <article><h3>Room for your preferences</h3><p>Add written instructions at checkout to explain your preferences clearly.</p></article>
        </div>
      </section>

      <section className="about-cta" aria-labelledby="about-cta-title">
        <h2 id="about-cta-title">A study break worth looking forward to.</h2>
        <p>Something filling, something sweet, or a coffee to keep you going — explore the menu and find your next favourite.</p>
        <button className="primary-button" onClick={onBrowseMenu}>Explore the menu <span aria-hidden="true">→</span></button>
      </section>
    </main>
  );
}
