<!---
This file is auto generated, please do not edit it by hand
-->
# Docs
A single class is exported by welbe_api.
```JavaScript
var WelbeAPI = require('welbe_api')
var welbe = new WelbeAPI(username, password)
```

Many of the actual URL paths require a `userId`, however this is taken care of for you.
All methods take a single `params` hash and the second argument is a callback.

For Example:
```JavaScript
welbe.trackWater({ounces: 24}, function(err, resp) {
  ...
})
```

The responses are the raw response from the welbe API, most of which aren't documented


## Methods
### trackActivity
Track activities

#### Params
- type - **type:** string, **description:** An enum of the following activity types: [running, walking, cardio, cycling, yoga, weights, stairs, other]
- minutes - **type:** number
- intensity - **type:** number, **description:** A number describing intesnity of exercise from 1 (lowest) to 5 (highest), **default:** 3


### trackMeal
Track meal portions

#### Params
- fruits - **type:** number
- proteins - **type:** number
- sweets - **type:** number
- fats - **type:** number
- vegetables - **type:** number
- grains - **type:** number
- dairy - **type:** number


### trackSleep
Track sleep

#### Params
- minutes - **type:** number
- started_at - **type:** string, **description:** A date string in ISO8601 of when you started sleeping, **default:** Minutes given subtracted from current time


### trackBodyMetric
Track body metrics

#### Params
- weight - **type:** string, **description:** Numeric weight as a string, ex: &#x27;150&#x27;
- blood_pressure - **type:** string, **description:** systolic and diastolic seperate with a space, ex: &#x27;120 70&#x27;
- waists_circumference - **type:** string, **description:** Numeric string in inches, ex: &#x27;32&#x27;
- fat_percent - **type:** string, **description:** Bodyfat percentage as numeric string, ex: &#x27;12&#x27;
- pulse - **type:** string, **description:** Pulse as BPM as number string, ex: &#x27;70&#x27;
- ldl_cholesterol - **type:** string, **description:** LDL cholesterol as a numeric string, ex: &#x27;90&#x27;
- glucose - **type:** string, **description:** Glucose level as mg/dl as numeric string, ex: &#x27;70&#x27;


### trackSavings
Track ways you saved

#### Params
- saving_type_ids - **type:** array, **description:** Array of saving type ids, these can be retrieved via &#x60;getTodaysSavingTypes&#x60;, not sure what these are all but thermostat adjust is 27 and carpool is 47


### trackWater
Track water consumed

#### Params
- ounces - **type:** string, **description:** Ounces of water as numeric string, ex: &#x27;24&#x27;
- taken_at - **type:** string, **description:** ISO8601 date of when water was drunk, **default:** the current time


### getEarnings
Retrieve earnings for week as well as currently tracked values


#### Returns
- available - **type:** number
- current_weekday - **type:** number, **description:** day of the week as number starting with monday, 1 - monday, 2- tuesday, etc
- day - **type:** hash, **description:** returns an object that describes the categories and what has been tracked so far
- start_date - **type:** string
- end_date - **type:** string
- notifications - **type:** array, **description:** An array of objects that are reminders to track, etc
- total - **type:** number, **description:** Total amount in cash earned, as a float
- week - **type:** array, **description:** Array of objects with each object for a weekday and how much is earned and left to be earned
- week_totals - **type:** hash, **description:** Availiable to be earned and total for the week

### getCompany
Retrieve company

#### Params
- companyId - **type:** number, **description:** The id of your company


### getCurrentUser
Retrieve info for logged in user


#### Returns
- id - **type:** number, **description:** the user id

### getTodaysSavingTypes
Retrieve the possible ways to save for today



