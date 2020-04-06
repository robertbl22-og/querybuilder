import {nanoid} from 'nanoid';
import QueryBuilder, {Field} from "react-querybuilder";

export const combinators = [
    {name: 'union', label: 'AND'},
    {name: 'intersection', label: 'ALSO IN'},
    {name: 'minus', label: 'BUT NOT IN'},
];

export const sampleQueryConfig = {
    "Expression":
        {
            "Positive": [{
                "Domains": {
                    "Names": ["yahoo.com", "aol.com"],
                    "Groups": ["Yahoo", "Gmail"]
                },
                "DateOfBirth": "> 65y",
                "Gender": "m",
                "HealthcareSurvey": ["NoInsurance", "Bla"],
                "Signal": [{
                    "Attributors": ["Onpoint"],
                    "RecordTypes": ["Lead"],
                    "Seen": "BETWEEN 10d AND 12d"
                }, {
                    "Attributors": ["XVerify", "EmailOversight"],
                    "RecordTypes": ["Verified"],
                    "Seen": ">= 30d"
                }]
            }],
            "Negative": [{
                "Signal": [{
                    "SignalGroup": "Tier1 Suppression"
                },
                    {
                        "RecordTypes": "MailBounce",
                        "Seen": "< 90d"
                    }
                ]
            }]
        }
};

export const preparedFields = {
    secondary: [
        {name: 'Domains', label: 'Domains'},
        {name: 'DateOfBirth', label: 'Date of birth'},
        {name: 'Gender', label: 'Gender'},
        {name: 'HealthcareSurvey', label: 'Healthcare Survey'},
        {name: 'Signal', label: 'Signal'},
    ]
};

export const preparedQueries = {
    secondary: {
        id: `g-${nanoid()}`,
        rules: [
            {
                field: 'Domains',
                id: `r-${nanoid()}`,
                operator: '=',
                value: {
                    "Names": ["yahoo.com", "aol.com"],
                    "Groups": ["Yahoo", "Gmail"]
                }
            },
            {
                field: 'DateOfBirth',
                id: `r-${nanoid()}`,
                operator: '=',
                value: "1980-02-11"
            },
            {
                field: 'Gender',
                id: `r-${nanoid()}`,
                operator: '=',
                value: 'm'
            },
            {
                field: 'HealthcareSurvey',
                id: `r-${nanoid()}`,
                operator: '=',
                value: 'BCBS'
            },
            {
                field: 'Signal',
                id: `r-${nanoid()}`,
                operator: '=',
                value: [{
                    "Attributors": ["Onpoint"],
                    "RecordTypes": ["Lead"],
                    "Seen": "BETWEEN 10d AND 12d"
                }, {
                    "Attributors": ["XVerify", "EmailOversight"],
                    "RecordTypes": ["Verified"],
                    "Seen": ">= 30d"
                }]
            }
        ],
        combinator: 'or',
        not: false
    },
};

const defaultOperators = [
    { name: 'null', label: 'is null' },
    { name: 'notNull', label: 'is not null' },
    { name: 'in', label: 'in' },
    { name: 'notIn', label: 'not in' },
    { name: '=', label: '=' },
    { name: '!=', label: '!=' },
    { name: '<', label: '<' },
    { name: '>', label: '>' },
    { name: '<=', label: '<=' },
    { name: '>=', label: '>=' },
    { name: 'contains', label: 'contains' },
    { name: 'beginsWith', label: 'begins with' },
    { name: 'endsWith', label: 'ends with' },
    { name: 'doesNotContain', label: 'does not contain' },
    { name: 'doesNotBeginWith', label: 'does not begin with' },
    { name: 'doesNotEndWith', label: 'does not end with' }
];

export const domains = {
    Names: ["yahoo.com", "gmail.com", "aol.com", "hotmail.com", "outlook.com"],
    Groups: ["Yahoo", "Gmail", "AOL", "Hotmail", "Outlook"]
};
export const healthcare = ["NoInsurance", "BCBS", "UHC", "Aetna"];
export const gender = ["m", "f"];
export const signal = {
    Attributors: ["Onpoint", "XVerify", "EmailOversight"],
    RecordTypes: ["Lead", "Verified"]
};

export const getOperators = (field: string): Field[] => {
    switch (field) {
        case 'Gender':
            return [{name: '=', label: 'is'}];
        default:
            return defaultOperators;
    }
};

export const getValueEditorType = (field: string, operator: string) => {
    switch (field) {
        case 'Gender':
            return 'radio';
        case 'Signal':
            return 'select';
        case 'Domains':
            return 'select';
        default:
            return 'text';
    }
};

export const getInputType = (field: string, operator: string) => {
    switch (field) {
        case 'age':
            return 'number';
        default:
            return 'text';
    }
};

export const getValues = (field: string, operator: string) => {
    switch (field) {
        case 'instrument':
            return [
                {name: 'Guitar', label: 'Guitar'},
                {name: 'Piano', label: 'Piano'},
                {name: 'Vocals', label: 'Vocals'},
                {name: 'Drums', label: 'Drums'}
            ];
        case 'Gender':
            return [
                {name: 'm', label: 'Male'},
                {name: 'f', label: 'Female'},
            ];
        default:
            return [];
    }
};