import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles({
    card: {
        marginTop: 20,
    },
    h6: {
        color: "#cc5500"
    },
    code: {
        backgroundColor: "#E0E0E0",
        borderRadius: 15,
        padding: 10,
        overflow: "scroll",
    },
    ruleGroup: {
        marginLeft: 20,
        marginTop: 20,
        borderLeft: "solid 4px #E0E0E0",
    },
    ruleGroupHeader: {
        backgroundColor: "#E0E0E0",
        padding: 5,
        borderRadius: 15,
        marginBottom: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    rule: {
        padding: 5,
        // paddingLeft: 20,
        marginLeft: 10,
        // borderLeft: "solid 4px #E0E0E0"
    }
});