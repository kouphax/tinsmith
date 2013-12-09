## Install

*Requirements*

Node / NPM

Bower (Package Manager)

```
npm install bower -g
```

Inside your project run:

```
bower install x-tag-spinner
```

This downloads the component and dependencies to ./components


## Syntax

A loading spinner with optional status text

```
	<x-spinner></x-spinner>
```

## Usage

Optional attributes:
* `duration` - Time in seconds it should take for spinner to complete one rotation.
* `label` - Text to display within the spinner.
* `reverse` - Spinner rotation defaults to clockwise. When present, spinner will rotate counterclockwise.
* `src` - The URL of an image to use in place of the CSS spinner effect.


