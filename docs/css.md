# CSS Documentation

## Table of Contents
[CSS Folder structure](#css-folder-structure)

[Spacers](#spacers)

[Grid System](#grid-system)

[Layout](#layout)

[Fonts](#fonts)

[Type styles](#type-styles)

[Icons](#icons)

[Theming](#theming)

[Responsive CSS](#responsive-css)

[CSS Styleguide](#css-styleguide)

---

### CSS folder structure
Base styles are included in the `src/styles` path. These are styles and classes for core elements that are used throughout the app. For example, the grid system, typography and font styles, theme and layout styles, as well as sass mixins/variables/extends... etc. These styles are all includes in the `styles/core.css` file that is generated and imported directly into the top level App component.

The includes (mixins/variables/extends) are stored in a separate file (_sass-includes.scss) that can be imported directly into the scss files for React components. This allows the variables and helper functions to be useable throughout the app. This file does not generate any compiled css, so can be imported multiple times throughout the app without adding weight to the css.

For example, to import the includes file directly into a react component, place the following line at the top of the dedicated CSS file for that component: `@import '../../styles/sass-includes`;

The folder structure is as follows:
```
src/styles/
| - elements/                Basic element styles... buttons / inputs / ol - ul ...etc
| - includes/                Includes sass variables / extends / mixins
| --- extends/               Sass extends using %extend format
| --- mixins/                Sass mixin functions for breakpoints / font scaling ...etc
| --- variables/             General sass variables for colors / breakpoints / layout
| - layout/                  Layout styles, including grid / spacers
| - reset/                   Simple css reset
| - theme/                   Theme styling, includes styles for font / bg coloring
| - typography/              Type specific styles... ie. icons / type styles / font declarations
| - _sass-includes.scss      Imports all includes files.  Import this directly into react components css files
| - core.scss                Imports all base css, including sass_includes. Import this into top level app component
```

---

### Spacers
Spacer classes are used to add set amounts of spacing in margin or padding. They range from 1rem - 10rem in increments of 1, where 1rem = 10px.

The syntax is as followws:

`[m or p][side][#]`
```
m   margin
p   padding

side accepts:
l   left
r   right
t   top
b   bottom
y   top & bottom
x   left & right
*   omit side to apply space to all 4 sides (top, right, bottom, left)

# - 1 through 10
Value to set in rem units
```
**Class Examples:**
```
mb2     margin-bottom: 2rem;
my2     margin-top: 2rem; margin-bottom: 2rem;
mx2     margin-left: 2rem; margin-right: 2rem;
m2      margin: 2rem;

pb10    padding-bottom: 2rem;
pl10    padding-left: 1rem;
py10    padding-top: 2rem; padding-bottom: 2rem;
px10    padding-left: 2rem; padding-right: 2rem;
p10     padding: 2rem;
```

**JSX example:**
``` jsx
<!-- h1 with 2rem of margin on the bottom -->
<h1 className="mb2">Sample header</h1>
```

---

### Grid system
The grid system by default is based on a 12 column layout with 4rem gutters. The columns are set using `floats` and `width: calc()`.

The calc formula for determing column width is as follows:
```scss
width: calc(100% * #{$col} / #{$columns} - #{$gutter} * (1 - #{$col} / #{$columns}));

$columns: 12; // # of columns
$gutter: 4rem; // width of gutters
$col: 144rem; // how many columns this element should span

// these are the variable defaults and can be modified in the includes/variables/_variables.layout.scss file
// Classes for col--1 through col--#{$columns} are generated automatically.
```

**JSX examples:**
```jsx
<div className="row">
  <div className="cf">
    <div className="col--8" />
    <div className="col--4" />
  </div>

  <div className="cf">
    <div className="col--4" />
    <div className="col--4" />
    <div className="col--4 col--last" />
  </div>
</div>
```

The `.row` class is used to wrap content in a constraint. This class does a number of things. It limits the max-width to the $col variable, it centers the content, and it adds left and right padding to clear the content from bounds of the viewport. Generally, `.row` elements should not be nested within eachother, as this will add extra margin.

It is recommended to wrap each group of columns in a `<div className="cf"></div>` element in order to clear the floats---the `.cf` class applies a clearfix.

The last item in a group will automatically have its right gutter removed. In order to force an element to remove the gutter even if it is not the last item, the class `.col--last` can be used.

A `.col--center` class is also provided to clear left and right margins and set float to none. This class is used to center an element within it's container. It is commonly used alongside a column class, but can also be used when setting a fixed width or max-width:

**JSX Examples**
```jsx
<div className="col--8 col--center" />
<div className="col--center" style={ { maxWidth: '80rem' } } />
```

---

### Layout
In general, the column classes are used to lay elements out. However, sometimes, more complex layouts require a bit more fine tuning.

##### Layout classes
There are a few simple layout classes used to help lay out content:
```
.layout--left         align content left using float
.layout--right        align content right using float
.layout--relative     forces position: relative, useful as a contain to position: absolute children
.layout--block        forces display: block
.cf                   Applies a clearfix, used to clear floated children to prevent element from collapsing
```

##### Flexbox
Though our grid system is set using floats and calc, it is common for flexbox based layouts to be applied on a case by case basis. There are no default helper classes available for flexbox layouts, as these layouts tend to be fairly unique and benefit from a custom approach.

Here are a few common uses of flexbox:
```jsx
// vertical centering
<div style={ { display: 'flex', alignItems: 'center' } } />

// vertical & horizontal centering
<div style={ { display: 'flex , 'alignItems: 'center', justify-content: 'center'} }
```

---

### Fonts
Fonts are generally declared using `@font-face` and can be found in `typography/_typography.fonts.scss`. There are a few mixins located in `includes/mixins/_mixins.typography.scss` to help with font rendering.

Generally, there are two:

**Font family mixin**
This mixin is used to apply the different font families. It is called using `@include font($family)`, where `$family` is the name of the font-family to apply. Generally, we declare a few family variables up front in a new project, but as fonts tend to differ between probjects, the names of these variables aren't consistent.
```scss
@include font(bold);
@include font(semibold);
@include font(medium);
@include font(regular);
```
**Font scaling mixin**
Font scaling is handled using the `@include font-size($type)` mixin, where `$type` is equal the name of the font-size to apply. An example of these names are the normal h1-h6 tags, as well as a few other custom find sizes:
```scss
@include font-size(h1);
@include font-size(h2);
@include font-size(h3);
@include font-size(h4);
@include font-size(b1);
@include font-size(b2);
@include font-size(quote);
```

---

### Type styles
On top of the font mixins, there are a number of helper classes for applying font styling to elements. They are located in the `typography/_typography.styles.scss` file. This file is also where you will find the default styling for font tags such as `strong, p, a, sup, sub, blockquote`.

**Font sizing**
```
.typ--h1           Applies h1 size
.typ--h2           Applies h2 size
.typ--h3           Applies h3 size
.typ--h4           Applies h4 size
.typ--b1           Applies b1 size
.typ--b2           Applies b2 size
.typ--b3           Applies b3 size
```

**Font weight**
```
.typ--regular      Applies regular font family
.typ--medium       Applies medium font family
.typ--semibold     Applies semibold font family
.typ--bold         Applies bold font family
```

**Font styling**
```
typ--caps          Forces all characters to uppercase
typ--titlecase     Forces every leading character in a word to uppercase
typ--smallcaps     Forces smallcaps font-variant
typ--nowrap        Prevents text from breaking, will extend pass container bounds
```

**Font decoration**
```
.typ--underline    Adds underline
.typ--actionable   Adds pointer cursor styling to element
.typ--truncate     Forces element to one line, and truncates extension using an elipses. ie. trunca...
```

**Font alignment**
```
.typ--center       Aligns text to the center
.typ--left         Aligns text to the left
.typ--right        Aligns text to the right
```

---

### Icons
Icons are included as a custom icon font. This font file is usually generated using the [Icomoon app](https://icomoon.io/app/#/select). The icon font is included using `@font-face` in the `typography/_typography.icons.scss` file.

Each icon is applied to the `::before` psuedo element and declared using a class with the `.icon-` prefix.

**Example**
```
.icon-menu:before {
  content: '/E93';
}
```

Icon classes are generally applied to span elements:
```html
<span className="icon-menu" />
```

The icon class should be the first class applied to an element:
```html
// good
<span className="icon-menu typ--h1" />

// bad
<span className="typ--h1 icon-menu" />
```

We also include an extendable version for each icon in the `includes/extends/icons.scss` file. These extends can be applied in scss as follows:
```scss
.element:before {
  @extend %icon;
  @extend %icon-menu;
}
```

The `%icon` extend is used to apply the icon font-family. Generally both extends will be required when using the extendable version of the icon.

It is possible to select icon elements in css using the attribute selector. It is generally best practice to use this method of selecting icon children rather than using the `.icon-menu` className. This will allow you to swap icons without having to modify the scss.
```scss
[icon=^='icon-'] {
  // this will select all icons
}
```

---

### Theming
Theming is handled in the `theme/theme.base.scss` file. Generally we create a color & background class for all of the color variables located in `includes/variables/_variables.colors.scss`.

**Example**
```html
<span className="typ--black" />
<div className="bg--black" />
```
Assigns `color: $black`, and `background-color: $black`

Typically, a theme extend is also generated to quickly apply element colors by adding a single class to a parent element.

The extends can be found in the `includes/extends/extends.themes.scss` file, and tend to look something like this:
```scss
%theme--dark {
  color: $white;
  
  .btn {
    background-color: $white;
    color: $black;
  }
}
```

Class references to these extends are located in `theme/_theme.base.scss`.
```
.theme--dark { @extend %theme--dark; }
```

**Usage example**
```html
<div>
  <p>This is black font by default</p>
  <span className="btn">This is a button with white font and a black background by default</span>
</div>

// commonly used with dark backgrounds
<div className="theme--dark" style={ { backgroundColor: '#000' } }>
  <p>This is white font</p>
  <span className="btn">This is a button with a white background and black font</span>
</div>
```

---

#### Responsive CSS
We use a combination of media queries and javascript based breakpoints to handle responsive layouts. An explanation on how the javascript breakpoint system works can be observed here: [JS media queries](https://medium.com/type-faster/js-media-queries-md-a18b41a9a28e)

A breakpoint mixin is used to simplify the writing of css media queries. We also include a collection of common breakpoint variables.

Located in `includes/variables/_variables.breakpoints.scss`
```scss
$desktop-lg: 1400px;
$desktop-md: 1300px;
$desktop-sm: 1200px;
$tablet-lg: 1040px;
$tablet-md: 991px;
$tablet-sm: 840px;
$mobile-lg: 767px;
$mobile-md: 540px;
$mobile-sm: 400px;
$mobile-xsm: 350px;
```

Located in `includes/mixins/mixins.breakpoints.scss`
```scss
// media query mixin
@mixin breakpoint($value, $type: max-width) {
  @media only screen and ($type: $value) {
    @content
  }
}

// usage
@include breakpoint($mobile-lg) {
 // styles for $mobile-lg and below
}
```

We use a desktop first breakpoint system. So all media queries use `max-width` by default. The breakpoint mixin accepts an optional second argument, $type, to change the conditional property.

For example:
```
@include breakpoint($mobile-lg, min-width) {
  // styles for $mobile-lg and above
}
```

Media queries should follow these rules:
```
1. Should directly follow the element they effect.
2. Only one element per media query
3. Should be the last rule
4. Should be separated from other css using this comment: // media queries
5. Stacked media queries should be written in descending order, with the larger queries at the top, the smaller ones at the bottom
```

**Media query example**
```scss
.element {
  @include font-size(h1);
  color: $black;
  position: relative;
  // media queries
  @include breakpoint($desktop-sm) {
    display: block;
  }
  @include breakpoint($mobile-lg) {
    color: $pink;
  }
}
```

----

#### CSS Styleguide
We are using the BEM system of class naming.
http://getbem.com/naming/

```html
-- double dash denotes a modifier element
__ double underscore denotes a child element

<span className="btn btn--red" /> // a button modified by red
<span className="btn">
  <span className="btn__icon" /> // a button with an icon as a child
</span>
```

Top level elements should be written as one word, with no delimiter.
```html
// good
<div className="sectiontitle" />

// bad
<div className="section-title" />
```

Sass nesting should be kept to a minimum and only included when it serves a purpose. This increases the usability of child elements as they can be included anywhere, not requiring them to be wrapped in their parent elements.
```scss
// good
.parent {
  position: relative;
}

.parent__child {
  // styles for .parent__child
}


// bad
.parent {
  position: relative;
  
  .parent__child {
    // styles for .parent__child
  }
}
```

State classes are written with a preposition, followed by a single dash -, followed by the status:
```html
<ul>
 <li className="is-active" />
 <li />
</ul>

<input className="has-error" />
```
