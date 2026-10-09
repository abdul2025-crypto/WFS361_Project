import { money } from "../data";

export default function MenuItem({ item, quantity, add, remove }) {
  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <img src={item.image} alt={item.name} />
        {item.badge && <span className="food-badge">{item.badge}</span>}
      </div>
      <div className="food-card-body">
        <div className="food-title-row">
          <h3>{item.name}</h3>
          <strong>{money(item.price)}</strong>
        </div>
        <p>{item.description}</p>
        {quantity === 0 ? (
          <button className="add-button" onClick={add}>Add to cart</button>
        ) : (
          <div className="card-quantity">
            <button aria-label={`Decrease ${item.name} quantity`} onClick={remove}>−</button>
            <span>{quantity} in cart</span>
            <button className="plus" aria-label={`Increase ${item.name} quantity`} onClick={add}>+</button>
          </div>
        )}
      </div>
    </article>
  );
}
