import React from 'react';
import './GridLayout.css';

function GridLayout () {
  return (
    <div className="gridlayout">
      <h1>Grid Layout</h1>

      <section>

        { /* Header */ }
        <header />

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

        { /* Footer */ }
        <footer />

      </section>
    </div>
  );
}

export default GridLayout;
