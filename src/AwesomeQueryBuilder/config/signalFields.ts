import { Fields } from "react-awesome-query-builder"

const signalFields: Fields = {
  Domains: {
    label: "Domains",
    type: "!group",
    subfields: {
      Names: {
        label: "Names",
        type: "multiselect",
        // valueSources: ["value"],
        operators: ["multiselect_equals"],
        listValues: [
          { value: "yahoo.com", title: "yahoo.com" },
          { value: "gmail.com", title: "gmail.com" },
          { value: "aol.com", title: "aol.com" },
          { value: "hotmail.com", title: "hotmail.com" },
          { value: "outlook.com", title: "outlook.com" },
        ],
      },
      Groups: {
        label: "Groups",
        type: "multiselect",
        // valueSources: ["value"],
        operators: ["multiselect_equals"],
        listValues: [
          { value: "Yahoo", title: "Yahoo" },
          { value: "Gmail", title: "Gmail" },
          { value: "AOL", title: "AOL" },
          { value: "Hotmail", title: "Hotmail" },
          { value: "Outlook", title: "Outlook" },
        ],
      },
    },
  },
  DateOfBirth: {
    label: "Date of Birth",
    type: "date",
    valueSources: ["value"],
    // fieldSettings: {
    //   dateFormat: "M-D-YYYY",
    // },
  },
  Gender: {
    label: "Gender",
    type: "select",
    operators: ["select_equals"],
    listValues: ["Male", "Female"],
    // valueSources: ["value"],
  },
  HealthcareSurvey: {
    label: "Healthcare Survey",
    tooltip: "Healthcare provider indicated in a survey",
    type: "multiselect",
    operators: ["multiselect_equals"],
    listValues: [
      { value: "NoInsurance", title: "No insurance" },
      { value: "BCBS", title: "Blue Cross Blue Shield" },
      { value: "UHC", title: "United Healthcare" },
      { value: "Aetna", title: "Aetna" },
      { value: "Other", title: "Other" },
    ],
    // valueSources: ["value"],
  },
  Signal: {
    label: "Signal",
    tooltip: "Indicators of user engagement",
    type: "!group",
    subfields: {
      Attributors: {
        label: "Attributors",
        tooltip: "The source of the signal",
        type: "multiselect",
        operators: ["multiselect_equals"],
        listValues: ["Onpoint", "XVerify", "EmailOversight"],
        // valueSources: ["value"],
      },
      RecordTypes: {
        label: "Record Types",
        tooltip: "The type of signal",
        type: "multiselect",
        operators: ["multiselect_equals"],
        listValues: ["Lead", "Verified"],
        // valueSources: ["value"],
      },
      Seen: {
        label: "Seen",
        type: "!struct",
        subfields: {
          Days: {
            label: "Days",
            type: "number",
            preferWidgets: ["number"],
            fieldSettings: {
              min: 0,
            },
          },
        },
      },
    },
  },
  SignalGroup: {
    label: "Signal Group",
    type: "select",
    operators: ["select_equals"],
    listValues: ["Tier1 Suppression", "Tier2 Suppression"],
  },
  SignalCustom: {
    label: "Signal (Custom)",
    type: "signal",
    listValues: ["Tier1 Suppression", "Tier2 Suppression"],
  }
}

export default signalFields
