import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { OrdersFilters } from '@/components/dashboard/order/orders-filters';
import { OrdersTable } from '@/components/dashboard/order/orders-table';
import { Order } from '@/components/dashboard/overview/latest-orders';

export const metadata = { title: `Customers | Dashboard | ${config.site.name}` } satisfies Metadata;

const orders = [
  {
    id: 'USR-010',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'Madrid', country: 'Spain', state: 'Comunidad de Madrid', street: '4158 Hedge Street' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-0031',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'Carson City', country: 'USA', state: 'Nevada', street: '2188 Armbrester Drive' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-0301',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'North Canton', country: 'USA', state: 'Ohio', street: '4894 Lakeland Park Drive' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-0401',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'Salt Lake City', country: 'USA', state: 'Utah', street: '368 Lamberts Branch Road' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-6001',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'Murray', country: 'USA', state: 'Utah', street: '3934 Wildrose Lane' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-7001',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'Atlanta', country: 'USA', state: 'Georgia', street: '1865 Pleasant Hill Road' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },

  {
    id: 'USR-7001',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'Berkeley', country: 'USA', state: 'California', street: '317 Angus Road' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-0201',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'Cleveland', country: 'USA', state: 'Ohio', street: '2849 Fulton Street' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-05401',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'Los Angeles', country: 'USA', state: 'California', street: '1798 Hickory Ridge Drive' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
  {
    id: 'USR-0041',
    customer: { name: 'Miron Vitold'},
    email: 'miron.vitold@devias.io',
    phone: '972-333-4106',
    // address: { city: 'San Diego', country: 'USA', state: 'California', street: '75247' },
    amount: 100,
    status: "pending",
    createdAt: dayjs().subtract(2, 'hours').toDate(),
  },
] satisfies Order[];

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;

  const paginatedOrders = applyPagination(orders, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Orders</Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
      <OrdersFilters />
      <OrdersTable
        count={paginatedOrders.length}
        page={page}
        orders={paginatedOrders}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: Order[], page: number, rowsPerPage: number): Order[] {
  return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
