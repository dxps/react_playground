## A simple example of `useEffect`

This example shows how the existence or absense of the dependency array drives the behavior. Meaning that:

1. If the dependency array exists, then the callback provided to `useEffect` runs only once, after the initial component rendering.

2. If the dependency array is missing, then the callback provided to `useEffect` runs on every component render.
