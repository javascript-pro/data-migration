// data-migration/sql/src/lib/endpoints.ts

export const endpoints = {
  applications: {
    title: 'Applications Table',
    route: 'http://localhost:4000/table/applications',
  },
  applications_clean: {
    title: 'Cleaned Applications Table',
    route: 'http://localhost:4000/table/applications_clean',
  },
};
