const apiRequestUrl = "https://api.github.com/users/"

const searchInput = document.querySelector("#search-input")
const btnSearch = document.querySelector ("#btn-search")

const userImg = document.getElementById("img-user")
const userName = document.getElementById("nameUser")
const userLocation = document.getElementById("userLocation")
const publicRe = document.getElementById("publicRe")
const userFollowers = document.getElementById("seguidoresId")
const userFollowing = document.getElementById("seguindoId")
const errorUser = document.getElementById("erro-user")
const errorSeguindo = document.getElementById("h3-seguindo")
const errorSeguidores = document.getElementById("h3-seguidores")
const errorRep = document.getElementById("p-rep")
const errorSvg = document.getElementById("svg-repo")


// Funcçoes

const getUserName = async (userGit) => {
    const response = await fetch(`${apiRequestUrl}${userGit}`);
    const data = await response.json();
    
    if (response.status === 404 || data.message === "Not Found") {
      throw new Error("Usuário não encontrado");
    }
    
    return data;
  };
  
  const showSearchData = async (userGit) => {
    try {
      const data = await getUserName(userGit);
      userImg.src = data.avatar_url;
      userName.innerText = data.login;
      userLocation.innerText = data.location || "Não informado";
      publicRe.innerText = data.public_repos;
      userFollowers.innerText = data.followers;
      userFollowing.innerText = data.following;
      errorUser.innerText = ""
    } catch (error) {
      userImg.src = "img/notusererror.png";
      errorUser.innerText = ""
      userName.innerText = "";
      userLocation.innerText = error.message;
      publicRe.innerText = "";
      userFollowers.innerText = "";
      userFollowing.innerText = "";
    

    
    }
  };
  
  

//events

btnSearch.addEventListener("click", (e)=> {

    e.preventDefault();

    const userGit = searchInput.value.trim().split(" ").join("");
    showSearchData (userGit);
    
   
})

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const userGit = searchInput.value.trim().split(" ").join("");
    showSearchData(userGit);
  }
});



