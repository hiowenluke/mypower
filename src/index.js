
const nodber = require('kdo')();

Object.assign(nodber, nodber.lib.database);
Object.assign(nodber, nodber.lib.fields);
Object.assign(nodber, nodber.lib.records);
Object.assign(nodber, nodber.lib.system);
Object.assign(nodber, nodber.lib.table);
Object.assign(nodber, nodber.lib.tools);

global.nodber = nodber;
module.exports.__proto__ = nodber;
