
# Countdown Application
##### Ashvini Hunagund

## Approach
### Tier 1
**Selecting the Date**  I implemented the countdown timer by utilizing the Date object in JavaScript. Users can set a custom target date using an <input> field with type datetime-local. The timer updates every second using setInterval, calculating the difference between the target and current date. When the countdown reaches zero, the timer stops. The state timeLeft holds the number of days, hours, minutes, and seconds left. This state is updated every second inside a useEffect hook. This took me around 30 minutes.

**Video Upload**  I allowed users to upload either a .mp4 video or a .png image as a background. The file is then displayed with the help of either a <video> tag or an <img> tag, based on the file type. The bgFile state holds the temporary URL of the uploaded file. The type of file is stored in bgFileType, which determines how the file is displayed. This took me around an hour since I had never done this before so I did require a lot self - learning.

**Font Color and Size**: I implemented basic styling controls by allowing users to choose the font size and color of the countdown text. The font size is set through a number input field, while the font color is controlled using a color picker.  This took me around an hours as well, to make sure that the UI for the inputs were as in line and as wanted.

### Tier 2

**Individual Styling Controls** Users can select individual styling for each time unit (days, hours, minutes, seconds). A dropdown (selectedTarget) lets users choose which unit to style, and the color of that unit is controlled via a color input.  The fontColors object allows each time unit to have its own color, and the style updates are reflected in the p tags dynamically. This took me around 30 minutes.

### Tier 3
**Animations** I added the ability for users to select an animation for the countdown text. Using simple CSS classes (pulse, bounce, fade-in), the selected animation is applied based on user choice. The animation state holds the current animation type, and getAnimationClass() function returns the appropriate class to be applied to the countdown text. This took me around 2 hours.

## Challenges
I would say the biggest challenges I had faced where ensuring that the user updates happened in realtime and that the changes were done smoothly. I had actually attempted the two parts I unfortunately was not able to complete (the drag & drop feature and the localStorage). I kept running into small bugs that in theory did perform as they were meant to but not as smooth as wanted. For example, I was able to get the countdown to move but it would always start off screen or the dragging motion was not smooth. Or the localStorage would cause errors in the real-time updates I had implemented for applying user changes, etc.

## Bonus Question
If I were to scale this solution I would make the following optimizations:
1. **Lazy Loading:** I would implement this for the background videos to prevent slow page loads, especially with larger video files
2. **Responsiveness:** One thing I would focus on would be implementing responsive design using CSS flexbox/grid to ensure that the countdown adapts to different screen sizes, especially on mobile devices
3. **State Management:** Though the task suggests that Redux or Context API are not needed for storing state, as the project is scaled I may consider using them as they allow for a more scalable approach to state management, enable easier tracking and updating of settings like font color, font size, and animation preferences across multiple components
4. **Error Checking for Inputs:** I would check if the user's input for the countdown date is a time in the future rather than having the program show 0s like it does now. This would prevent errors and possible confusion as well

## Next Steps
1. **Drag and Drop Feature:** If I had more time, I would implement a drag-and-drop functionality to allow users to freely position the time units (days, hours, minutes, seconds) over the video. From the research I have done, and the trial and error I had gone through it seems this would require integrating a drag-and-drop library like react-draggable and adjusting the CSS to ensure proper positioning.
2. **Save & Reload Settings:** I would work on saving user preferences in localStorage so that when the user revisits the page, their settings (background, font color, font size, target date) are saved. I would look into using localStorage.getItem and localStorage.setItem.




