// data-migration/next/src/app/page.tsx
'use client';

import * as React from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function Home() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [rows, setRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('http://localhost:4000/applications')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data?.data?.rows) {
          setRows(data.data.rows);
        } else {
          throw new Error('Unexpected response format');
        }
      })
      .catch((err) => {
        setError(`Failed to load applications: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'applicant_name', headerName: 'Name', width: 200 },
    { field: 'applicant_age', headerName: 'Age', type: 'number', width: 100 },
    { field: 'income', headerName: 'Income', type: 'number', width: 130 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'application_date', headerName: 'Date', width: 130 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'notes', headerName: 'Notes', width: 300 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Table: Applications
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Paper elevation={1} sx={{ height: 600, width: '100%', mt: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={25}
            rowsPerPageOptions={[25, 50, 100]}
          />
        </Paper>
      )}
    </Container>
  );
}
