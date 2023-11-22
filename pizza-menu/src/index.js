import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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
  const style = {};

  return (
    <header className="header">
      <h1 style={style}>Fast React Pizza Co.</h1>
    </header>
  );
};

const Menu = () => {
  return (
    <main className="menu">
      <h2>Our menu</h2>

      <Pizza
        name="Pizza Spinachi"
        ingredients="Tomato, mozarella, spinach, and ricotta chese"
        photoName="pizzas/spinaci.jpg"
        price={10}
      />
    </main>
  );
};

const Footer = () => {
  const currHour = new Date().getHours();
  const openHour = 8;
  const closeHour = 22;
  const isOpen = openHour <= currHour && currHour < closeHour;
  console.log("isOpen ? ", isOpen);

  return (
    <footer className="footer">
      {new Date().toLocaleTimeString()} | We're currently open!
    </footer>
  );
};

function Pizza(props) {
  console.log("Pizza props:", props);
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} />
      <div>
        <h3>{props.name}</h3>
        <p>{props.ingredients}</p>
        <span>{props.price}</span>
      </div>
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
