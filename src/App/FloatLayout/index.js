import React from 'react';
import './FloatLayout.css';

function FloatLayout () {
  return (
    <div className="floatlayout">
      <h1>Float Layout</h1>

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

export default FloatLayout;
