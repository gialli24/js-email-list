/* Endpoint */
const endpoint = "https://flynn.boolean.careers/exercises/api/random/mail";

/* Retrive DOM nodes */
const ulEl = document.getElementById("emails-list");

/**
 * 
 * @param {string} email 
 */
function renderEmail(email) {

    /* Create li element */
    const li = document.createElement("li");
    li.innerText = email;

    /* Append to ulEl */
    ulEl.append(li);
}


/**
 * 
 * @param {URL} endpoint 
 */
function addEmailFetchAPI(endpoint) {
    /* API Call using fetch API  */
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            /* Store Data */
            const email = data.response;

            /* Render HTML */
            renderEmail(email);
        })
        .catch(error => {
            console.log(error);
        })
}


/**
 * 
 * @param {URL} endpoint 
 */
function addEmailAxios(endpoint) {
    /* API Call using Axios Library  */
    axios.get(endpoint)
        .then(response => {
            /* Store Data */
            const data = response.data;
            const email = data.response;

            /* Render HTML */
            renderEmail(email);
        })
        .catch(error => {
            console.log(error);
        })
}

for (let i = 0; i < 10; i++) {
    addEmailAxios(endpoint);
}