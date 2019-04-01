const emails = customers.map(customer => {
    console.log("customer", customer);
     return customer.contacts.email.map(email => {
        return email
    })
})

console.log(emails);

const mergedEmails = [].concat.apply([], emails);

console.log("array of emails", mergedEmails);