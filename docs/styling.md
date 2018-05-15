# Styling

## Structure

Because of the semi-fractal, directory nature of this application,
component-specific styles can be imported into the component directly. Given the
following component structure:

```
├── src                      # Application source code
...
│   ├── routes               # Main route definitions
...
│   │   ├── ComponentName    # Fractal route
│   │   │   ├── index.js     # Component file -- sibling files possible
│   │   │   ├── styles.scss  # Component-specific styles
```

The component can require these styles like so:
** Note the .css (not .scss) extension. The .css files are compiled during the build
process or on the fly and hot-reloaded when using `yarn start`.
```
import React from 'react';
import './styles.css';

export function ComponentName () {
  return (
    <div className="locally-defined">
      ...
    </div>
  );
}

export default ComponentName;

```

This allows for greater style modularity, but it comes at a small cost: This
file does not inherently have access to variables defined in global styles
files. By default the `src/styles` directory is the root for style aliasing, so
given `src/styles/variables/colors.scss`, you can import like so from a "local"
style file:

```scss
@import 'variables/colors.scss';

.locally-defined {
  ...
}
```