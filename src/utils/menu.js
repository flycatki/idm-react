/**
 * Created by jiangyh on 17-5-18.
 */
module.exports = [
  {
    id: 1,
    icon: 'home',
    name: '工作台',
    router: '/dashboard',
  },
  {
    id: 2,
    name: '用户管理',
    icon: 'user',
    router: '/user',
  },
  {
    id: 3,
    name: '联系人',
    icon: 'contacts',
    router: '/contact',
  },
  {
    id: 4,
    name: '项目管理',
    icon: 'laptop',
  },
  {
    id: 5,
    mpid: 4,
    name: '内部财务审计项目',
    icon: 'laptop',
    router: '/project',
  },
  {
    id: 6,
    mpid: 4,
    name: '外部审计项目',
    icon: 'laptop',
    router: '/project',
  },
  {
    id: 7,
    mpid: 4,
    name: '其他项目',
    icon: 'laptop',
    router: '/project',
  },
  {
    id: 8,
    name: '年度报表',
    icon: 'file',
    router: '/report',
  },
];
