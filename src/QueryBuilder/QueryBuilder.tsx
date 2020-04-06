import React, {SetStateAction, useState} from 'react';
import QueryBuilder, {formatQuery} from 'react-querybuilder';
import {Field, RuleGroup} from "react-querybuilder/index"
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import {useStyles} from "./styles"
import {
    preparedQueries,
    preparedFields,
    combinators,
    domains,
    gender,
    healthcare,
    sampleQueryConfig,
    signal,
    getValues,
    getInputType,
    getOperators,
    getValueEditorType
} from "./models";

type FormatType = "json" | "sql" | "json_without_ids"

function OPGQueryBuilder({}) {
    const classes = useStyles()
    const [query, setQuery] = useState<RuleGroup>(preparedQueries.secondary);
    const [fields, setFields] = useState<Field[]>(preparedFields.secondary);
    const [format, setFormat] = useState<FormatType>('json');
    const [showCombinatorsBetweenRules, setShowCombinatorsBetweenRules] = useState(false);
    const [showNotToggle, setShowNotToggle] = useState(false);
    const [resetOnFieldChange, setResetOnFieldChange] = useState(true);

    const handleQueryChange = (query: any) => {
        setQuery(query);
    };

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.h6} gutterBottom variant="h6" component="h2">
                        Query Builder
                    </Typography>
                    <QueryBuilder
                        query={query}
                        fields={fields}
                        // combinators={combinators}
                        controlClassnames={{
                            rule: classes.rule,
                            ruleGroup: classes.ruleGroup,
                            header: classes.ruleGroupHeader,
                        }}
                        onQueryChange={handleQueryChange}
                        getOperators={getOperators}
                        getValueEditorType={getValueEditorType}
                        getInputType={getInputType}
                        getValues={getValues}
                        showCombinatorsBetweenRules={showCombinatorsBetweenRules}
                        showNotToggle={showNotToggle}
                        resetOnFieldChange={resetOnFieldChange}
                    />
                </CardContent>
            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.h6} gutterBottom variant="h6" component="h2">
                        Output as <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={format}
                        onChange={(e) => setFormat(e.target.value as FormatType)}
                        label="Format"
                    >
                        <MenuItem value={"json"}>JSON</MenuItem>
                        <MenuItem value={"sql"}>SQL</MenuItem>
                        <MenuItem value={"json_without_ids"}>JSON Without IDs</MenuItem>
                    </Select>
                    </Typography>

                    <pre className={classes.code}>
                        <code>{formatQuery(query, format)}</code>
                    </pre>
                </CardContent>
            </Card>
        </>
    );
}

export default OPGQueryBuilder;
