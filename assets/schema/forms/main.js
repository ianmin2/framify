var formSchema  = [		
	{
		//# SO ADD TELEPHONE 
		
		"formName": "telephone",
		"formData": [
			{
				"key": "title",
				"label": "Tel Type",
				"field": "select",
				"default": "Mobile",
				"options":[
					{"name": "Mobile", "value": "Mobile"},
					{"name": "Work", "value": "Work"},
					{"name": "Home", "value": "Home"}
				]
			},{
				"key": "number",
				"label": "Tel Number",
				"fieldType": "tel"
			}
		]
		
		//# EO ADD TELEPHONE
	},
	
	{
		//# SO ADD OCCUPATION
		
		"formName": "occupation",
		"formData": [
			{
				"key": "title",
				"label": "Occupation"
			}
		]
		
		//# EO ADD OCCUPATION
	},
	
	{
		//# SO NEXT OF KIN
		
		"formName": "next_of_kin",
		"formData": [
			{
				"key" : "name"				
			},
			{
				"key": "relationship",
				"field": "select",
				"default": "Spouse",
				"options": [
							{ "name":"Spouse", "value": "Spouse" },
							{ "name":"Parent", "value": "Parent" },
							{ "name":"Sibling", "value": "Sibling" },
							{ "name":"Friend", "value": "Friend" }
							]
			}			
		]
		
		//# EO NEXT OF KIN
	},
	
	{
		//# SO SURGICAL HISTORY
		
		"formName" : "surgical_history",
		"formData" : [
			{
				"key": "title"
			},
			{
				"key": "description",
				"field": "textarea"
			},
			{
				"key": "notes", 
				"field" :"textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		
		//# EO SURGICAL HISTORY
	},
	
	{
		//# SO DIABETES 
		
		"formName": "diabetes",
		"formData": [
			{
				"key" :"exists",
				"field" :"select",
				"default": false,
				"options": [
					{"value": false, "name": "No"},
					{"value": true, "name": "Yes"}
				]
			},
			{
				"key": "notes", 
				"field" :"textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		
		//# EO DIABETES
	},
		
	{
		//# SO TUBERCULOSIS
		
		"formName": "tuberculosis",
		"formData": [
			{
				"key" :"exists",
				"field" :"select",
				"default": false,
				"options": [
					{"value": false, "name": "No"},
					{"value": true, "name": "Yes"}
				]
			},
			{
				"key": "notes", 
				"field" :"textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		
		//# EO TUBERCULOSIS
	},
	
	{
		//# SO TWINS
		"formName": "twins",
		"formData": [
			{
				"key" :"exists",
				"field" :"select",
				"default": false,
				"options": [
					{"value": false, "name": "No"},
					{"value": true, "name": "Yes"}
				]
			},
			{
				"key": "notes", 
				"field" :"textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO TWINS
	},
	
	{
		//# SO HYPERTENSION
		"formName": "hypertension",
		"formData": [
			{
				"key" :"exists",
				"field" :"select",
				"default": false,
				"options": [
					{"value": false, "name": "No"},
					{"value": true, "name": "Yes"}
				]
			},
			{
				"key": "notes", 
				"field" :"textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO HYPERTENSION
	},
	
	{
		//# SO OTHER FAMILY HISTORY
		"formName": "other_family_history",
		"formData": [
			{
				"key": "title"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO OTHER FAMILY HISTORY
	},
	
	
	{
		//# SO DRUG ALLERGIES
		
		"formName": "drug_allergies",
		"formData": [
			{
				"key": "name",
				"label": "Drug Name"
			},
			{
				"key": "reaction",
				"field": "textarea"
			},
			{
				"key": "diagnosed",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		
		//# EO DRUG ALLERGIES
	},
	
	{
		//# SO BLOOD TRANSFUSION
		
		"formName": "blood_transfusion",
		"formData": [
			{
				"key": "reason",
				"field": "textarea"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		
		//# EO BLOOD TRANSFUSION
	},
	
	{
		//# SO HOSPITAL MEMBERSHIP
		"formName": "hospital_membership",
		"formData": [
			{
				"key": "hospital_name"
			},
			{
				"key": "account_number"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO HOSPITAL MEMBERSHIP
	},
	
	{
		//# SO SPECIAL NOTES
		"formName": "special_notes",
		"formData": [
			{
				"key":"message",
				"field": "textarea"
			},
			{
				"key": "signed"
			}
		]
		//# EO SPECIAL NOTES
	},
	
	{		
		//# SO MATERNAL PROFILE
		"formName": "maternal_profile",
		"formData": [
			{
				"key": "pregnancy_order"
			},
			{
				"key": "year"
			},
			{
				"key": "anc_visits"
			},
			{
				"key": "place_of_delivery"
			},
			{
				"key": "maturity"
			},
			{
				"key": "duration_of_labor"
			},
			{
				"key": "delivery_type"
			},
			{
				"key": "birth_weight"
			},
			{
				"key": "sex",
				"field": "select",
				"options": [
					{"name": "Male", "value": "Male"},
					{"name": "Female", "value": "Female"},
					{"name": "Hermaphrodyte", "value": "Hermaphrodyte"},
					{"name": "Other", "value": "Other"}
				]
			},
			{
				"key": "outcome"
			},
			{
				"key": "peuperium"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO MATERNAL PROFILE
	},
	
	{
		//# SO FIRST VISIT
		"formName": "first_visit",
		"formData": [
			{
				"key": "bp"
			},
			{
				"key": "height"
			},
			{
				"key": "cvs"
			},
			{
				"key": "resp",
				"label": "Responsiveness"
			},
			{
				"key": "breasts"
			},
			{
				"key": "abdomen"
			},
			{
				"key": "vaginal_exam"
			},
			{
				"key": "discharge"
			},
			{
				"key": "general_description",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO FIRST VISIT
	},
	
	{
		//# SO ANTENATAL PROFILE
		"formName": "antenatal_profile",
		"formData": [
			{
				"key": "hb"
			},
			{
				"key": "blood_group",
				"field": "select",
				"options": [
					{"name":"A", "value": "A"},
					{"name":"A-", "value": "A-"},
					{"name":"B+", "value": "B+"},
					{"name":"B-", "value": "B-"},
					{"name":"AB+", "value": "AB+"},
					{"name":"AB-", "value": "AB-"},
					{"name":"O+", "value": "O+"},
					{"name":"O-", "value": "O-"},
					{"name":"Other","value":"Other"}
					
				]
			},
			{
				"key": "tb",
				"field": "select",
				"label": "Tuberculosis",
				"default": false,
				"options": [
					{"name":"No", "value": false},
					{"name":"Yes", "value": true}
				]	
			},
			{
				"key": "hiv",
				"field": "select",
				"label": "H.I.V",
				"default": false,
				"options": [
					{"name":"No", "value": false},
					{"name":"Yes", "value": true}
				]	
			},
			{
				"key": "urinalysis",
				"field": "textarea"
			},
			{
				"key": "couple_testing",
				"field": "textarea",
				"placeholder": "Couple testing data"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
			
		]
		//# EO ANTENATAL PROFILE
	},
	
	{
		//# SO PREGNANCY VISITS
		"formName": "pregnancy_visits",
		"formData": [
			
			{
				"key": "bp"
			},
			{
				"key": "hb"
			},			
			{
				"key": "weight",
				"fieldType": "number"
			},
			{
				"key": "pallor"
			},
			{
				"key": "maturity"
			},
			{
				"key": "fundal_height"
			},
			{
				"key": "presentation"
			},
			{
				"key": "lie"
			},
			{
				"key": "foetal_heart",
				"field": "select",
				"default": false,
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "foetal_movement",
				"field": "select",
				"default": false,
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "next_visit"
			},
			{
				"key": "urinalysis",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO PREGNANCY VISITS
	},
	
	{
		//# WEIGHT MONITORING SCHEMA
		"formName": "weight_monitoring",
		"formData": [
			{
				"key": "weight",
				"fieldType": "number"
			},
			{
				"key": "height",
				"fieldType": "number"
			},
			{
				"key": "week",
				"fieldType": "number"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# WEIGHT MONITORING SCHEMA
	},
	
	{
		//# SO TETENUS TOXOID
		"formName": "tetenus_toxoid",
		"formData": [
			{
				"key": "number",
				"fieldType": "number"
			},
			{
				"key": "week",
				"fieldType": "number"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO TETENUS TOXOID
	},
	
	{
		//# SO MALARIA PROPHYXALIS
		"formName": "malaria_prophyxalis",
		"formData": [
			{
				"key": "number",
				"fieldType": "number"
			},
			{
				"key": "week",
				"fieldType": "number"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO MALARIA PROPHYXALIS
	},
	
	{
		//# SO FERROUS FUMARATE SCHEMA
		"formName": "ferrous_fumarate",
		"formData": [
			{
				"key": "number",
				"fieldType": "number"
			},
			{
				"key": "week",
				"fieldType": "number"
			},
			{
				"key": "dose",
				"label": "Tablets/Dose",
				"fieldType": "number"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO FERROUS FUMURATE SCHEMA
	},
	
	{
		//# SO PMTCT
		"formName": "pmtct",
		"formData": [
			{
				"key": "arv_prophylaxis",
				"field": "textarea"
			},
			{
				"key": "baby",
				"field": "textarea"
			},
			{
				"key": "mother_arv",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO PMTCT
	},
	
	{
		//# SO TREATED NET
		"formName": "treated_net",
		"formData": [
			{
				"key": "issued",
				"field": "select",
				"default": false,
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO TREATED NET
	},
	
	{
		//# SO DEWORMING
		"formName": "deworming",
		"formData": [
			{
				"key": "issued",
				"field": "select",
				"default": false,
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO DEWORMING
	},
	
	{
		//# SO DRUGS MOTHER
		"formName": "drugs_mother",
		"formData": [
			{
				"key": "oxytocin",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "azt3ct",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO DRUGS MOTHER
	},
	
	{
		//# SO DRUGS CHILD
		"formName": "drugs_child",
		"formData": [
			{
				"key": "vitamin_a",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "vitamin_k",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "nvp",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "teo",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO DRUGS CHILD
	},
	
	{
		//# SO MOTHER EXAMINATION
		"formName": "mother_examination",
		"formData": [
			{
				"key": "bp"
			},
			{
				"key": "hb"
			},
			{
				"key":"temp"
			},
			{
				"key": "pulse"
			},
			{
				"key": "respitory_rate"
			},
			{
				"key": "condition"
			},
			{
				"key": "breast"
			},
			{
				"key": "cs_scar"
			},
			{
				"key": "uterine_involution"
			},
			{
				"key": "episiotomy_condition"	
			},
			{
				"key": "lochia"
			},
			{
				"key": "pelvic_exam"
			},
			{
				"key": "hiv",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "vitamin_a",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "art_propylaxis"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO MOTHER EXAMINATION
	},
	
	{	
		//# SO CHILD EXAMINATION
		"formName": "child_examination",
		"formData": [
			{
				"key": "condition"
			},
			{
				"key": "temp"
			},
			{
				"key": "breaths"
			},
			{
				"key": "breastfeeding_position"
			},
			{
				"key": "umbilical_chord"
			},
			{
				"key": "immunization_started"
			},
			{
				"key": "arv_prophylaxis"
			},
			{
				"key": "cotrimoxazole_prophylaxis"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO CHILD EXAMINATION	
	},
	
	
	{
		//# SO POSTNATAL EXAMINATION
		"formName": "postnatal_examination",
		"formData": [
			{
				"key": "timing"
			}
		]		
		//# EO POSTNATAL EXAMINATION
	},
	
	{
		//# SO CONDUCTOR
		"formName": "conductor",
		"formData": [
			{
				"key": "title",
				"field": "select",
				"options": [
					{"name": "Nurse", "value": "Nurse"},
					{"name": "Midwife", "value": "Midwife"},
					{"name": "Clinical Officer", "value": "Clinical Officer"},
					{"name": "Doctor", "value": "Doctor"},
					{"name": "Traditional Assistant", "value": "Traditional Assistant"},
					{"name": "Other", "value": "Other"}
				]
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO CONDUCTOR	
	},
	
	{
		//# SO DELIVERY
		"formName": "delivery",
		"formData": [
			{
				"key": "weeks",
				"fieldType": "number",
				"label": "Duration (weeks)"
			},
			{
				"key": "delivery_mode"
			},
			{
				"key": "blood_loss"
			},
			{
				"key": "condition_mother"
			},
			{
				"key": "condition_child"
			},
			{
				"key": "agpar_score"
			},
			{
				"key": "rescuscitation",
				"field": "select",
				"options": [
					{"name":"Yes", "value": true},
					{"name":"No", "value": false}
				]
			},
			{
				"key": "delivery_place"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO DELIVERY
	},
	
	{
		//# SO FAMILY PLANNING
		"formName": "family_planning",
		"formData": [
			{
				"key": "notes",
				"field": "textarea"
			},
			{
				"key": "next_visit"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO FAMILY PLANNING
	},
	
	{
		//# SO BIRTH RECORD
		"formName": "birth_record",
		"formData": [
			{
				"key": "place_of_birth"
			},
			{
				"key": "birth_notification_no"
			},
			{
				"key": "permanent_register_no"
			},
			{
				"key": "cwc_no"
			},
			{
				"key": "health_facity"
			},
			{
				"key": "master_facility_list_no"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO BIRTH RECORD
	},
	
	{
		//# SO CIVIL REGISTRATION
		"formName": "civil_registration",
		"formData": [
			{
				"key": "birth_certificate_no",
				"label": "Birth Cert #"
			},
			{
				"key": "date_of_registration",
				"label": "Registration Date"
			},
			{
				"key": "Place_of_registration"
			},
			{
				"key": "congenital_abnormalities",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO CIVIL REGISTRATION
	},
	
	{
		//# SO BIRTH DETAILS
		"formName": "birth_details",
		"formData": [
			{
				"key": "dob",
				"label": "Date"
			},
			{
				"key": "gestation",
				"label": "Gestation (wks)",
				"fieldType": "number"
			},
			{
				"key": "birth_weight",
				"fieldType": "number"
			},
			{
				"key": "birth_length",
				"fieldType": "number"
			},
			{
				"key": "birth_order"
			},
			{
				"key": "date_first_seen"
			},
			{
				"key": "characteristics",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO BIRTH DETAILS
	},
	
	{
		//# SO GUARDIAN
		"formName": "guardian",
		"formData": [
			{
				"key": "relationship",
				"field": "select",
				"default": "Parent",
				"options": [
					{"name": "Parent", "value": "Parent"},
					{"name": "Relative", "value": "Relative"},
					{"name": "Guardian", "value": "Guardian"}
				]
			},
			{
				"key": "notes",
				"field": "textarea"
			}
		]
		//# EO GUARDIAN
	},
	
	{
		//# SO RESIDENCE
		"formName": "residence",
		"formData": [
			{
				"key": "country",
				"field": "countries",
				"default": 112
			},
			{
				"key": "county"
			},
			{
				"key": "district"
			},
			{
				"key": "division"
			},
			{
				"key": "location"
			},
			{
				"key": "town"
			},
			{
				"key": "village"
			},
			{
				"key": "postal_address",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO RESIDENCE
	}, 
	
	{
		//# SO FIRST CLINIC
		"formName": "first_clinic",
		"formData": [
			{
				"key": "age",
				"label": "Age (wks)",
				"fieldType": "number"
			},
			{
				"key": "weight",
				"fieldType": "number"
			},
			{
				"key": "length",
				"fieldType": "number"
			},
			{
				"key": "physical_features"
			},
			{
				"key": "coloration"
			},
			{
				"key": "head_circumference",
				"fieldType": "number"
			},
			{
				"key": "eyes"
			},
			{
				"key": "ears"
			},
			{
				"key" :"mouth"
			},
			{
				"key": "chest"
			},
			{
				"key": "heart"
			},
			{
				"key": "abdomen"
			},
			{
				"key": "umbilicus"
			},
			{
				"key": "spine"
			},
			{
				"key": "arms_hands"
			},
			{
				"key": "legs_feet"
			},
			{
				"key": "genitalia"
			},
			{
				"key": "anus"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO FIRST CLINIC
	},
	
	{
		//# SO FEEDING
		"formName": "feeding",
        "formData": [
            {
                "key": "breastfeeding",
                "field": "select",
                "default": false,
                "options": [
                    {"name":"Yes", "value": true},
					{"name":"No", "value": false}
                ]
            },
            {
                "key": "food_below_six_months",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Yes", "value": true},
					{"name":"No", "value": false}
                ]
            },
			{
				"key": "indigestion",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Yes", "value": true},
					{"name":"No", "value": false}
                ]
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
        ]
		//#EO FEEDING
	},
	
	{
		//# SO BEHAVIOR
		"formName": "behavior",
		"formData": [
			{
				"key": "sleep_wake_cycle"
			},
			{
				"key": "irritability",
				"label": "Is Irritable?",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Yes", "value": true},
					{"name":"No", "value": false}
                ]
			},
			{
				"key": "finger_sucking",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Yes", "value": true},
					{"name":"No", "value": false}
                ]
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# SO BEHAVIOR
	},
	
	{
		//# SO IMPAIRMENTS
		"formName": "impairments",
		"formData": [
			{
				"key": "head_size",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "gum_mouth",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "arms_legs",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "muscle_tone",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "joints",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "fingers_toes",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "arms_shoulders",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "spina_bifida",
				"label": "Spine",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "imperfolate_anus",
				"label": "Anus",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "cerebral_palsy",
				"label": "Cerebrum",
				"field": "select",
                "default": false,
                "options": [
                    {"name":"Abnormal", "value": true},
					{"name":"Normal", "value": false}
                ]
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO IMPAIRMENTS
	},
	
	{
		//# SO SCHEDULED VISITS
		"formName" :"scheduled_visits",
		"formData": [
			{
				"key": "date"
			},
			{
				"key": "reason"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO SCHEDULED VISITS 
	},
	
	{
		//# SO VACCINE LAYOUT 
		"formName": "vaccine_layout",
		"formData": [
			{
				"key": "number",
				"fieldType": "number"
			},
			{
				"key": "dose",
				"fieldType": "number"
			},
			{
				"key": "week",
				"fieldType": "number"
			},
			{
				"key": "next_visit"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO VACCINE LAYOUT 
	},
	
	{
		//# SO VACCINE REACTIONS
		"formName": "vaccine_reactions",
		"formData": [
			{
				"key": "vaccine"
			},
			{
				"key": "batch"
			},
			{
				"key": "manufactured"
			},
			{
				"key": "expiry"
			},
			{
				"key": "description",
				"field": "textarea"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO VACCINE REACTIONS
	},
	
	{
		//# SO CONSULTATIONS
		"formName": "consultations",
		"formData": [
			{
				"key": "notes",
				"field": "textarea"
			},
			{
				"key": "consultant"	
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO CONSULTATIONS
	},
	
	{
		//# SO ADMISSIONS
		"formName": "admissions",
		"formData": [
			{
				"key" :"hospital"
			},
			{
				"key": "admission_number"
			},
			{
				"key": "admitted"
			},
			{
				"key": "discharged"
			},
			{
				"key": "notes",
				"field" :"textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO ADMISSIONS
	},
	
	{
		//# SO SPECIAL CLINIC
		"formName": "special_clinic",
		"formData": [
			{
				"key": "hospital"
			},
			{
				"key": "clinic"
			},
			{
				"key": "reason"
			},
			{
				"key": "notes",
				"field": "textarea"
			},
            {
                "key": "submit",
                "field": "submit", "label": "Save"
            }
		]
		//# EO SPECIAL CLINIC
	},
	
	{
		//# SO CHILD
		"formName": "child",
		"formData": [
			{
				"key": "name"
			},
			{
				"key": "sex",
				"field": "select",
				"options": [
					{"name": "Male", "value": "Male"},
					{"name": "Female", "value": "Female"},
					{"name": "Hermaphrodyte", "value": "Hermaphrodyte"},
					{"name": "Other", "value": "Other"}
				]
			}
		]
		//# EO CHILD
	},
	
	{
		//# SO CHILDREN
		"formName": "children",
		"formData": [
			{
				"key": "notes",
				"field": "textarea"
			}
		]
		//# EO CHILDREN
	},
	
	{
		//# SO MOTHER
		"formName": "mother",
		"formData": [
			{
				"key": "name"
			},
			{
				"key": "age",
				"fieldType": "number"
			},
			{
				"key": "identification"
			},
			{
				"key": "dob"
			},
			{
				"key": "height"
			},
			{
				"key": "gravida"
			},
			{
				"key": "parity"
			}
		]
		//# EO MOTHER
	}
]

//!EXPORT THE ARRAY
module.exports = formSchema;