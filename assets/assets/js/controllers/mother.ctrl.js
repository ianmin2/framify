app.controller("motherController", ["$scope",function($scope){
	
	// $scope.nextOfKin 			= {};
	// $scope.medicalHistory 		= {};
	// $scope.hospitalMembership 	= {};
	// $scope.familyPlanning		= {};
	
	$scope.forms = {};
	$scope.data = {};
	$scope.process = {};
	
	$.getJSON("forms/dist/mainForm.json",function(data){
		$scope.forms = data;
	});
	
	//console.dir($scope.location)
	$scope.myPath = $scope.location;
	
	//! ESTABLISH THE DIFFERENT DATA INSERTION TECHNIQUES
	$scope.process.mother = {};
	
	//@BASIC MOTHER ADDITION
	$scope.process.mother.add = function(obj,uid){
		
		if( obj.name.length < 5 ){
			$scope.app.UID(( uid || "resp" ), "Please Enter a longer name value.","danger");			
			return false;			
		}else if( !$scope.app.isTelephone(obj.telephone.number) ){				
			$scope.app.UID(( uid || "resp" ),"Please Enter a valid telephone Number","danger");
			return false;
		}else if( !obj.age ){
			$scope.app.UID(( uid || "resp" ),"The Mother's age is required","danger");
			return false;
		}else if( !obj.identification || obj.identification.length < 6 ){
			$scope.app.UID(( uid || "resp" ),"The mother's identification means is required. <br>Use a telephone number in case of absence.","danger");
			return false;
		}else{
			return true;
		}
		
	};
	
	
	//@BASIC admissions  => 
	$scope.process.admissions = function(obj,uid){
		if( !obj.hospital ){
			$scope.app.UID('resp', 'Please specify the hospital of admission','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC antenatal_profile =>
	$scope.process.antenatal_profile = function(obj,uid){
		return true;
	};
	
	//@BASIC behavior =>
	$scope.process.behavior = function(obj,uid){
		return true;
	};
	
	//@BASIC birth_details =>
	$scope.process.birth_details = function(obj,uid){
		if( !obj.birth_weight ){
			$scope.app.UID('resp', 'A weight at birth is required','danger');
			return false;
		}else if(!obj.birth_length){
			$scope.app.UID('resp', 'A length at birth is required','danger');
			return false;
		}else if(!obj.gestation){
			$scope.app.UID('resp', 'Please fill the gestation period of the child','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC birth_record =>
	$scope.process.birth_record = function(obj,uid){
		if(!obj.birth_notification_no){
			$scope.app.UID('resp', 'Please provide a birth record number','danger');
			return false;
		}else if(!obj.permanent_register_number){
			$scope.app.UID('resp', 'Please provide the permanent register number.','danger');
			return false;
		}else {
			return true;
		}
	};
	
	//@BASIC blood_transfusion =>
	$scope.process.blood_transfusion = function(obj,uid){
		if(!obj.reason){
			$scope.app.UID('resp', 'Please provide at least a reason for the blood transfusion.','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC child =>
	$scope.process.child = function(obj,uid){
		if( !obj.name ){
			$scope.app.UID('resp', 'The name of the child is required.','danger');
			return false;
		}else if( !obj.sex ){
			$scope.app.UID('resp', 'The child\'s sex is required. ','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC child_examination =>
	$scope.process.child_examination = function(obj,uid){
		return true;
	};
	
	//@BASIC children =>
	$scope.process.children = function(obj,uid){
		return true;
	};
	
	//@BASIC civil_registration =>
	$scope.process.civil_registration = function(obj,uid){
		if( !obj.birth_certificate_no ){
			$scope.app.UID('resp', 'Please Enter the birth certificate number','danger');
			return false;
		}else if( !obj.permanent_register_number ){
			$scope.app.UID('resp', 'The permanent register number is required','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC conductor =>
	$scope.process.conductor = function(obj,uid){
		if( !obj.title ){
			$scope.app.UID('resp', 'The Birth conductor is required','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC consultation =>
	$scope.process.consultation = function(obj,uid){
		if( !obj.notes ){
			$scope.app.UID('resp', 'Notes for this consultation are needed to continue','danger');
			return false;
		}else if( !obj.consultant ){
			$scope.app.UID('resp', 'A consultant name/id is required','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC delivery =>
	$scope.process.delivery = function(obj,uid){
		if( !obj.sweek ){
			$scope.app.UID('resp', 'Gestation weeks are required','danger');
			return false;
		}else if( !obj.condition_mother ){
			$scope.app.UID('resp', 'The mother\'s condition is required','danger');
			return false;
		}else if( !obj.condition_child ){
			$scope.app.UID('resp', 'The child\'s condition is required.','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC deworming =>
	$scope.process.deworming = function(obj,uid){
		return true;
	};
	
	//@BASIC diabetes =>
	$scope.process.diabetes = function(obj,uid){
		return true;
	};
	
	//@BASIC drug_allergies =>
	$scope.process.drug_allergies = function(obj,uid){
		if( !obj.name ){
			$scope.app.UID('resp', 'The allergy name is required.','danger');
			return false;
		}else if( !obj.diagnosed ){
			$scope.app.UID('resp', 'The allergic reaction is required.','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC drugs_child =>
	$scope.process.drugs_child = function(obj,uid){
		return true;
	};
	
	//@BASIC drugs_mother =>
	$scope.process.drugs_mother = function(obj,uid){
		return true;
	};
	
	//@BASIC family_planning =>
	$scope.process.family_planning = function(obj,uid){
		return true;
	};
	
	//@BASIC feeding =>
	$scope.process.feeding = function(obj,uid){
		return true;
	};
	
	//@BASIC ferrous_fumarate =>
	$scope.process.ferrous_fumarate = function(obj,uid){
		if( !obj.number ){
			$scope.app.UID('resp', 'The dose number is required.','danger');
			return false;
		}else if( !obj.week ){
			$scope.app.UID('resp', 'The dose week is require.','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC first_clinic =>
	$scope.process.first_clinic = function(obj,uid){
		if( !obj.age ){
			$scope.app.UID('resp', 'The child\'s age (in weeks) is required','danger');
			return false;
		}else if( !obj.weight ){
			$scope.app.UID('resp', 'The child\'s weight is required','danger');
			return false;
		}else if( !obj.length ){
			$scope.app.UID('resp', 'The child\'s length is required','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC first_visit =>
	$scope.process.first_visit = function(obj,uid){
		return true;
	};
	
	//@BASIC guardian =>
	$scope.process.guardian = function(obj,uid){
		if( !obj.relationship ){
			$scope.app.UID('resp', 'The relationship parameter is required','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC hospital_membership =>
	$scope.process.hospital_membership = function(obj,uid){
		if( !obj.hospital_name ){
			$scope.app.UID('resp', 'The hospital name is required','danger');
			return false;
		}else if( !obj.account_number ){
			$scope.app.UID('resp', 'An account number is required','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC hypertension =>
	$scope.process.hypertension = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC impairments =>
	$scope.process.impairments = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC malaria_prophyxalis =>
	$scope.process.malaria_prophyxalis = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC maternal_profile =>
	$scope.process.maternal_profile = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC mother =>
	$scope.process.mother = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC mother_examination =>
	$scope.process.mother_examination = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC next_of_kin =>
	$scope.process.next_of_kin = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC occupation =>
	$scope.process.occupation = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC other_family_history =>
	$scope.process.other_family_history = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC pmtct =>
	$scope.process.pmtct = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC postnatal_examination =>
	$scope.process.postnatal_examination = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC pregnancy_visits =>
	$scope.process.pregnancy_visits = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC residence =>
	$scope.process.residence = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC scheduled_visits =>
	$scope.process.scheduled_visits = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC special_clinic =>
	$scope.process.special_clinic = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC surgical_history =>
	$scope.process.surgical_history = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
		
	//@BASIC telephone =>
	$scope.process.telephone = function( obj ){
				
		if(  !$scope.app.isTelephone( obj.telephone ) ){
			return false	
		}else{			
			return true;
		}
		
	};
	
	//@BASIC tetenus_toxoid =>
	$scope.process.tetenus_toxoid = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC treated_net =>
	$scope.process.treated_net = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC tuberculosis =>
	$scope.process.tuberculosis = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC twins =>
	$scope.process.twins = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC vaccine_layout =>
	$scope.process.vaccine_layout = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC vaccine_reactions =>
	$scope.process. = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	//@BASIC weight_monitoring =>
	$scope.process.weight_monitoring = function(obj,uid){
		if( !obj. ){
			$scope.app.UID('resp', '','danger');
			return false;
		}else{
			return true;
		}
	};
	
	
}])