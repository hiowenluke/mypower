
const nodber = require('kdo')();
const sequery = require('sequelize-raw-query');

Object.assign(nodber, nodber.crud);
Object.assign(nodber, nodber.lib.database);
Object.assign(nodber, nodber.lib.fields);
Object.assign(nodber, nodber.lib.records);
Object.assign(nodber, nodber.lib.system);
Object.assign(nodber, nodber.lib.table);
Object.assign(nodber, nodber.lib.tools);

nodber.sequelizeOp = sequery.Sequelize.Op;

global.nodber = nodber;
module.exports.__proto__ = nodber;
