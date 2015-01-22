module.exports = {
  addActivity: {
    method: "post",
    desc: "Track activities",
    url: "/users/{{userId}}/activities",
    fieldName: "activity",
    params: {
      type: {
        type: ["running", "walking", "cardio", "cycling", "yoga", "weights", "stairs", "other"],
        desc: "An enum of the following activity types (perhaps anything works?)"
      },
      minutes: "number",
      intensity: [1, 2, 3, 4, 5]
    }
  },
  addMeal: {
    method: "post",
    desc: "Track meal portions",
    url: "/users/{{userId}}/meals",
    fieldName: "meal",
    params: {fruits: "number", proteins: "number", sweets: "number", fats: "number", vegetables: "number", grains: "number", dairy: "number"}
  },
  addSleep: {
    method: "post",
    desc: "Track sleep",
    url: "/users/{{userId}}/sleep",
    fieldName: "sleep",
    params: {minutes: "number", started_at: {type: "string", desc:"A date string in ISO8601 of when you started sleeping"}}
  },
  addBodyMetric: {
    method: "post",
    desc: "Track body metrics",
    url: "/users/{{userId}}/body-metrics",
    fieldName: "body_metrics",
    note: "Only send a single param at once, for example, either weight or waists_circumference, but not both in the same request",
    params: {
      weight: {type: "string", desc: "Numeric weight as a string, ex: '150'"},
      blood_pressure: {type: "string", desc: "systolic and diastolic seperate with a space, ex: '120 70'"},
      waists_circumference: {type: "string", desc: "Numeric string in inches, ex: '32'"},
      fat_percent: {type: "string", desc: "Bodyfat percentage as numeric string, ex: '12'"},
      pulse: {type: "string", desc: "Pulse as BPM as number string, ex: '70'"},
      ldl_cholesterol: {type: "string", desc: "LDL cholesterol as a numeric string, ex: '90'"},
      glucose: {type: "string", desc: "Glucose level as mg/dl as numeric string, ex: '70'"}
    }
  },
  addSavings: {
    method: "post",
    desc: "Track ways you saved",
    url: "/users/{{userId}}/savings",
    fieldName: "savings",
    params: {saving_type_ids: {type: "array", desc: "Array of saving type ids, these can be retrieved via `getTodaysSavingTypes`, not sure what these are all but thermostat adjust is 27 and carpool is 47"}}
  },
  addWater: {
    method: "post",
    desc: "Track water consumed",
    url: "/users/{{userId}}/water",
    fieldName: "water",
    params: {
      ounces: {type: "string", desc: "Ounces of water as numeric string, ex: '24'"},
      taken_at: {type: "string", desc: "ISO8601 date of when water was drunk"}
    }
  },
  getEarnings: {
    method: "get",
    desc: "Retrieve earnings for week as well as currently tracked values",
    url: "/users/{{userId}}/earnings",
    returns: {
      available: "number",
      current_weekday: {type: "number", desc: "day of the week as number starting with monday, 1 - monday, 2- tuesday, etc"},
      day: {type: "hash", desc: "returns an object that describes the categories and what has been tracked so far"},
      start_date: "string",
      end_date: "string",
      notifications: {type: "array", desc: "An array of objects that are reminders to track, etc"},
      total: {type: "number", desc: "Total amount in cash earned, as a float"},
      week: {type: "array", desc: "Array of objects with each object for a weekday and how much is earned and left to be earned"},
      week_totals: {type: "hash", desc:"Availiable to be earned and total for the week"}
    }
  },
  getCompany: {
    method: "get",
    desc: "Retrieve company",
    url: "/companies/{{companyId}}",
    params: {
      companyId: {type: "number", desc: "The id of your company"}
    },
    note: "return values not yet mapped"
  },
  getCurrentUser: {
    method: "get",
    desc: "Retrieve info for logged in user",
    url: "/users/current",
    note: "many return values not mapped",
    returns: {
      id: {type: "number", desc: "the user id"}
    }
  },
  getTodaysSavingTypes: {
    method: "get",
    desc: "Retrieve the possible ways to save for today",
    url: "/users/{{userId}}/saving-types/todays-savings",
    note: "return values not mapped, but they contain the saving_type_ids"
  }
}

