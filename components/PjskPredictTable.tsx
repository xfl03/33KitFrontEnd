import {Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import * as React from "react";
import {formatDatetimeShort} from "../utils/date-format";

type PjskPredictTableArg = {
    pjskPredict: any,
    ranks?: Array<number>
}
export default function PjskPredictTable({pjskPredict, ranks}: PjskPredictTableArg) {
    // const pjskPredict = usePjskPredict();
    const [predict, setPredict] = useState<Array<any>>()
    useEffect(() => {
        // if (pjskPredict === undefined) return;
        // const ranks = [100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000, 10000, 20000, 30000, 40000, 50000, 100000];
        let pre = [];
        let finalRanks = ranks === undefined ? [] : ranks;
        if (ranks === undefined) {
            for (let key in pjskPredict.data) {
                let ki = parseInt(key);
                if(!isNaN(ki)){
                    finalRanks.push(ki);
                }
            }
        }
        for (let rank of finalRanks) {
            pre.push({
                rank: rank,
                score: pjskPredict.data[rank],
            });
        }
        setPredict(pre)
    }, [pjskPredict, ranks, setPredict])
    return (
        <Grid item xs={12}>
            <TableContainer sx={{maxWidth: 500}} component={Paper}>
                <Table size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{textAlign: "center"}} colSpan={3}>
                                <strong style={{fontSize: "1.5em"}}>{pjskPredict.data.eventName}</strong>
                                <br/>
                                {formatDatetimeShort(pjskPredict.data.eventStartAt)}～
                                <strong>{formatDatetimeShort(pjskPredict.data.eventAggregateAt)}</strong>
                                <br/>
                                预测于<strong>{formatDatetimeShort(pjskPredict.data.ts)}</strong>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{textAlign: "center"}}>活动排名</TableCell>
                            <TableCell style={{textAlign: "center"}} align="right">活动PT预测</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {predict && predict.map((row) => (
                            <TableRow
                                key={row.rank}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell style={{textAlign: "center"}} component="th" scope="row">
                                    {row.rank}
                                </TableCell>
                                <TableCell style={{textAlign: "center"}} align="right">{row.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}