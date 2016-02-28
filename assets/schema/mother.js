var Schema 	 = mongoose.Schema;

//# TELEPHONE SCHEMA
var telephoneSchema = new Schema({
	title: { 
				type: String, 
				default: "Mobile" 
			},
	number: { 
				type: String,
				validate: {
      				validator: function(v) {
						return telRegex.test(v);
					},
					message: '{VALUE} is not a valid phone number!'
					}
  			},
	date: {
			type: Date,
			default: new Date
		  }  
});

//# OCCUPATION SCHEMA
var occupationSchema = new Schema({
	title: { 
				type: String,
				required: true  
			},
	date: {
				type: Date,
				default: new Date 
		  }
});

//# NEXT OF KIN SCHEMA
var nextOfKinSchema = new Schema({
		name: {
				type: String,
				required: true
			  },
		relationship: {
						type: String,
						required: true	
					  },
		telephone: [telephoneSchema],
		date: {
				type: Date,
				default: new Date	
			  }
});

//# SURGICAL HISTORY SCHEMA
var surgicalHistorySchema = new Schema({
	title: {
		type: String,
		required: true
	},
	date: {
		type: String,
		default: new Date
	},
	description: {
		type: String
	},
	notes: {
		type: String
	}
});

//# DIABETES SCHEMA
var diabetesSchema = new Schema({
	exists: {
		type: Boolean,
		required: true
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}	
});

//# TUBERCULOSIS SCHEMA
var tuberculosisSchema = new Schema({
	exists: {
		type: Boolean,
		required: true
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}	
});

//# DRUG ALLERGIES SCHEMA
var drugAllergiesSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	reaction: {
		type: String
	},
	diagnosed: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# BLOOD TRANSFUSION SCHEMA
var bloodTransfusionSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	reason: {
		type: String,
		required: true
	},
	notes: {
		type: String
	}
})


//# MEDICAL HISTORY SCHEMA
var medicalHistorySchema = new Schema({
	surgical_history: [surgicalHistorySchema],
	diabetes: [diabetesSchema],
	tuberculosis: [tuberculosisSchema],
	blood_transfusion: [bloodTransfusionSchema],
	drug_allergies: [drugAllergiesSchema]
});

//# FAMILY HISTORY SCHEMA
var familyHistorySchema = new Schema({
	twins: [{
		exists:{
			type: Boolean,
			default: false
		},
		notes: {
			type: String
		},
		date: {
			type: Date,
			default: new Date
		}
	}],
	tuberculosis: [{
		exists:{
			type: Boolean,
			default: false
		},
		notes: {
			type: String
		},
		date: {
			type: Date,
			default: new Date
		}
	}],
	diabetes: [{
		exists:{
			type: Boolean,
			default: false
		},
		notes: {
			type: String
		},
		date: {
			type: Date,
			default: new Date
		}
	}],
	hypertension: [{
		exists:{
			type: Boolean,
			default: false
		},
		notes: {
			type: String
		},
		date: {
			type: Date,
			default: new Date
		}
	}],
	other_family_history:[{
		title: {
			type: String
		},
		notes: {
			type: String
		},
		date: {
			type: Date,
			default: new Date			
		}
	}]
});

