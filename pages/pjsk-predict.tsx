import AppBase from "../components/AppBase";
import {
    Alert,
    AlertTitle,
    Grid,
} from "@mui/material";
import * as React from "react";
import {usePjskPredict} from "../utils/predict-hook";
import PjskPredictTable from "../components/PjskPredictTable";

export default function PjskDownload() {
    const pjskPredict = usePjskPredict();
    return (
        <AppBase subtitle="活动预测">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Alert severity="warning">
                        <AlertTitle>关于预测</AlertTitle>
                        由于游戏服务器限制，无法获取完整活动排名信息，预测结果可能会出现<strong>非常巨大</strong>的误差，仅供参考。
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <Alert severity="warning">
                        <AlertTitle>关于预测接入</AlertTitle>
                        如果需要在您的应用中接入预测数据，请<strong>联系33</strong>获取<strong>无缓存、更高速</strong>的API，也可以直接通过<strong>Webhook</strong>向您推送预测结果。
                    </Alert>
                </Grid>
                {pjskPredict &&
                    <PjskPredictTable pjskPredict={pjskPredict}/>
                }
            </Grid>
        </AppBase>
    )
}