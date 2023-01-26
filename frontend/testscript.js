let dates = document.querySelectorAll(".date")

for (let date = 0; date < dates.length; date++){
    if(!dates[date].innerHTML){
        dates[date].style.display = "none"
    }
}
