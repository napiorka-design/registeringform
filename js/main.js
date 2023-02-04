
    // This code provides two functions to the HTML.



	//set up the objects that contain the validation data for regex. These values must use the same name as the id of the form input.
	var myreg = new Object();// set up the object containing the regex expressions to be used.
	myreg.tellandline = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/g;//https://www.aa-asterisk.org.uk/Regular_Expressions_for_Validating_and_Formatting_GB_Telephone_Numbers#Validating_GB_telephone_numbers
	myreg.telmobile = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/g;
	myreg.postcode = /^(GIR ?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKPS-UW]) ?[0-9][ABD-HJLNP-UW-Z]{2})$/g; // see the section on Regex Reference for further details
	myreg.email = /^.+?\@.+?$/g
    myreg.user = /^[a-z0-9_-]{5,15}$/g
    myreg.password1 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    //myreg.password2 = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ 
   

	var truefeedback = new Object(); // set up the object containing the success messages to be used.
	truefeedback.tellandline = 'Valid: ';
	truefeedback.telmobile = 'Valid: ';
	truefeedback.postcode = 'That should be a valid post code';
	truefeedback.email = 'Valid: ';
    truefeedback.user = 'Valid: ';
    truefeedback.password1 = 'Valid: ';
    //truefeedback.password2 = 'Valid: ';

	var falsefeedback = new Object();// set up the object containing the failed validation messages to be used.
	falsefeedback.tellandline = "Not a valid UK landline ";
	falsefeedback.telmobile = 'Not a valid UK mobile ';
	falsefeedback.postcode = 'That is not a valid post code ';
	falsefeedback.email = 'That is not a valid email address ';
    falsefeedback.user = 'That is not a valid username ';
    falsefeedback.password1 = 'That is not a valid password ';
   // falsefeedback.password2 = 'That is not a valid password ';

	//set up an object to contain a record of ids of form inputs for checking before form submission
	var formcheck = new Object();
	formcheck.agreement = false; // all false initially. When a valid entry confirmed changed to true, or if invalid changed back to false
	formcheck.firstname = false;
	formcheck.surname = false;
	formcheck.dateofbirth = false;
	formcheck.house = false;
	//formcheck.add2 = false; // these are not going to be required fields - they don't have to be filled in so we won't include them in our list for checking before submission
	//formcheck.add3 = false;
	formcheck.town = false;
	formcheck.postcode = false;;
	formcheck.tellandline = false;
	formcheck.telmobile = false;
	formcheck.email = false;
    formcheck.user = false;
    formcheck.password1 = false;
   // formcheck.password2 = false;


	var formresult = true;

function myFunction(myid,myvalue,validationtype){ //the input passes its id and the value it contains to the function
	console.log( validationtype );
	myvalue=myvalue.trim(); // trim any leading and trailing whitespace
	result ="";  //create an empty variable to hold the result of the test
	fb = "fb"+ myid;  //global create the id of the feedback element - adding "fb" to the front of the input id


if (validationtype == "as" ){ 
    anystring(myid,myvalue);
}
else if (validationtype == "reg") {
     myregexcheck(myid,myvalue);
    
    }
    //if (validationtype == "reg" &&  myid  == password2){ 
       //matchPassword;


  // }
else if (validationtype == "dt") { mydatestring(myid,myvalue);}

};

function myregexcheck(myid,myvalue){
	var myregex= myreg[myid];  // the value from the myreg object identified by the id from the form
	if ( result = myregex.test( myvalue )){  // this is how we test the string against the regex. We want a true or false answer.
	document.getElementById(fb).style.backgroundColor="lightgreen"; // change the feedback span to green
	document.getElementById(fb).innerHTML= (truefeedback[myid]) + myvalue; // add a message to the feedback span
	formcheck[myid] = true;
	return true;
}else{ // there has not been a match
	document.getElementById(fb).style.backgroundColor="red";
	document.getElementById(fb).innerHTML= (falsefeedback[myid]) + myvalue;
	formcheck[myid] = false;
	return false;
}
};

function anystring(myid,myvalue){
	if ( myvalue ){  // this is how we test the string has some sort of value and is not null, empty, undefined. We want a true or false answer.
	document.getElementById(fb).style.backgroundColor="lightgreen"; // change the feedback span to green
	document.getElementById(fb).innerHTML= " ? " + myvalue; // add a message to the feedback span
	formcheck[myid] = true;
	return true;
}else{ // there has not been a match
	document.getElementById(fb).style.backgroundColor="red";
	document.getElementById(fb).innerHTML= " This should not be empty. Please make a selection";
	formcheck[myid] = false;
	return false;
}
};

function mydatestring(myid,myvalue){
		var myDate = new Date(myvalue);
	var jsonDate = myDate.toJSON();
	if ( !isNaN( jsonDate ) ){// value won't convert to date so is not a valid date
		document.getElementById(fb).style.backgroundColor="red";
		document.getElementById(fb).innerHTML= " This is not a valid date or time";
		formcheck[myid] = false;
		return false;
		 }
	var mytesttime = jsonDate.substr(0, 16);//get the first 16 characters of this date time string
	var mytestdate = jsonDate.substr(0, 10);// get the first 10 characters of this date
	tstr= myvalue.substr(0, 16);//get the first 16 characters of this date time string
	dstr= myvalue.substr(0, 10);// get the first 10 characters of this date



	if(tstr == mytesttime ){// we have a valid date and time
	document.getElementById(fb).style.backgroundColor="lightgreen"; // change the feedback span to green
	document.getElementById(fb).innerHTML= "This is a valid date and time:  " + myvalue; // add a message to the feedback span
	formcheck[myid] = true;
	return true;
	} else if ( dstr == mytestdate ) {// we have a valid date
		document.getElementById(fb).style.backgroundColor="lightgreen"; // change the feedback span to green
		document.getElementById(fb).innerHTML= "This is a valid date:  " + myvalue; // add a message to the feedback span
		formcheck[myid] = true;
		return true;
	}else {//not a valid date time
		document.getElementById(fb).style.backgroundColor="red";
		document.getElementById(fb).innerHTML= " This is not a valid date or time";
		formcheck[myid] = false;
		return false;
	}

};

function validate(){
	//because we have kept a record of the state of all inputs in our formcheck[myid] object, we can quickly see if they have all been filled in.

	for (var key in formcheck ){


		 if (formcheck.hasOwnProperty(key)) {
      formresult = formresult && formcheck[key] ;

    }
	}
	//alert ("validate called" + formresult );
	if( formresult ){
		return true;
	} else {
	document.getElementById("formready").style.backgroundColor="red"; // change the feedback p to red
	document.getElementById("formready").innerHTML= "Not ready to submit. Please check the form fields without a green tick above"; // add a message to the feedback span
	formresult = true;
	return false;
    }
};

 

//function matchPassword(myid) {  
  //  var pw1 = document.getElementById("password1").value;  
 //   var pw2 = document.getElementById("password2").value;
   
 //   if(pw1 != pw2 )  
   // {   
   //   alert("Passwords did not match");  
   //   formcheck.password2 = false;
  //    fb = 'fb' + myid;
      
      

   // } else { 
      //myregexcheck(myid,myvalue) 
      //alert("Password created successfully"); 
      
     // formcheck.password2 = true;
     // fb = 'fb' + myid;
      
      
   // }  
   // If the length of the element's string is 0 then display helper message 
   //function required(myid) 
   //{
     //if (myid.value.length == 0)
     // { 
       //  alert("Cannot be empty");  	
       //  return false; 
    //  }  	
     // return true; 
   // } 
//};
