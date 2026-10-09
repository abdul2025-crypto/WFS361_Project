import { useMemo, useState } from "react";
import bcLogo from "./assets/bc-logo.png";
import heroImage from "./assets/hero-food.jpg";
import { locations, menu, money } from "./data";
import MenuItemCard from "./components/MenuItem";
import Cart from "./components/Cart";
import OrderTracking from "./components/OrderTracking";
import About from "./components/About";

function Logo({ onHome }) {
  return (
    <button className="brand" onClick={onHome} aria-label="BC Food Delivery home">
      <img className="brand-logo" src={bcLogo} alt="Belgium Campus logo" />
      <span className="brand-copy">
        <strong>BC Food Delivery</strong>
        <small> CAMPUS TUCKSHOP</small>
      </span>
    </button>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [order, setOrder] = useState(null);

  const count = cart.reduce((sum, x) => sum + x.quantity, 0);
  const subtotal = cart.reduce((sum, x) => sum + x.item.price * x.quantity, 0);
  const delivery = cart.length ? 12 : 0;
  const total = subtotal + delivery;

  const filteredMenu = useMemo(
    () => (category === "all" ? menu : menu.filter((item) => item.category === category)),
    [category],
  );

  function goHome() {
    setPage("home");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  }

  function chooseOrder() {
    setPage("home");
    setTimeout(() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  function goCheckout() {
    setPage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(item) {
    setCart((oldCart) => {
      const found = oldCart.find((x) => x.item.id === item.id);
      if (found) {
        return oldCart.map((x) => x.item.id === item.id ? { ...x, quantity: x.quantity + 1 } : x);
      }
      return [...oldCart, { item, quantity: 1 }];
    });
  }

  function removeFromCart(id) {
    setCart((oldCart) => oldCart
      .map((x) => x.item.id === id ? { ...x, quantity: x.quantity - 1 } : x)
      .filter((x) => x.quantity > 0));
  }

  function deleteFromCart(id) {
    setCart((oldCart) => oldCart.filter((x) => x.item.id !== id));
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!cart.length) return;
    if (!name.trim() || !location) return;
    // Save the submitted order before clearing the cart.
    setOrder({
      id: String(Date.now()).slice(-6),
      createdAt: Date.now(),
      name: name.trim(),
      location,
      notes: notes.trim(),
      items: cart.map((entry) => ({ ...entry })),
      total,
    });
    setPage("tracking");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCart([]);
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Logo onHome={goHome} />
          <nav className="main-nav" aria-label="Main navigation">
            <button className={page === "home" ? "nav-active" : ""} onClick={goHome}>Menu</button>
            <button onClick={chooseOrder}>Choose the order</button>

            <button className={page === "checkout" ? "nav-active" : ""} onClick={goCheckout}>Order summary</button>
            {order && <button className={page === "tracking" ? "nav-active" : ""} onClick={() => setPage("tracking")}>Track order</button>}
            <button className={page === "about" ? "nav-active" : ""} onClick={() => { setPage("about"); window.scrollTo({ top: 0 }); }}>About</button>
          </nav>
          <button className="cart-pill" onClick={goCheckout} aria-label={`Cart with ${count} items`}>
            <span className="cart-icon">🛒</span>
            <span>Cart</span>
            <b>{count}</b>
          </button>
        </div>
      </header>

      {page === "home" && (
        <>
          <section className="hero">
            <img src={heroImage} alt="Campus food" />
            <div className="hero-overlay" />
            <div className="hero-content">
              <span className="eyebrow">BELGIUM CAMPUS TUCKSHOP</span>
              <h1>Campus food, <em>delivered</em><br />to your door.</h1>
              <p>No more twenty-minute queues between lectures. Build your order,<br className="desktop-break" /> choose a campus delivery point and we bring it to you.</p>
              <div className="hero-actions">
                <button className="primary-button" onClick={goCheckout}>View my cart <span>→</span></button>
                <button className="secondary-button" onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}>Order now</button>
              </div>
            </div>
          </section>

          <section className="quick-steps" id="how-it-works">
            <div><span className="step-icon">✧</span><strong>Browse the menu</strong></div>
            <div><span className="step-icon">⌖</span><strong>Pick your spot</strong></div>
            <div><span className="step-icon">◷</span><strong>Skip the queue</strong></div>
          </section>

          <main className="menu-page" id="menu">
            <div className="section-heading">
              <div>
                <h2>Today’s menu</h2>
                <p>Fresh from the tuckshop kitchen. Prices in South African Rand.</p>
              </div>
              <div className="categories">
                {[
                  ["all", "All items"],
                  ["meals", "Meals"],
                  ["drinks", "Drinks"],
                  ["snacks", "Snacks"],
                ].map(([value, label]) => (
                  <button key={value} className={category === value ? "active" : ""} onClick={() => setCategory(value)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="menu-layout">
              <div className="menu-grid">
                {filteredMenu.map((item) => {
                  const quantity = cart.find((x) => x.item.id === item.id)?.quantity || 0;
                  return (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      quantity={quantity}
                      add={() => addToCart(item)}
                      remove={() => removeFromCart(item.id)}
                    />
                  );
                })}
              </div>
              <Cart cart={cart} add={addToCart} remove={removeFromCart} deleteItem={deleteFromCart} onCheckout={goCheckout} />
            </div>
          </main>
        </>
      )}

      {page === "about" && <About onBrowseMenu={chooseOrder} />}

      {page === "checkout" && (
        <main className="checkout-page">
              <div className="checkout-heading">
                <h1>Order summary</h1>
                <p>Check your items, tell us where you are on campus and submit your order.</p>
              </div>
              <div className="checkout-layout">
                <form className="order-form" onSubmit={placeOrder}>
                  <label>
                    Your name
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Abdisalam Mohamed" required />
                  </label>
                  <label>
                    Campus delivery location
                    <select value={location} onChange={(e) => setLocation(e.target.value)} required>
                      <option value="">Choose where to deliver</option>
                      {locations.map((place) => <option key={place} value={place}>{place}</option>)}
                    </select>
                    <small>⌖ Student rooms, lecture halls and staff offices are covered.</small>
                  </label>
                  <label>
                    Notes for the runner (optional)
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="No onions, call me when you arrive..." />
                  </label>
                  <button className="submit-button" type="submit" disabled={!cart.length || !name.trim() || !location}>Submit order ({money(total)})</button>
                  <p className="form-note">Simulated checkout — no online payment is processed.</p>
                </form>
                <Cart cart={cart} add={addToCart} remove={removeFromCart} deleteItem={deleteFromCart} onCheckout={goCheckout} />
              </div>
        </main>
      )}
      {order && (
        <div hidden={page !== "tracking"}><OrderTracking key={order.id} order={order} onBackToMenu={goHome} /></div>
      )}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img className="brand-logo" src={bcLogo} alt="Belgium Campus logo" />
            <div><strong>BC Food Delivery</strong><p>Campus food, delivered to your door.</p></div>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <button onClick={goHome}>Browse menu</button>
            <button onClick={goCheckout}>Order summary</button>
            <button onClick={() => { setPage("about"); window.scrollTo({ top: 0 }); }}>About</button>
          </nav>
          <p className="footer-note">Campus delivery · Prices in South African Rand</p>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} BC Food Delivery</p>
      </footer>
    </div>
  );
}

export default App;
