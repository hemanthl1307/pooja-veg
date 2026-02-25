function showsidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}
const line1 = "Pooja Grand";
const line2 = "Authentic Indian Catering";

let i = 0;
let j = 0;
let typingStarted = false;

function typeLine1() {
    if (i < line1.length) {
        document.getElementById("typeLine1").innerHTML += line1.charAt(i);
        i++;
        setTimeout(typeLine1, 40);
    } else {
        setTimeout(typeLine2, 100);
    }
}

function typeLine2() {
    if (j < line2.length) {
        document.getElementById("typeLine2").innerHTML += line2.charAt(j);
        j++;
        setTimeout(typeLine2, 35);
    } else {
        document.getElementById("fadeParagraph").classList.add("show");
    }
}

function handleScroll() {
    const section = document.getElementById("cateringSection");
    const position = section.getBoundingClientRect().top;
    const screen = window.innerHeight / 1.2;

    if (position < screen && !typingStarted) {
        section.classList.add("show-section"); 
        typeLine1();
        typingStarted = true;
    }
}
window.addEventListener("scroll", handleScroll);