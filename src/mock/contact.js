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
      'mobile|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
      'officePhone|1': ['83678578', '12348129', '098712872', '84736512'],
    },
  ],
});

let database = [];

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
};

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

    res.status(200).json({
      data: newData,
    });
  },
  'PATCH /contact/update/:id': (req, res) => {
    const { id } = req.params;
    const editItem = req.body;
    let isExist = false;

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true;
        return Object.assign({}, item, editItem);
      }
      return item;
    });

    if (isExist) {
      res.status(201).end();
    } else {
      res.status(404).json(NOTFOUND);
    }
  },
};
