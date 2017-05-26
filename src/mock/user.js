/**
 * Created by jiangyh on 17-5-19.
 */
const Mock = require('mockjs');
const qs = require('qs');
const config = require('../utils/config');
const { apiPrefix } = config;

const usersListData = Mock.mock({
  'data|30-50': [
    {
      id: '@id',
      name: '@name',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      isMale: '@boolean',
      avatar() {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.name.substr(0, 1));
      },
    },
  ],
});

const database = usersListData.data;

module.exports = {
  'GET /users': (req, res) => {
    const { query } = req;
    let { pageSize, page, ...other } = query;
    pageSize = pageSize || 10;
    page = page || 1;
    let newData = database;
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
};
