function postPage() {
    scene="postPage";
}

function goHome() {
    scene = "homePage";
}

function reviewsPage() {
    scene = "reviewsPage";
}

const $reviewsContainer = document.getElementById("reviews")
const $usersContainer = document.getElementById("users")
document.getElementById("login")
    .onsubmit = login
document.getElementById("createReview")
    .onsubmit = createPost

spawnPosts()
//spawnUsers()
let user_id

function createPost(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            text: document.getElementById("newReview").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/reviews", payload)
        .then(res => res.json())
        .then(res => console.log(res.body))
        .catch(error => console.error(error))
}

function login(e) {
    e.preventDefault()
    const payload = {
        body: JSON.stringify({
            username: document.getElementById("username").value,
            password: document.getElementById("password").value
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch("/login", payload)
        .then(res => res.json())
        .then(res => {
            user_id = res.userId
        })
        .catch(error => console.error(error))
}

function spawnPosts() {
   fetch("/reviews")
    .then(res => res.json())
    .then(posts => {
        const postsHTML = posts.map( post => `
        <div class="review">
            <p>${post.review}</p>
            <div class="details">
                <div>${post.user_id}</div>
            </div>
        </div>
        ` ).join("")
        $reviewsContainer.innerHTML = postsHTML
    })
    .catch(err => console.error(err))
   
}

function spawnUsers() {
    fetch("/users")
     .then(res => res.json())
     .then(users => {
         const usersHTML = users.map( user => `
         <div class="user" data-userid=${user.id}>
             <p>${user.username}</p>
             <div class="details">
                 <div>${user.firstName}</div>
             </div>
             <button onclick="e => {addFriend(e);}">Add Friend</button>
         </div>
         ` ).join("")
         $usersContainer.innerHTML = usersHTML
     })
     .catch(err => console.error(err))
    
 }
