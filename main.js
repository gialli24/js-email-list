/* Endpoint */
const endpoint = "https://flynn.boolean.careers/exercises/api/random/mail";

/* API Call using fetch API  */
fetch(endpoint)
    .then(response => response.json())
    .then(data => {
        /* Store Data */
        console.log(data);
    })
    .catch(error => {
        console.log(error);
    })

/* Add each email to listEl */