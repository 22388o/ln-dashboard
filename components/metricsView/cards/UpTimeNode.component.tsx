import React from 'react'
import {MetricsOne} from "../../../model/Metrics";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {ResponsiveCalendarCanvas} from '@nivo/calendar'
import {metricsOneToContributionNode} from "../../../utils/AppUtils";
import styles from "../../../styles/SummaryChannels.module.css";
import {GetInfoNode} from "../../../model/GetInfoNode";
import TodayRounded from "@material-ui/icons/TodayRounded"
import theme from '../../../theme/DarkTheme';
import makeTheme from "../../../theme/ChartTheme";

type UpTimeProps = {
    nodeInfo: GetInfoNode
    metricsOne: MetricsOne
    show: (show: boolean, message: string) => void
}


export default function UpTimeNode({nodeInfo, metricsOne, show}: UpTimeProps): JSX.Element {
    let {color} = metricsOne
    color = `#${color}`
    let data = metricsOneToContributionNode(metricsOne);
    return <Card>
        <CardHeader
            avatar={
                <Avatar aria-label="recipe">
                    <TodayRounded/>
                </Avatar>
            }
            title={`Node ${nodeInfo.alias} daily contribution`.toUpperCase()}
        />
        <CardContent>
            <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                <Grid item xs={12} xl={12} sm={12}>
                    <div className={styles.container}>
                        <ResponsiveCalendarCanvas
                            data={data}
                            from={data[0].day}
                            to={data[data.length - 1].day}
                            emptyColor={theme.palette.secondary.main}
                            colors={['#ff5370', '#f07178', '#c3e88d', color]}
                            margin={{top: 50, right: 50, bottom: 50, left: 50}}
                            yearSpacing={10}
                            maxValue={44}
                            minValue="auto"
                            daySpacing={4}
                            theme={makeTheme(color, theme.palette.text.primary)}
                            monthBorderColor={theme.palette.background.default}
                            dayBorderWidth={2}
                            dayBorderColor={theme.palette.background.default}
                            legends={[
                                {
                                    anchor: 'bottom-right',
                                    direction: 'row',
                                    translateY: 36,
                                    itemCount: 4,
                                    itemWidth: 42,
                                    itemHeight: 36,
                                    itemsSpacing: 14,
                                    itemDirection: 'right-to-left'
                                }
                            ]}
                        />
                    </div>
                </Grid>
            </Grid>
        </CardContent>
    </Card>
}