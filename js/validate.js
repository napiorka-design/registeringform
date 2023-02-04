function validate() {
    //because we have kept a record of the state of all inputs in our formcheck[myid] object, we can quickly see if they have all been filled in.
    for (var key in formcheck) {


        if (formcheck.hasOwnProperty(key)) {
            formresult = formresult && formcheck[key];

        }
    }
    //alert ("validate called" + formresult );
    if (formresult) {
        return true;
    } else {
        document.getElementById("formready").style.backgroundColor = "red"; // change the feedback p to red
        document.getElementById("formready").innerHTML = "Not ready to submit. Please check the form fields without a green tick above"; // add a message to the feedback span
        formresult = true;
        return false;
    }
}
