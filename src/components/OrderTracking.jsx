import { useState } from "react";

const steps = [
  { label: "Order received", icon: "receipt" },
  { label: "Preparing", icon: "chef" },
  { label: "Out for delivery", icon: "scooter" },
  { label: "Delivered", icon: "check" },
];
const messages = [
  { icon: "chef", title: "Your food is being prepared", text: "Our kitchen is preparing your order. This will only take a few minutes." },
  { icon: "scooter", title: "Your food is on the way", text: "Our driver is on the way to your location. Estimated arrival: 10 minutes." },
  { icon: "check", title: "Delivered!", text: "Your food has been delivered. Enjoy your meal!" },
];

function TrackingIcon({ type }) {
  const paths = {
    receipt: <><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" /><path d="M9 7h6M9 11h6M9 15h4" /></>,
    chef: <><path d="M7 14a4 4 0 0 1-2-7 4 4 0 0 1 7-2 4 4 0 0 1 7 2 4 4 0 0 1-2 7v6H7v-6Z" /><path d="M7 17h10M10 11v3M14 11v3" /></>,
    scooter: <><circle cx="5" cy="18" r="3" /><circle cx="19" cy="18" r="3" /><path d="M5 18h8l4-10h-4M16 4h3l2 10M5 15l3-5h5M7 7h5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[type]}</svg>;
}

function formatTime(value) {
  return new Date(value).toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", hour12: false });
}

export default function OrderTracking({ order, onBackToMenu }) {
  const [stage, setStage] = useState(1);
  const [times, setTimes] = useState([order.createdAt, order.createdAt, null, null]);
  const message = messages[stage - 1];

  function advanceStage() {
    if (stage >= 3) return;
    const nextStage = stage + 1;
    setTimes((previous) => previous.map((time, index) => index === nextStage ? Date.now() : time));
    setStage(nextStage);
  }

  return (
    <main className="tracking-page">
      <div className="tracking-heading">
        <h1>Track your order</h1>
        <p>Order #{order.id}</p>
      </div>
      <ol className="tracking-steps" aria-label="Order progress">
        {steps.map((step, index) => (
          <li key={step.label} className={`tracking-step ${index <= stage ? "is-complete" : ""} ${index === 3 && stage === 3 ? "is-delivered" : ""}`} aria-current={index === stage ? "step" : undefined}>
            <span className="tracking-icon" aria-hidden="true"><TrackingIcon type={step.icon} /></span>
            <strong>{step.label}</strong>
            <span className="tracking-time">{times[index] ? formatTime(times[index]) : "—"}</span>
          </li>
        ))}
      </ol>
      <section className={`tracking-message ${stage === 3 ? "is-delivered" : ""}`} role="status" aria-live="polite" aria-atomic="true">
        <span className="tracking-message-icon" aria-hidden="true"><TrackingIcon type={message.icon} /></span>
        <h2>{message.title}</h2>
        <p>{message.text}</p>
        <p className="tracking-destination">Delivery to <strong>{order.location}</strong></p>
        {stage === 3 && <button className="primary-button" onClick={onBackToMenu}>Back to menu</button>}
      </section>
      <div className="tracking-demo">
        <p>Demo tracking — statuses are simulated for this project.</p>
        {stage < 3 && <button className="secondary-button" onClick={advanceStage}>{stage === 1 ? "Demo: out for delivery" : "Demo: mark delivered"}</button>}
      </div>
    </main>
  );
}
