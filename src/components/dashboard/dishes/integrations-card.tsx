import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { baseURL } from '../../../../common';

export interface Integration {
  id: string;
  name: string;
  description: string;
  logo: string;
  image: string;
  installs: number;
  price: string;
  updatedAt: Date;
}

export interface IntegrationCardProps {
  integration: Integration;
}

export function IntegrationCard({ integration }: IntegrationCardProps): React.JSX.Element {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img style={{height: 200, width: '100%'}} src={baseURL() + integration?.image} />
          </Box>
          <Stack spacing={1}>
            <Typography  variant="h6">
              {integration?.name}
            </Typography>
            <Typography style={{color: 'green'}}  variant="h4">
              ₹{integration.price}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <ClockIcon fontSize="var(--icon-fontSize-sm)" />
          <Typography color="text.secondary" display="inline" variant="body2">
            Updated {dayjs(integration.updatedAt).format('MMM D, YYYY')}
          </Typography>
        </Stack>
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <Button style={{backgroundColor: 'rgba(0,0,0,1)'}} startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />} variant="contained">
            Menu
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
