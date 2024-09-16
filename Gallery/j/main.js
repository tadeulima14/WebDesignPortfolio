document.addEventListener("DOMContentLoaded", init);
let autoplayInterval;

// prepare the page for user. link all html classes to a 
//js variable and create buttons in JS
function init() {
    //create shortcut variables
    const container = document.querySelector(".container");
    const frame = document.querySelector(".frame");
    const slides = document.querySelectorAll(".slide");
    const currentSlide = document.querySelector(".current");

    // create the slide controls
    const controls = document.createElement("div"); //creates a container for buttons in JS, no need for html
    controls.className = "controls"; // makes a class name for new div, "controls" 
    controls.innerHTML =
        '<a href="#" class="back-btn"> Back |</a><a href="#" class="next-btn">| Next </a>';
    // physically add/append the control buttons to the image container  
    container.appendChild(controls);

    const backBtn = controls.querySelector(".back-btn"); //establish js variables for the new control element
    //above the html side of controls is created using JS. here I link the new "controls" class to its own JS variable 
    const nextBtn = controls.querySelector(".next-btn");

    //add event listner, program waits for click on controls elements to do an action.
    backBtn.addEventListener("click", showNewSlide);
    nextBtn.addEventListener("click", showNewSlide);

    //setup slides, first hide slides except first one;
    slides.forEach((image) => {
        image.classList.add("hide");
        slides[0].classList.remove("hide");
    });

    autoplayInterval = setInterval(autoPlay, 3000);

}

function showNewSlide(e) {
    e.preventDefault();
    // shortcut variables
    const container = document.querySelector(".container");
    const frame = document.querySelector(".frame");
    const slides = document.querySelectorAll(".slide");
    const currentSlide = document.querySelector(".current");
    const myButton = e.target;
    let nextUp = "";

    
     
   
    if (myButton.classList.contains("back-btn")) { //navigate back thru slide class index
        nextUp = currentSlide.previousElementSibling; 
    }
        
    if (myButton.classList.contains("next-btn")){ //navigate forwards thru class, 
        nextUp = currentSlide.nextElementSibling;
        // conditional reverts "current" image to [0] once last image is reached, while navigating forwards
        if (!nextUp) {
            nextUp = slides[0];
        }
    }

    //logic for coming to end of slides, while naviagting backwards
    if (nextUp === null) {
        let index = slides.length - 1; // get last element in slides class when you reach first img
        nextUp = slides[index];
        
    }

 
    //Backwards looping works but not forwards??

    // Only 1st image has "current" class tag. by clicking nxt or bck javascript will dynamically 
    //move the "current" class name to the next sibling element in the hierarchy.
    //these siblings are established through "class=slide" and "current" used once to single them out  

    //deccomission the currently visible slide
    currentSlide.classList.toggle("hide");
    currentSlide.classList.toggle("current");

    //show the new slide
    nextUp.classList.toggle("hide");
    nextUp.classList.toggle("current");

    //change the caption text to match the slide, !delay in captions by 1 index space!
    // offsetting alt tags aligns captions. Error Caused by mystery blank slide.
    const txt = currentSlide.alt;
    const caption = frame.querySelector("figcaption");
    caption.textContent = txt;

    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(autoPlay, 3000); // Change 3000 to your desired interval (in milliseconds)

    
}

function autoPlay() {
     //redefine ALL used variables in new function
    const frame = document.querySelector(".frame")
    const currentSlide = document.querySelector(".current");
    const slides = document.querySelectorAll(".slide");
    const nextUp = currentSlide.nextElementSibling || slides[0];
    const txt = currentSlide.alt;
    const caption = frame.querySelector("figcaption");
    caption.textContent = txt;

    if (nextUp) {
        currentSlide.classList.remove("current");
        currentSlide.classList.add("hide");

        nextUp.classList.remove("hide");
        nextUp.classList.add("current");
    }



}

