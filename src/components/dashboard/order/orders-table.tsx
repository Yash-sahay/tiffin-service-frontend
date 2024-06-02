'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

import { useSelection } from '@/hooks/use-selection';
import { Chip, SxProps } from '@mui/material';
import orderService from '@/axios/axios_services/orderService'

function noop(): void {
  // do nothing
}

const statusMap = {
  "PE": { label: 'Pending', color: 'warning' },
  "DVD": { label: 'Delivered', color: 'success' },
  "DIS": { label: 'Dispached', color: 'warning' },
  "REF": { label: 'Refunded', color: 'error' },
} as const;

export interface Order {
  _id: string;
  userId: { name: string };
  menuId: { name: string };
  amount: number;
  status: 'PE' | 'DVD' | 'REF' | 'DIS';
  createdAt: Date;
}


interface OrdersTableProps {
  count?: number;
  page?: number;
  orders?: Order[];
  rowsPerPage?: number;
  sx?: SxProps;
}

export function OrdersTable({
  count = 0,
  orders = [], 
  sx,
  page = 0,
  rowsPerPage = 0,
}: OrdersTableProps): React.JSX.Element {


  const rowIds = React.useMemo(() => {
    return orders.map((order) => order._id);
  }, []);

  const { selectAll, deselectAll, selectOne, deselectOne, selected } = useSelection(rowIds);
  const [ordersRow, setOrdersRow] = React.useState<Order[]>([])
  
  const getAllMenuApi = () => {
    try {
      orderService.getAllOrder().then((response : any) => {
          setOrdersRow(response.data.data)
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

  const selectedSome = (selected?.size ?? 0) > 0 && (selected?.size ?? 0) < orders.length;
  const selectedAll = orders.length > 0 && selected?.size === orders.length;

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {ordersRow?.map((order) => {
              const { label, color } = statusMap[order.status] ?? { label: 'Unknown', color: 'default' };
              const isSelected = selected?.has(order._id);
              return (
                <TableRow hover key={order?._id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(order._id);
                        } else {
                          deselectOne(order._id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order?.menuId?.name}</TableCell>
                  <TableCell>{order?.userId?.name}</TableCell>
                  <TableCell>{dayjs(order.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Chip color={color} label={label} size="small" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}