//# HOSPITAL MEMBERSHIP SCHEMA
var hospitalMembershipSchema = new Schema({
	hospital_name: {
		type: String,
		unique: true,
		required: true
	},
	account_number: {
		type: String,
		required: true
	},
	notes:{
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# SPECIAL NOTES SCHEMA
var specialNotesSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	message: {
		type: String,
		required:true,
		unique: true
	},
	signed: {
		type: String
	}
});


//# MATERNAL PROFILE SCHEMA
var maternalProfileSchema = new Schema({
	pregnancy_order: {
		type: String
	},
	year: {
		type: String
	},
	anc_visits: {
		type: String
	},
	place_of_delivery: {
		type: String
	},
	maturity: {
		type: String
	},
	duration_of_labor: {
		type: String
	},
	delivery_type: {
		type: String
	},
	birth_weight: {
		type: String
	},
	sex: {
		type: String
	},
	outcome: {
		type: String
	},
	peurperium:{
		type: String
	},
	notes: {
		type: String
	}
});

//# FIRST VISIT SCHEMA
var firstVisitSchema = new Schema({
	bp: {
		type: String
	},
	height: {
		type: String
	},
	cvs: {
		type: String
	},
	resp: {
		type: String
	},
	breasts: {
		type: String
	},
	abdomen: {
		type: String
	},
	vaginal_exam: {
		type: String
	},
	discharge: {
		type: String
	},
	general_description: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# ANTENATAL PROFILE SCHEMA
/**
 * REMOVED IN FAVOR OF COMPREHENSIVE BLOOD TYPE STRING
 * 
 	rhesus: {
		type: String
	},
 * 
 * **/
var antenatalProfileSchema = new Schema({
	hb: {
		type: String
	},
	blood_group: {
		type: String
	},
	
	serology: {
		type: String
	},
	tb: {
		type: Boolean
	},
	hiv: {
		type: Boolean
	},
	urinalysis: {
		type: String
	},
	couple_testing: {
		type: String
	}
});

//# PRESET PREGNANCY VISITS
var presetPregnancyVisitsSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	bp: {
		type: String
	},
	hb: {
		type: String
	},
	weight: {
		type: String
	},
	pallor: {
		type: String
	},
	maturity: {
		type: String
	},
	fundal_height: {
		type: String
	},
	presentation: {
		type:String
	},
	lie: {
		type: String
	},
	foetal_heart: {
		type: String
	},
	foetal_movement: {
		type: String
	},
	urinalysis: {
		type: String
	},
	next_visit: {
		type: Date
	}
});

//# WEIGHT MONITORING SCHEMA
var weightMonitoringSchema = new Schema({
	weight: {
		type: Number,
		required: true
	},
	week: {
		type: Number,
		required: true,
		unique: true
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		defaultr: new Date
	}
});

//# TETENUS TOXOID SCHEMA
var tetenusToxoidSchema = new Schema({
	number: {
		type: Number,
		required: true
	},
	week: {
		type: Number,
		required: true
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# MALARIA PROPHYXALIS SCHEMA
var malariaProphyxalisSchema = new Schema({
	number: {
		type: Number,
		required: true
	},
	week: {
		type: Number,
		required: true
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# FERROUS FUMARATE SCHEMA
var ferrousFumarateSchema = new Schema({
	number: {
		type: Number,
		required: true
	},
	week: {
		type: Number,
		required: true
	},
	dose: {
		type: Number,
		required: true
	},
	notes:{
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# PMTCT SCHEMA
var pmtctSchema = new Schema({
	arv_prophylaxis: {
		type: String
	},
	baby: {
		type: String
	},
	mother_arv: {
		type: String
	}
});

//@ TREATED NET SCHEMA
var treatedNetSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	issued: {
		type: Boolean	
	},
	notes: {
		type: String
	}
});

//@ DEWORMING SCHEMA
var dewormingSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	issued: {
		type: Boolean	
	},
	notes: {
		type: String
	}
});

//# PREVENTATIVE SERVICES SCHEMA
var preventativeServicesSchema = new Schema({
	tetenus_toxoid: [tetenusToxoidSchema],
	malarial_prophylaxis: [malariaProphyxalisSchema],
	ferrous_fumurate: [ferrousFumarateSchema],
	pmtct: [pmtctSchema],
	treated_net: [treatedNetSchema],
	deworming: [dewormingSchema]
});

//@ DRUGS MOTHER SCHEMA
var drugsMotherSchema = new Schema({
	oxytoxin: {
		type: Boolean,
		default: false
	},
	azt3ct: {
		type: Boolean,
		default: false
	},
	notes: {
		type: String
	}
});

//@ DRUGS CHILD SCHEMA
var drugsChildSchema = new Schema({
	vitamin_a: {
		type: Boolean,
		default: false
	},
	nvp: {
		type: Boolean,
		default: false
	},
	vitamin_k: {
		type: Boolean,
		default: false
	},
	teo: {
		type: Boolean,
		default: false
	}
});


//# DRUGS SCHEMA
var drugSchema = new Schema({
	drugs_mother: [drugsMotherSchema],
	drugs_child: [drugsChildSchema],
	date:{
		type: Date,
		default: new Date
	}
	
});

//# MOTHER EXAMINATION SCHEMA
var motherExaminationSchema = new Schema({
	bp: {
		type: String
	},
	temp: {
		type: String
	},
	pulse: {
		type: String
	},
	respitory_rate: {
		type: String
	},
	condition: {
		type: String
	},
	breast: {
		type: String
	},
	cs_scar: {
		type: String
	},
	uterine_involution: {
		type: String
	},
	episiotomy_condition: {
		type: String
	},
	lochia: {
		type: String
	},
	pelvic_exam: {
		type: String
	},
	hb: {
		type: String
	},
	hiv: {
		type: Boolean
	},
	vitamin_a: {
		type: Boolean
	},
	art_prophylaxis: {
		type: String
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
	
});

//# CHILD EXAMINATION SCHEMA
var childExaminationSchema = new Schema({
	condition: {
		type: String
	},
	temp: {
		type: Number
	},
	breaths: {
		type: String
	},
	breastfeeding_position: {
		type: String
	},
	umbilical_chord: {
		type: String
	},
	immunization_started: {
		type: Date
	},
	arv_prophylaxis :{
		type: String
	},
	cotrimoxazole_prophylaxis: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
	
});

//# POST NATAL EXAMINATION SCHEMA
var postNatalExaminationSchema = new Schema({
	timing: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	},
	mother_examination: [motherExaminationSchema],
	child_examination: [childExaminationSchema]	
});

//# CONDUCTOR SCHEMA
var conductorSchema = new Schema({
	title:{
		type: String
	},
	notes :{
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# DELIVERY SCHEMA
var deliverySchema = new Schema({
	weeks: {
		type: Number,
		required: true
	},
	delivery_mode: {
		type: String
	},
	date :{
		type: Date,
		required: true
	},
	blood_loss: {
		type: String
	},	
	condition_mother: {
		type: String
	},
	condition_child: {
		type: String
	},
	agpar_score: {
		type: String
	},
	rescuscitation: {
		type: Boolean,
		default: false
	},
	delivery_place: {
		type: String
	},
	drugs: [drugSchema],
	conductor: [conductorSchema],
	post_natal_examination : [postNatalExaminationSchema],
	recorded: {
		type: Date,
		default: new Date
	}
});

//# PREGNANCY SCHEMA
var pregnancySchema = new Schema({
	first_visit: [firstVisitSchema],
	antenatal_profile: [antenatalProfileSchema],
	preset_pregnancy_visits: [presetPregnancyVisitsSchema],
	weight_monitoring: [weightMonitoringSchema],
	preventative_services: [preventativeServicesSchema],
	special_notes: [specialNotesSchema],
	delivery: [deliverySchema]
});


//# PREGNANCIES SCHEMA
var pregnanciesSchema = new Schema({
	pregnancy: [pregnancySchema],
	special_notes: [specialNotesSchema],
	maternal_profile: [maternalProfileSchema]
});



//# FAMILY PLANNING SCHEMA
var familyPlanningSchema = new Schema({
	date: {
		type: String,
		default: new Date
	},
	notes: {
		type: String
	},
	next_visit: {
		type: Date
	}
});

//# BIRTH RECORD SCHEMA
var birthRecordSchema = new Schema({
	place_of_birth: {
		type: String
	},
	birth_notification_no : {
		type: String
	},	
	permanent_register_no : {
		type: String
	},
	cwc_no: {
		type: String
	},
	health_facility: {
		type: String
	},
	master_facility_list_no: {
		type: String
	},
	date :{
		type: Date,
		default: new Date
	}
});

//# CIVIL REGISTRATION SCHEMA
var civilRegistrationSchema = new Schema({
	birth_certificate_no : {
		type: String
	},
	date_of_registration: {
		type: Date
	},
	place_of_registration: {
		type: String
	},
	congenital_abnormalities:{
		type: String
	}
});

//# BIRTH DETAILS
var birthDetailsSchema = new Schema({
	dob: {
		type: Date,
		required: true,
		default: new Date
	},
	gestation: {
		type: Number
	},
	birth_weight: {
		type: Number
	},
	birth_length: {
		type: Number
	},	
	birth_order: {
		type: String
	},
	date_first_seen: {
		type: Date
	},
	characteristics: {
		type: String
	},
	birth_record: [birthRecordSchema],
	civil_registration: [civilRegistrationSchema]
});

//# GUARDIAN SCHEMA
var guardianSchema = new Schema({
	relationship: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	telephone: [telephoneSchema],
	notes: {
		type: String
	},
	date: {
		type: Date,
		default : new Date
	}
});

//# RESIDENCE SCHEMA
var residenceSchema = new Schema({
	country: {
		type: String,
		default: "KENYA"
	},
	county: {
		type:String
	},
	district: {
		type:String
	},
	division: {
		type:String
	},
	location: {
		type:String
	},
	town: {
		type:String
	},
	village: {
		type:String
	},
	postal_address: {
		type:String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# FAMILY PARTICULARS SCHEMA
var familyParticularsSchema = new Schema({	
	guardian: [guardianSchema],
	residence: [residenceSchema]	
});

//# FIRST CLINIC SCHEMA
var firstClinicSchema = new Schema({
	age: {
		type:Number,
		required: true
	},
	weight: {
		type: Number,
		required: true
	},
	length: {
		type: Number,
		required: true
	},
	physical_features: {
		type: String
	},
	coloration: {
		type: String
	},
	head_circumference: {
		type: Number
	},
	eyes: {
		type: String
	},
	ears: {
		type: String
	},
	mouth: {
		type: String
	},
	chest: {
		type: String
	},
	heart: {
		type: String
	},
	abdomen: {
		type: String
	},
	umbilicus: {
		type: String
	},
	spine: {
		type: String
	},
	arms_hands: {
		type: String
	},
	legs_feet: {
		type: String
	},
	genitalia: {
		type: String
	},
	anus: {
		type: String
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});


//# FEEDING SCHEMA
var feedingSchema = new Schema({
	breastfeeding: {
		type: Boolean
	},
	food_below_six_months: {
		type: Boolean
	},
	indigestion: {
		type: Boolean
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# BEHAVIOR SCHEMA
var behaviorSchema = new Schema({
	sleep_wake_cycle: {
		type: String
	},
	irritability: {
		type: Boolean
	},
	finger_sucking :{
		type: Boolean
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
});

//# CHILD CHARACTER SCHEMA
var childCharacterSchema = new Schema({
	feeding: [feedingSchema],
	behavior: [behaviorSchema]	
});

//# IMPAIRMENT SCHEMA
var imparmentsSchema = new Schema({
	head_size : {
		type: Boolean
	},
	gum_mouth:{
		type: Boolean
	},
	arms_legs: {
		type: Boolean
	},
	muscle_tone: {
		type: Boolean
	},
	joints: {
		type: Boolean
	},
	fingers_toes: {
		type: Boolean
	},
	arms_shoulders: {
		type: Boolean
	},
	spina_bifida: {
		type: Boolean
	},
	imperforate_anus: {
		type: Boolean
	},
	cerebral_palsy: {
		type: Boolean
	},
	notes: {
		type: String
	},
	date: {
		type: Date,
		default: new Date
	}
})

//# CHILD WEIGHT MONITORING SCHEMA
var childWeightMonitoringSchema = new Schema({
		weight: {
			type: Number,
			required: true
		},
		height: {
			type: Number,
			required: true
		},
		week: {
			type: Number,
			required: true,
			unique: true
		},
		date: {
			type: Date,
			default: new Date
		},
		notes: {
			type: String
		}
});

//# SCHEDULED VISITS SCHEMA
var scheduledVisitsSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	reason: {
		type: String,
		required: true
	},
	notes: {
		type: String
	}
});

var vaccineLayout = {
	date: {
		type: Date,
		default: new Date
	},
	number: {
		type: Number
	},
	dose: {
		type: Number
	},
	week: {
		type: Number,
		required: true
	},
	notes: {
		type: String
	},
	next_visit: {
		type: String
	}
};

//# VACCINE REACTIONS SCHEMA
var vaccineReactionsSchema = new Schema({
	date : {
		type: Date,
		default: new Date
	},
	vaccine: {
		type: String
	},
	batch: {
		type: String
	},
	manufactured: {
		type: Date
	},
	expiry: {
		type: Date
	},
	description: {
		type: String
	},
	notes: {
		type: String
	}	
});

//# CONSULTATIONS SCHEMA
var consultationsSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	notes: {
		type: String
	},
	consultant: {
		type: String
	}
});

//# ADMISSIONS SCHEMA
var admissionsSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	hospital :{
		type: String
	},
	admission_number: {
		type: String
	},
	admitted: {
		type:Date,
		default: new Date
	},
	discharged: {
		type: Date
	},
	notes: {
		types: String
	}
});

//# SPECIAL CLINIC SCHEMA
var specialClinicSchema = new Schema({
	date: {
		type: Date,
		default: new Date
	},
	hospital: {
		type: String
	},
	clinic :{ 
		type: String
	},
	reason: {
		type: String
	},
	notes: {
		type: String
	}
});

//# HOSPITAL RECORDS SCHEMA
var hospitalRecordsSchema = new Schema({
	consultations	: [consultationsSchema],
	admissions		: [admissionsSchema],
	special_clinic	: [specialClinicSchema]
});

//# IMMUNIZATION SCHEMA
var immunizationSchema = new Schema({
	bcg 		: [vaccineLayout],
	polio		: [vaccineLayout],
	pneumococal : [vaccineLayout],
	rota_virus	: [vaccineLayout],
	dpthh		: [vaccineLayout],
	measles		: [vaccineLayout],
	yellow_fever: [vaccineLayout],
	vitamin_a	: [vaccineLayout],
	deworming	: [vaccineLayout],
	other_vaccines : [vaccineLayout],
	vaccine_reactions: [vaccineReactionsSchema],
	hospital_records : [hospitalRecordsSchema]
});


//# CHILD SCHEMA
var childSchema = new Schema({
	name: {
		type: String
	},
	sex: {
		type: String
	},
	birth_details: [birthDetailsSchema],
	family_particulars: [familyParticularsSchema],
	first_clinic: [firstClinicSchema],
	child_character: [childCharacterSchema],
	impairments: [imparmentsSchema],
	child_weight_monitoring: [childWeightMonitoringSchema],
	scheduled_visits: [scheduledVisitsSchema],
	immunization: [immunizationSchema]
});


//# CHILDREN SCHEMA
var childrenSchema = new Schema({	
	date: {
		type: Date,
		default: new Date
	},
	notes: {
		type: String
	},
	child: [childSchema]
});

//@@ THE MAIN MOTHER SCHEMA
var motherSchema = new Schema({
	name: { 
				type: String, 
				required: true 
		  },
    age :{
		type: Number
	},
    identification: {
		type: String,
		required: true,
		unique: true
	},
	telephone: [telephoneSchema],
	dob: {
			type: Date, 
			required: true
		},
	occupation: [occupationSchema],
	height: {
				type: String
			},
	gravida: {
				type: String
			 },
    parity:  {
				type: String
			 },
	residence: [residenceSchema],
	next_of_kin: [nextOfKinSchema],
	pregnancies: [pregnanciesSchema],
	children: [childrenSchema],
	medical_history: [medicalHistorySchema],
	special_notes: [specialNotesSchema],
	family_history: [familyHistorySchema],
	hospital_membership: [hospitalMembershipSchema],
	post_natal_examination: [postNatalExaminationSchema],
	family_planning: [familyPlanningSchema]
		
});

schema.Mother = mongoose.model("Mother", motherSchema );