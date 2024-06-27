## A simple example of `useEffect`

This example shows how the existence or absense of the dependency array drives the behavior. Meaning that:

1. If the dependency array exists, then the callback provided to `useEffect` runs only once, after the initial component rendering.

2. If the dependency array is missing, then the callback provided to `useEffect` runs on every component render.

### Notes

The aforementioned behavior is based on the followings:

-   `useCallback` is used to memoize the function, meaning that it will only be created once and will not be recreated on subsequent renders unless the dependencies change.
-   With that provided dependency array, it means that the function will only be created once during the initial render and won’t be recreated on subsequent renders.
-   `useEffect` is used to set up a function that calls `fetchUser` and sets the state of our component when the promise resolves.
-   There are 3 cases related to dependency array:
    -   If you specify the dependencies, your Effect runs after the initial render and after re-renders with changed dependencies.
    -   When passing an empty dependency array, if your Effect truly doesn’t use any reactive values, it will only run after the initial render.
    -   When no dependency array is passed, your Effect runs after every single render (and re-render) of your component.

### Usage

First, install the project dependencies using `npm i`.

Start the project using `npm run dev`.

Go to [http://localhost:5200](http://localhost:5200/), open browser's Developer Tools and go to _Console_ tab.
Click on the button and see what is logged to the console (and how many times).
Refresh the page and see what is logged to the console.
