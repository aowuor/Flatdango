// function Movie(id,...details){
//     this.id =  id,
//     this.title = title,
//     this.runtime = runtime,
//     this.capacity = capicty,
//     this.showtime = showtime,
//     this.tickets_sold = tickets_sold,
//     this.description = description,
//     this.poster = poster,
//   }

let currentMovie;

customFetch("http://localhost:3000/films", "GET")
// customFetch("http://localhost:3000/films", "POST", newMovie)
// customFetch("http://localhost:3000/films/25", "DELETE")
// customFetch("http://localhost:3000/films/27", "PATCH", newMovie)


// Renders list of all movies
function displaylist(movies){
    for(let movie in movies){
        let ul = document.getElementById('movies_list')
        let li = document.createElement('li');
        li.innerText = movies[movie].title
        ul.appendChild(li)

        li.addEventListener("click", function(){
            currentMovie = movie;
            displayMovieDetails(movies[movie]);
        })    
    } 
}

// Renders details of selected movie
function displayMovieDetails(movie){
    title = document.getElementById('movieTitle')
    title.innerText = movie.title
    poster= document.getElementById('moviePoster')
    poster.src = movie.poster
    runtime = document.getElementById('moviesRuntime')
    runtime.innerText = `Runtime: ${movie.runtime}` 
    showtime = document.getElementById('movieShowtime')
    showtime.innerText = `Showtime: ${movie.showtime}`
    description = document.getElementById('movieDescription')
    description.innerText = movie.description

    ticketBtn = document.getElementById('buyTicket')
    ticketBtn.addEventListener("click", function(){
        let availableTicket = movie.capacity - movie.tickets_sold
        if(availableTicket <= 0){
            alert("SOLD OUT")  
        }
    })
}

function handleForm(){
    let form = document.getElementById("form")
    form.addEventListener("submit", (e) => {
        e.preventDefault()
        let newForm = new FormData(form)
        console.log([...newForm])
    })
    
    // customFetch("http://localhost:3000/films", "POST", newMovie)

}
handleForm()

// customs GET, POST, PATCH and DELETE functions of fetch
function customFetch(url,type,data){
    if(type === "GET"){
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            },
        })
        .then((res)=> res.json())
        .then((data) => {
            displaylist(data);
        })
        .catch((error) => console.log(error))
    }
    if(type === "POST"){
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((res)=> res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    }
    if(type === "PATCH"){
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((res)=> res.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error))
    }
    if(type === "DELETE"){
        fetch(url, {
            method: type,
            headers: {
                "Content-type": "application/json",
            }
        })
        .catch((error) => console.log(error))
    }
}