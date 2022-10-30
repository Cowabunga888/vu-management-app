import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Admin from '../../admin/index';
import { Box, Grid } from '@mui/material';
import SummaryCard from '../../admin/elements/SummaryCard';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import ChatIcon from '@mui/icons-material/Chat';
import BadgeIcon from '@mui/icons-material/Badge';
import { getListDataAnalyticsByMetric } from '../../services/app/analytics.app';
import RoleByUserChart from '../../admin/analytics/RoleByUserChart';
import MessageByChannelChart from '../../admin/analytics/MessageByChannelChart';
function Chart() {

  const [metrics, setMetrics] = useState<any>({});
  const loadData = () => {
    getListDataAnalyticsByMetric().then(resp => {
      if (resp.status !== 200) return;
      setMetrics(resp.data)
    })
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <>
      <Head>
        <title>Admin Chart</title>
      </Head>
      <Admin sidebar='chart'>
        <h1>Dashboard Overview</h1>
        <Box sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Users" total={metrics?.users} icon={<AssignmentIndIcon />} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Rooms" total={metrics?.rooms} color="info" icon={<DisplaySettingsIcon />} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Messages" total={metrics?.totalMessage} color="warning" icon={<ChatIcon />} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <SummaryCard title="Roles" total={metrics?.roles} color="warning" icon={<BadgeIcon />} />
            </Grid>

            <Grid item xs={12} md={6}>
              <RoleByUserChart
                title="Roles"
                subheader="Role by each user"
                chartData={metrics?.meta?.roleGroupByUser || []}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <MessageByChannelChart
                title="Messages"
                subheader="Message by each channel"
                chartData={metrics?.meta?.messageGroupByRoom || []}
              />
            </Grid>

          </Grid>
        </Box>
      </Admin>
    </>
  )
}

export default Chart