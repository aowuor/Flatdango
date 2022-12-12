// function Movie(id,...details){
//     this.id =  id,
//     this.title = title,
//     this.runtime = runtime,
//     this.capacity = capicty,
//     this.showtime = showtime,
//     this.tickets_sold = tickets_sold,
//     this.description = description,
//     this.poster = poster,
// };

let newMovieDetails = {};
// let currentMovie;

//SECTION: HANDLES FRONTEND DISPLAY-----------------------------------------------------------

customFetch("http://localhost:3000/films", "GET");

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

function handlePostUpdateDelete(){
    let updatebtn = document.getElementById('updatebtn')
    let addbtn = document.getElementById('addbtn')
    let deletebtn = document.getElementById('deletebtn')

    updatebtn.addEventListener("click", updateMovie)
    addbtn.addEventListener("click", postMovie)
    deletebtn.addEventListener("click", deleteMovie)

}

handlePostUpdateDelete()

// SECTION: POST, PATCH AND DELETE FUNCTIONS--------------------------------------------------
// Deletes movie of specific id
function deleteMovie(){
    let deleteForm = document.getElementById('deleteForm')
    deleteForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let id = deleteForm.delete.value
        customFetch(`http://localhost:3000/films/${id}`, "DELETE")   
    })
}

// Adds a new movie
function postMovie(){
    let postForm = document.getElementById('form')
    postForm.addEventListener("submit", (e) => {
        e.preventDefault()
        newMovieDetails.id = form.id.value
        newMovieDetails.title = form.title.value
        newMovieDetails.poster = form.poster.value
        newMovieDetails.runtime = form.runtime.value
        newMovieDetails.showtime = form.showtime.value
        newMovieDetails.description = form.description.value
        
        customFetch("http://localhost:3000/films", "POST", newMovieDetails)  
    })
}

// Updates details of a specific movie
function updateMovie(){
    let updateForm = document.getElementById('form')
    updateForm.addEventListener("submit", (e) => {
        e.preventDefault()
        newMovieDetails.id = form.id.value
        newMovieDetails.title = form.title.value
        newMovieDetails.poster = form.poster.value
        newMovieDetails.runtime = form.runtime.value
        newMovieDetails.showtime = form.showtime.value
        newMovieDetails.description = form.description.value
        console.log(newMovieDetails)

        customFetch(`http://localhost:3000/films/${newMovieDetails.id}`, "PATCH", newMovieDetails)
    })
}

// SECTION: FETCH FUNCTIONS--------------------------------------------------------------------
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