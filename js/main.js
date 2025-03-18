// -----------------------------------------------------------------------------
// This file includes deliberate formatting errors in order for you to verify
// that ESLint and EditorConfig are working properly. If both tools are, indeed,
// working correctly, then you’d see errors in your editor about indentation and
// improper use of footmarks instead of back ticks. When you save this file,
// your editor should strip all excess newlines and whitespace characters from
// the file. If both of these events occur, then ESLint and EditorConfig are
// working correctly.
//
// DON’T PROCEED UNTIL YOU’RE SURE ESLINT AND EDITORCONFIG ARE WORKING CORRECTLY
// -----------------------------------------------------------------------------

//add json link to hml
body = document.getElementsByTagName("body");
script = document.createElement(`script`);
script.setAttribute(`src`, `json/data.json`);
body[0].appendChild(script);

//get the arrow buttons into an object called buttons
const buttons = document.querySelectorAll('a[href^="#"]');
buttons[0].id = "left-button";
buttons[1].id = "right-button";

//create variables to hold the spacing of the slides in the carousel.
let slideTotal = 0;
let currentSlide = 0;


const carouselSlides = document.getElementsByClassName("carousel-slides");

//the function that takes all the data from data.json and puts them into elements dynamically created and put into the html.
function carousel(data) {

    //make a new div which will be a flexbox holding all the carousel slides.
    const mainSlideConainer = document.createElement('div');
    mainSlideConainer.id = "main-slide-container";
    carouselSlides[0].appendChild(mainSlideConainer);

    //add each slide to the mainSlideContainer
    for (let d = 0; d < data.slideArray.length; d++) {

        //find the number of slides within the carousel.
        slideTotal++;

        //append the slide div to the slide container
        const slide = document.createElement('div');
        slide.className = ("slide");
        mainSlideConainer.appendChild(slide);

        //tempElement will be reused as a place holder for all elements which will append to "slide"
        //entry will be the shorter form to access the current slide data from the JSON file
        let tempElement;
        const entry = data.slideArray[d];

        //add album
        tempElement = document.createElement('h2');
        tempElement.className = "album";
        tempElement.textContent = entry.album;
        slide.appendChild(tempElement);

        //add artist with url
        tempElement = document.createElement('p');
        tempElement.className = "artist-p";
        let link = document.createElement('a');
        link.textContent = entry.artist;
        link.href = entry.url;
        link.target = "_blank";
        tempElement.appendChild(link);
        slide.appendChild(tempElement);

        //add image
        tempElement = document.createElement('img');
        tempElement.className = "image";
        tempElement.src = entry.cover_image.path;
        tempElement.alt = entry.cover_image.alt_content
        slide.appendChild(tempElement);

        //add credits and url
        tempElement = document.createElement('p');
        tempElement.textContent = "credit: ";
        tempElement.className = "credit-p"
        link = document.createElement('a');
        link.textContent = entry.cover_image.credit;
        link.href = entry.cover_image.url;
        link.target = "_blank";
        link.className = "credit-a";
        tempElement.append(link);
        slide.appendChild(tempElement);

        //add text content
        tempElement = document.createElement('p');
        tempElement.textContent = entry.review.content;
        tempElement.className = "content";
        slide.appendChild(tempElement);

        //add source and url
        link = document.createElement('a');
        link.textContent = "—" + entry.review.source;
        link.href = entry.review.url;
        link.target = "_blank";
        link.className = "source";
        slide.append(link);

        console.log("slide " + (d + 1) + " added.");
    }


    //set the left button to be slightly transparent
    buttons[0].style.opacity = .5;

    //add event listeners for moving the slides

    //button click events:
    buttons[0].addEventListener("click", e => {
        //check where you are on the slides.
        //move the carousel if possible

        if (currentSlide != 0) {
            //call the move function
            currentSlide--;
            moveCarousel();
        }

    })
    buttons[1].addEventListener("click", e => {
        //check where you are on the slides.
        //move the carousel if possible

        if (currentSlide != slideTotal - 1) {
            //call the move function
            currentSlide++;
            moveCarousel();
        }
    })

    //arrowkey click events:
    document.onkeydown = e => {

        if (e.keyCode == 37) {
            //left pressed
            //check where you are on the slides.
            //move the carousel if possible

            if (currentSlide != 0) {
                //call the move function
                currentSlide--;
                moveCarousel();
            }
        }
        else if (e.keyCode == 39) {
            //right pressed
            //check where you are on the slides.
            //move the carousel if possible

            if (currentSlide != slideTotal - 1) {
                //call the move function
                currentSlide++;
                moveCarousel();
            }
        }
    }

    function checkKey(e) {

        e = e || window.event;

        if (e.keyCode == 38) {
            // up arrow
        }
        else if (e.keyCode == 40) {
            // down arrow
        }
        else if (e.keyCode == 37) {
            // left arrow
        }
        else if (e.keyCode == 39) {
            // right arrow
        }

    }

    //move the carousel and update the currentSlide property
    function moveCarousel() {
        //move the carousel
        let x = currentSlide * -100;
        carouselSlides[0].firstChild.style.transform = `translateX(${x}%)`;

        //reset button opacity
        buttons[0].style.opacity = 0.5;
        buttons[1].style.opacity = 0.5;

        //then set button opacity appropriately
        if (currentSlide != 0)
            buttons[0].style = 1
        if (currentSlide != slideTotal - 1)
            buttons[1].style = 1
    }

}







