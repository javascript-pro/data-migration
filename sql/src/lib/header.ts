// data-migration/sql/src/lib/header.ts
import pJSON from '../../package.json';

const {version, description} = pJSON;

export const header = {
    version, 
    description,
    nextURL: "http://localhost:1975/",
    sqlURL: "http://localhost:4000/",
};
