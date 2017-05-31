/**
 * Created by jiangyh on 17-5-31.
 */
const Mock = require('mockjs');
const qs = require('qs');
const config = require('../utils/config');
const { apiPrefix } = config;

const contactsListData = Mock.mock({
  'data|30-50': [
    {
      id: '@id',
      title: Mock.Random.csentence(3),
      account: Mock.Random.string('lower', 5),
      email: Mock.mock('@EMAIL()'),
      'moblie|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
      'officePhone|1': ['83678578', '12348129', '098712872', '84736512'],
    },
  ],
});

let database;

module.exports = {
  'GET /contacts': (req, res) => {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    let newData = database || contactsListData.data;
    for (const key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(other[key].trim()) > -1;
          }
          return true;
        });
      }
    }
    res.status(200).json({
      data: newData.slice((page - 1) * pageSize, page * pageSize),
      total: newData.length,
    });
  },
  'POST /contact/create': (req, res) => {
    const newData = req.body;
    newData.id = Mock.mock('@id');

    database.unshift(newData);

    res.status(200).end();
  },
};
