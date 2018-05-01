
/*
  CSInterface
*/
var csInterface = new CSInterface();
/*
  Linking Server
*/
csInterface.requestOpenExtension("com.cep.auth.localserver", "");

/*
  UI Elements
*/
var loginButton = document.querySelector("#login-button");
var userButton = document.querySelector("#user-button");
var canvas = document.querySelector("#canvas");

/*
  Event listeners
*/
loginButton.addEventListener("click", login);
userButton.addEventListener("click", getUserInfo);

/*
  Helper methods
*/

function login() {
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/glogin",
		success: response => {
			window.location.href = response;
		},
		error: (jqXHR, textStatus, errorThrown) => { 
			console.log("error");
			alert(JSON.parse(jqXHR.responseText).error);
		}
	})
}

function getUserInfo() {
	$.ajax({
		type: "GET",
		url: "http://localhost:3000/user",
		success: response => {
			canvas.innerHTML = JSON.stringify(response.data);
		},
		error: (jqXHR, textStatus, errorThrown) => { 
			console.log("error");
			alert(JSON.parse(jqXHR.responseText).error);
		}
	})

}
