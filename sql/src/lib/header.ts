// data-migration/sql/src/lib/header.ts
import pJSON from '../../package.json';

const {version, description} = pJSON;

export const header = {
    version, 
    description,
    baseURL: "http://localhost:4000/",
};
