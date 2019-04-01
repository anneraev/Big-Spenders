
console.log(businesses);

let zipCodeProperty = "addressZipCode";

outEl.innerHTML = "<h1>Active Businesses</h1>"
businesses.forEach(business => {
    console.log("each business", business);
    outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
        ${business.addressFullStreet}
    </section>
    <section>
     ${business.addressCity} ${business["addressStateCode"]} ${business[zipCodeProperty]}
    </section>
  `
    outEl.innerHTML += "<hr/>"
});

//Filters only New York businesses from the list of all businesses.
// Array to contain all the New York businesses
const newYorkBusinesses = businesses.filter(business => {
    let inNewYork = false

    if (business.addressStateCode === "NY") {
        inNewYork = true
    }

    return inNewYork
})

console.log("New York businesses only", newYorkBusinesses);

outEl.innerHTML += "<h1>New York Businesses</h1>";
newYorkBusinesses.forEach(business => {
    console.log("each business", business);
    outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
        ${business.addressFullStreet}
    </section>
    <section>
     ${business.addressCity} ${business["addressStateCode"]} ${business[zipCodeProperty]}
    </section>
  `
    outEl.innerHTML += "<hr/>"
});

outEl.innerHTML += "<h1>Purchasing Agents</h1>";

/*
    Using map(), you extract the purchasing agent object
    from each business and store it in a new array
*/
const agents = businesses.map(business => {
    return business.purchasingAgent
})

console.table("Array of agents mapped from the original array of businesses", agents);


//loops through array of businesses and constructs an array of new objects uing the specified values from the objects in the old array. In this case, the objects are a representation of the Agent from each company, their company and phone number.
const agentBusinesses = businesses.map(business => {
    return {
        "fullName": `${business.purchasingAgent.nameFirst} ${business.purchasingAgent.nameLast}`,
        "company": business.companyName,
        "phoneNumber": business.phoneWork,
    }
})

console.log("Array of agents and their businesses derived from the original array of businesses", agentBusinesses);

agents.forEach(agent => {
    outEl.innerHTML += `<h2>${agent.nameFirst} ${agent.nameLast}</h2>`;
    outEl.innerHTML += "<hr/>";
});

outEl.innerHTML += "<h1>Purchasing Agents</h1>";

agentBusinesses.forEach(agent => {
    outEl.innerHTML += `<h2>${agent.fullName}</h2>`;
    outEl.innerHTML += `<h3>${agent.company}</h3>`;
    outEl.innerHTML += `<h4>${agent.phoneNumber}</h4>`;
    outEl.innerHTML += "<hr/>";
});

outEl.innerHTML += "<h1>Businesses with Order Totals</h1>";
//Reduce method calculate order summary.
businesses.forEach(business => {
    /* CALCULATE ORDER SUMMARY */
    let totalOrders = business.orders.reduce(
        (currentTotal, nextValue) => currentTotal += nextValue,
        0
    )


    outEl.innerHTML += `
            <h2>
                ${business.companyName}
                ($${totalOrders})
            </h2>
            <section>
                ${business.addressFullStreet}
            </section>
            <section>
                ${business.addressCity},
                ${business.addressStateCode}
                ${business.addressZipCode}
            </section>
        `;
    outEl.innerHTML += "<hr/>";
});

//////////////////////////////////////////////////////////

outEl.innerHTML += "<h1>Search Business by Purchasing Agent</h1>";
document
    .querySelector("#companySearch")
    .addEventListener("keypress", keyPressEvent => {
        if (keyPressEvent.charCode === 13) {
            /* WHEN  USER PRESSES ENTER, FIND MATCHING BUSINESS */
            const foundBusiness = businesses.find(
                business =>
                business.purchasingAgent.nameFirst.includes(keyPressEvent.target.value) || business.purchasingAgent.nameLast.includes(keyPressEvent.target.value)
            );

            outEl.innerHTML = `
                <h2>
                ${foundBusiness.companyName}
                </h2>
                <section>
                ${foundBusiness.addressFullStreet}

                </section>
                <section>
                ${foundBusiness.addressCity},
                ${foundBusiness.addressStateCode}
                ${foundBusiness.addressZipCode}
                </section>
            `;
        }
    });

//////////////////////////////////////////////////////
