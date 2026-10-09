import { money } from "../data";

export default function Cart({ cart, add, remove, deleteItem, onCheckout }) {
  const subtotal = cart.reduce((sum, x) => sum + x.item.price * x.quantity, 0);
  const delivery = cart.length ? 12 : 0;
  const total = subtotal + delivery;
  const count = cart.reduce((sum, x) => sum + x.quantity, 0);

  return (
    <aside className="order-card">
      <div className="order-card-heading">
        <h2><span>🛒</span> Your order</h2>
        <span>{count} item{count === 1 ? "" : "s"}</span>
      </div>

      {cart.length === 0 ? (
        <p className="empty-order">Your cart is empty. Add something tasty from<br /> the menu.</p>
      ) : (
        <div className="order-lines">
          {cart.map((x) => (
            <div className="order-line" key={x.item.id}>
              <img src={x.item.image} alt="" />
              <div className="order-line-main">
                <div className="order-line-top">
                  <strong>{x.item.name}</strong>
                  <b>{money(x.item.price * x.quantity)}</b>
                </div>
                <div className="mini-controls">
                  <button aria-label={`Decrease ${x.item.name} quantity`} onClick={() => remove(x.item.id)}>−</button>
                  <span>{x.quantity}</span>
                  <button aria-label={`Increase ${x.item.name} quantity`} onClick={() => add(x.item)}>+</button>
                  <button className="trash" onClick={() => deleteItem(x.item.id)} aria-label={`Remove ${x.item.name}`}>×</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="totals">
        <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
        <div><span>Campus delivery</span><strong>{money(delivery)}</strong></div>
        <div className="grand-total"><span>Total</span><strong>{money(total)}</strong></div>
      </div>

      <button className={`checkout-button ${!cart.length ? "disabled" : ""}`} disabled={!cart.length} onClick={onCheckout}>
        Go to order summary
      </button>
    </aside>
  );
}
