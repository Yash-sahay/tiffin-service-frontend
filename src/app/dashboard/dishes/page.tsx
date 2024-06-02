"use client"
import * as React from 'react';
import type { Metadata } from 'next';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { IntegrationCard } from '@/components/dashboard/dishes/integrations-card';
import type { Integration } from '@/components/dashboard/dishes/integrations-card';
import { CompaniesFilters } from '@/components/dashboard/dishes/integrations-filters';
import menuService from '@/axios/axios_services/menuService'

// export const metadata = { title: `Dishes | Dashboard | ${config.site.name}` } satisfies Metadata;


export default function Page(): React.JSX.Element {

  const [integrations, setIntegrations] = React.useState<Integration[] | []>([])

  const getAllMenuApi = () => {
    try {

      menuService.getAllMenu(config)
        .then((response : any) => {
          setIntegrations(response.data.data)
        })
        .catch((error) => {
          console.log(error);
        });

    } catch (error) {

    }
  }

  React.useEffect(() => {
    getAllMenuApi()
  }, [])

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Dishes</Typography>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
            <Button color="inherit" startIcon={<UploadIcon fontSize="var(--icon-fontSize-md)" />}>
              Import
            </Button>
            <Button color="inherit" startIcon={<DownloadIcon fontSize="var(--icon-fontSize-md)" />}>
              Export
            </Button>
          </Stack>
        </Stack>
        <div>
          <Button startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Add
          </Button>
        </div>
      </Stack>
      <CompaniesFilters />
      <Grid container spacing={3}>
        {integrations?.map((integration : any) => (
          <Grid key={integration?.id} lg={4} md={6} xs={12}>
            <IntegrationCard integration={integration} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={3} size="small" />
      </Box>
    </Stack>
  );
}
