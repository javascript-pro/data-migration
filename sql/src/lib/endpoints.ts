// data-migration/sql/src/lib/endpoints.ts

export const endpoints = {
  test: {
    title: 'Test',
    route: 'http://localhost:4000/test',
    routes: {
      update: {
        title: 'Update Log',
        route: 'http://localhost:4000/log/update',
      },
      create: {
        title: 'Create Log',
        route: 'http://localhost:4000/log/create',
      },
      root: {
        title: 'Log Root',
        route: 'http://localhost:4000/log',
      },
    },
  },
};
