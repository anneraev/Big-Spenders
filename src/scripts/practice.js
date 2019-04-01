const outPrac = document.querySelector("#practice-output")

outPrac.innerHTML += "<h2>Big Spenders</h2>";
// Array to contain all the big spenders
const bigSpenders = businesses.filter(business => {
    let bigSpender = false;
    business.orders.forEach(num => {
        if (num >= 9000) {
            console.log("found Big Spender");
            bigSpender = true
        }
    })
    console.log(bigSpender);
    return bigSpender
})

console.log("Customers who've spent more than 9000", bigSpenders);

//print big spenders and their order totals to the dom.
bigSpenders.forEach(business => {
    /* CALCULATE ORDER SUMMARY */
    let totalOrders = business.orders.reduce(
        (currentTotal, nextValue) => currentTotal += nextValue,
        0
    )


    outPrac.innerHTML += `
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
    outPrac.innerHTML += "<hr/>";
});

/////////////////////////////////////////////////////////////////