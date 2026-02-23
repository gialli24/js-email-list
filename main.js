/* Endpoint */
const endpoint = "https://flynn.boolean.careers/exercises/api/random/mail";
const isReachable = false;

/* DOM Nodes */
const endpointStatusEl = document.getElementById("endpoint-status");
const callingSpinnerEl = document.getElementById("calling-spinner");

const generateEmailsBtn = document.getElementById("generateEmailsBtn");

const emailContainerEl = document.getElementById("email-container");


/**
 * 
 * @param {HTMLElement} endpointStatusEl 
 * @param {HTMLElement} callingSpinnerEl 
 * @param {string} responseCode 
 * @param {string} responseStatusText 
 * @param {string} status 
 */
function renderBadge(endpointStatusEl, callingSpinnerEl, responseCode, responseStatusText, status) {

    callingSpinnerEl.classList.add("d-none");
    endpointStatusEl.innerHTML = `${responseCode} ${responseStatusText}`;

    let badgeColor = "text-bg-danger";

    if (status === "success") {
        badgeColor = "text-bg-success";
    }

    endpointStatusEl.className = `badge rounded-pill ${badgeColor}`;
}


/**
 * 
 * @param {string} endpoint 
 * @param {HTMLElement} endpointStatusEl 
 * @param {HTMLElement} callingSpinnerEl 
 */
function checkEndpoint(endpoint, endpointStatusEl, callingSpinnerEl) {

    axios.get(endpoint)
        .then(response => {
            const responseCode = response.status;
            const responseStatusText = response.statusText;

            /* Render Badge Success */
            renderBadge(endpointStatusEl, callingSpinnerEl, responseCode, responseStatusText, "success");
        })
        .catch(error => {
            const response = error.response;

            const responseCode = response.status;
            const responseStatusText = response.statusText;

            /* Render Badge Success */
            renderBadge(endpointStatusEl, callingSpinnerEl, responseCode, responseStatusText, "error");
        })
}


/* Checkendpoint Connectivity */
callingSpinnerEl.classList.remove("d-none");
checkEndpoint(endpoint, endpointStatusEl, callingSpinnerEl);

setInterval(function () {
    callingSpinnerEl.classList.remove("d-none");

    setTimeout(function () {
        checkEndpoint(endpoint, endpointStatusEl, callingSpinnerEl)
    }, 2000);
}, 5000)


/**
 * 
 * @param {string} email 
 * @param {HTMLElement} emailContainerEl 
 * @param {HTMLElement} callingSpinnerEl 
 * @param {Number} index 
 */
function renderEmail(email, emailContainerEl, callingSpinnerEl, index) {

    /* Create li element */
    const tr = `
        <tr>
            <th scope="row">${index}</th>
            <td>${email}</td>
        </tr>
    `;
    emailContainerEl.innerHTML += tr;

    callingSpinnerEl.classList.add("d-none");
}


/**
 * 
 * @param {URL} endpoint 
 * @param {HTMLElement} emailContainerEl 
 * @param {HTMLElement} callingSpinnerEl 
 * @param {Number} index 
 */
function addEmail(endpoint, emailContainerEl, callingSpinnerEl, index) {

    callingSpinnerEl.classList.remove("d-none");

    /* API Call using Axios Library  */
    axios.get(endpoint)
        .then(response => {
            /* Store Data */
            const data = response.data;
            const email = data.response;

            /* Render HTML */
            renderEmail(email, emailContainerEl, callingSpinnerEl, index);
        })
        .catch(error => {
            console.log(error);
        })
}

/**
 * 
 * @param {URL} endpoint 
 * @param {HTMLElement} emailContainerEl 
 * @param {HTMLElement} callingSpinnerEl 
 * @param {Number} count 
 */
function addMoreEmails(endpoint, emailContainerEl, callingSpinnerEl, count) {
    emailContainerEl.innerHTML = "";

    for (let i = 0; i < count; i++) {
        addEmail(endpoint, emailContainerEl, callingSpinnerEl, i + 1)
    }
}

addMoreEmails(endpoint, emailContainerEl, callingSpinnerEl, 10);


/* BTN Listener */
generateEmailsBtn.addEventListener("click", function () {
    addMoreEmails(endpoint, emailContainerEl, callingSpinnerEl, 10);
})