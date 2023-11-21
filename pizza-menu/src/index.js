import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div>
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

const Header = () => {
  return <h1>Fast React Pizza Co.</h1>;
};
const Menu = () => {
  return (
    <div>
      <h2>Our menu</h2>
      <Pizza />
      <Pizza />
    </div>
  );
};
const Footer = () => {
  const currHour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  if (openHour <= currHour && currHour < closeHour)
    alert("we're currently open!");
  else alert("Sorry we're closed");
  return (
    <footer>{new Date().toLocaleTimeString()} | We're currently open!</footer>
  );
};

function Pizza() {
  return (
    <div>
      <img src="pizzas/spinaci.jpg" alt="Pizza Spinaci" />
      <h2>Pizza Spinaci</h2>
      <p>Tomato, mozarella, spinach, and ricotta chese</p>
    </div>
  );
}

// Using React v18.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
