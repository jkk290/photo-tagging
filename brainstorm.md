# Frontend
- render an image in a div container
- the div container should have event listeners to respond to user clicks
    - on click, keep track of the coordinates.  Used to verify if the object clicked on is the correct one.
        - verify coordinates are correct for different screen sizes
    - render a targeting box to give user visual feedback of where they clicked
    - pop up menu should also appear where user can select the object they found
- On successful finds, add a mark to show that the selection was correct
- When users first load the page/start the game, begin a timer to track how long it takes to find all objects
    - Timer should be server-side code
- Once everything found, track the time and offer the user to enter a name for a high scores table.
    