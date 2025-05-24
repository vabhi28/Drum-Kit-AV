// Track consecutive key presses
var consecutiveKey = null;
var consecutiveCount = 0;
var numOfButtons = document.querySelectorAll(".drum").length;

// Map each key to a GIF URL and message
const gifMap = {
    w: {
        url: "https://media1.tenor.com/m/ZU_fofJtR6IAAAAC/dookudu-brahmi.gif",
        msg: "YE RA W THAPPA VEREY KEYS LEVA! Ahhhh"
    },
    a: {
        url: "https://media1.tenor.com/m/QP3dbDN-YQUAAAAd/brahmi-brahmanandam.gif",
        msg: "Ninnu Yeseta!"
    },
    s: {
        url: "https://media1.tenor.com/m/YFlQTFSi7AYAAAAC/brahmi-king.gif",
        msg: "Enti veedu okate key malli malli nokkuthunnadu"
    },
    d: {
        url: "https://media.tenor.com/Bp8jjK83FGAAAAAM/wednesday.gif",
        msg: "Okkate key meeda pade pade press cheyaku ra!!!!!!"
    },
    j: {
        url: "https://media.tenor.com/43auewwMSc0AAAAM/thokkathotakura-chiru.gif",
        msg: "ENTI?????"
    },
    k: {
        url: "https://media.tenor.com/yvQtNxDu7OUAAAAM/brahmi-king.gif",
        msg: "Don't Disturb Me!"
    },
    l: {
        url: "https://media1.tenor.com/m/pZDw6uvW0uIAAAAd/brahmi-venky.gif",
        msg: "Rey Champestanu ra ninnu!!! REY !!!!!"
    }
};

// Create popup div
var popup = document.createElement("div");
popup.id = "popup-gif";
popup.style.display = "none";
popup.style.position = "fixed";
popup.style.top = "50%";
popup.style.left = "50%";
popup.style.transform = "translate(-50%, -50%)";
popup.style.background = "rgba(0,0,0,0.8)";
popup.style.padding = "20px";
popup.style.borderRadius = "10px";
popup.style.zIndex = "1000";
document.body.appendChild(popup);

// Show popup with correct gif and message
function showPopup(key) {
    let gif = gifMap[key];
    if (!gif) return;
    popup.innerHTML = `
        <div style="text-align:center;">
            <img src="${gif.url}" width="200" alt="gif" />
            <p style="color:white;font-size:1.5rem;">${gif.msg}</p>
            <button id="close-popup" style="margin-top:10px;">Close</button>
        </div>
    `;
    popup.style.display = "block";
    document.getElementById("close-popup").onclick = function() {
        popup.style.display = "none";
    };
}

// Play sound for each key
function makeSound(key) {
    switch (key) {
        case "w":
            new Audio("sounds/tom-1.mp3").play();
            break;
        case "a":
            new Audio("sounds/tom-2.mp3").play();
            break;
        case "s":
            new Audio("sounds/tom-3.mp3").play();
            break;
        case "d":
            new Audio("sounds/tom-4.mp3").play();
            break;
        case "j":
            new Audio("sounds/snare.mp3").play();
            break;
        case "k":
            new Audio("sounds/kick-bass (2).mp3").play();
            break;
        case "l":
            new Audio("sounds/crash.mp3").play();
            break;
        default:
            // do nothing
    }
}

// Animate button
function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);
    if (!activeButton) return;
    activeButton.classList.add("pressed");
    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);
}

// Handle key/button press for 7 consecutive presses
function handleKeyPress(key) {
    key = key.toLowerCase();

    if (consecutiveKey === key) {
        consecutiveCount++;
    } else {
        consecutiveKey = key;
        consecutiveCount = 1;
    }

    makeSound(key);
    buttonAnimation(key);

    if (consecutiveCount === 7) {
        showPopup(key);
        consecutiveCount = 0;
        consecutiveKey = null;
    }
}

// Add event listeners to all drum buttons
for (var i = 0; i < numOfButtons; i++) {
    document.querySelectorAll("button")[i].addEventListener("click", function () {
        var buttonLetter = this.innerHTML.toLowerCase();
        handleKeyPress(buttonLetter);
    });
}

// Listen for keyboard events
document.addEventListener("keydown", function (event) {
    handleKeyPress(event.key);
});
