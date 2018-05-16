import React from 'react';
import './FlexboxLayout.css';

function Flexbox () {
  return (
    <div className="flexboxlayout">
      <h1>Flexbox Layout</h1>

      { /* -------------------------------------------------- */ }
      { /* Header */ }
      <header />

      <section>

        { /* Main */ }
        <main>
          <div className="grid4 mb4">
            <div className="col" />
            <div className="col" />
            <div className="col" />
            <div className="col" />
          </div>

          <div className="grid2">
            <div className="col" />
            <div className="col" />
          </div>
        </main>

        { /* Sidebar */ }
        <aside />

      </section>

      { /* Footer */ }
      <footer />
      { /* -------------------------------------------------- */ }

    </div>
  );
}

export default Flexbox;
