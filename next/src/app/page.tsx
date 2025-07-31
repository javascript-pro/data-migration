'use client';

import * as React from 'react';
import {
  Container,
  Card,
  CardHeader,
  IconButton,
  Box,
  CircularProgress,
  Alert,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function Home() {
  const [tab, setTab] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [messyRows, setMessyRows] = React.useState<any[]>([]);
  const [cleanedRows, setCleanedRows] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Fetch both messy and cleaned tables concurrently
    Promise.all([
      fetch('http://localhost:4000/table/applications'),
      fetch('http://localhost:4000/table/applications/cleaned'),
    ])
      .then(async ([messyRes, cleanRes]) => {
        // Check each response individually before parsing
        if (!messyRes.ok) {
          throw new Error(`Messy fetch failed: HTTP ${messyRes.status}`);
        }
        if (!cleanRes.ok) {
          throw new Error(`Clean fetch failed: HTTP ${cleanRes.status}`);
        }

        // Parse only after confirming both responses are ok
        const messyData = await messyRes.json();
        const cleanData = await cleanRes.json();

        // Validate expected structure
        if (messyData?.data?.rows && cleanData?.data?.rows) {
          setMessyRows(messyData.data.rows);
          setCleanedRows(cleanData.data.rows);
        } else {
          throw new Error('Unexpected response format from one or both endpoints');
        }
      })
      .catch((err) => {
        setError(`${err.message}`);
      })
      .finally(() => setLoading(false));
  }, []);

  // Shared column definitions for both tables
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card>
        <CardHeader
          title="Data Migration Preview"
          action={
            <IconButton onClick={() => window.open('http://localhost:4000/', '_blank')}>
              <CodeIcon />
            </IconButton>
          }
        />
        <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
          <Tab label="Messy Table" />
          <Tab label="Cleaned Table" />
        </Tabs>

        {/* Loading spinner */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        )}

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {/* DataGrid display */}
        {!loading && !error && (
          <Paper elevation={1} sx={{ height: 500, width: '100%', mt: 2 }}>
            <DataGrid
              rows={tab === 0 ? messyRows : cleanedRows}
              columns={columns}
              getRowId={(row) => row.id}
              pageSize={25}
              rowsPerPageOptions={[25, 50, 100]}
            />
          </Paper>
        )}
      </Card>
    </Container>
  );
}
