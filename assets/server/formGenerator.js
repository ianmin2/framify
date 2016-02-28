if( !fs.existsSync("./forms") ){
	fs.mkdirSync("forms");
}

var GenForm = function(  formname , formFieldDataArray ){
	
	if( typeof(formFieldDataArray) != "String" ){
	
		var generatedArray = [];
		var generatedObj;
		var masterText;
		
		
		
		formFieldDataArray.forEach(function( formFieldData ) {
			
			masterText = formFieldData.key.capitalize().replace(/\_/ig, " ");
			
            
			 generatedObj = {
				 key: formFieldData.key,
				 type:  formFieldData.field || "inline-input",
				 defaultValue: formFieldData.default,
				 templateOptions: {
					 label: formFieldData.label || masterText + ":",
					 type: (  masterText.toLowerCase() === "password" )? "password" : ( formFieldData.fieldType ||  "text" ),
					 placeholder: formFieldData.placeholder || (masterText.toLowerCase() === "password")? "********" : masterText,
					 required: formFieldData.required || false,
					 options: formFieldData.options || null,
					 rows : formFieldData.rows || (formFieldData.field === "textarea") ? 5 : null
				 }
			 }
			
			//if( generatedObj.defaultValue ){ delete generatedObj.defaultValue; }
             
            
             if( generatedObj.defaultValue == false ){ generatedObj.defaultValue = false; }else{ generatedObj.defaultValue = ( !generatedObj.defaultValue ) ? null : generatedObj.defaultValue  }
            //console.log(generatedObj.defaultValue);
            
			if( !generatedObj.options || generatedObj.options == null ){ delete generatedObj.options; }
			if( !generatedObj.rows || generatedObj.rows == null ){ delete generatedObj.rows; }
			
			generatedArray.push( generatedObj );
			
		},this );
		// generatedArray.push({
        //     type: "space",
        //     key : ""
        // });
		if( !fs.writeFileSync( __dirname + "/../forms/" + formname + ".formly.json", JSON.stringify(generatedArray), 'utf8' ) ){
			log("\n@framify -> formGenerator\n".info + "Form Schema Successfully saved to forms/".success + formname + ".formly.json".success);
			return makeResponse(200,"Form Schema Successfully saved to <i>forms/" + formname + ".formly.json</i>");
		}else{
			log("\n@framify -> formGenerator\n".info + "Failed to generate the form ".err + formname +"!".err);
			return makeResponse(500,"Failed to save the form data")
		};
		
	}else{
		
		log("\n@framify -> formGenerator\n".info + "Failed to generate form schema.\nReason:\n".err + "The provided data is not an array of fields but a(n) ".yell + typeof(formFieldDataArray) )
		return makeResponse( 500, "Sorry, the form data processor expects an Array value but got" + typeof(formFieldDataArray) );
	
	}
		
}; 


module.exports = function( destinationFilename, genericArrayData ){
	return new GenForm(destinationFilename,genericArrayData);
};
// var myArr = [{key: "username_id"},{key:"password"}];

// GenForm("myForm", myArr);                                                                                      