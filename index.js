'use strict';

function getGitHubRepos(Solcodeguy) {
  // generate the URL
  const url = `https://api.github.com/users/${Solcodeguy}/repos`;
  // header about which API version to use   
  const options = {
    headers: new Headers({
      Accept: "application/vnd.github.v3+json"
    })
  };

  console.log(`Finding repos for ${Solcodeguy}`);
  
  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $("#js-error-message").text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
  
  console.log(responseJson);
  
  // previous results, removed 
  $("#repo-list").empty();

  // for each repo listed, add a link to it in DOM  
  responseJson.forEach(obj =>
    $("#repo-list").append(
      `<li><a href='${obj.url}'>${obj.name}</a></li>`
    )
  );
  // username equal to the search value
  $("#username").text(`${Solcodeguy}`);

  // display the results section
  $("#results").removeClass("hidden");
}

// Watch for form submissions. when they happen,
// get the username, and call `getGitHubRepos` with it
function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const Solcodeguy = $("#js-github-handle").val();
    getGitHubRepos(Solcodeguy);
  });
}

$(watchForm);