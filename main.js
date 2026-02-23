/* Endpoint */
const endpoint = "https://flynn.boolean.careers/exercises/api/random/mail";

function addEmail() {
    /* API Call using fetch API  */
    fetch(endpoint)
        .then(response => response.json())
        .then(data => {
            /* Store Data */
            console.log(data);

            /* Retrive DOM nodes */
            const ulEl = document.getElementById("emails-list");

            /* Create li element */
            const li = document.createElement("li");
            li.innerText = data.response;

            /* Append to ulEl */
            ulEl.append(li);
        })
        .catch(error => {
            console.log(error);
        })
}

for (let i = 0; i < 10; i++) {
    addEmail();
}