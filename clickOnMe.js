var buttonToClick = document.querySelector("button");

buttonToClick.addEventListener("click", function(){
    // document.body.style.background = "purple";
    document.body.classList.toggle("purple");
});