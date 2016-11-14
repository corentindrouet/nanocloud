/**
 * Nanocloud turns any traditional software into a cloud solution, without
 * changing or redeveloping existing source code.
 *
 * Copyright (C) 2016 Nanocloud Software
 *
 * This file is part of Nanocloud.
 *
 * Nanocloud is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * Nanocloud is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General
 * Public License
 * along with this program.  If not, see
 * <http://www.gnu.org/licenses/>.
 */

module.exports = {
  '@tags': ['screenshots'],
  'Screenshot' : function (client) {
    var sidebarContent = [
      {name: 'Dashboard', text: '0', type: '#'},
      {name: 'Applications', type: '#'},
      {name: '//div[text()=\'Desktop\']', useXPath: true, noTitle: true, savePath: 'Desktop', pause: 5000},
      {name: '//span[normalize-space(.)=\'Home\']', useXPath: true, text: 'Applications', noScreen: true},
      {name: 'imageDetails', text: 'Applications navigate_next Image navigate_next Qemu default image', type: '#'},
      {name: 'Applications', type: '#'},
      {name: 'appDetails', text: 'Applications navigate_next Desktop', type: '#'},
      {name: 'Files', type: '#'},
      {name: 'Machines', type: '#', pause: 1500},
      {name: 'History', type: '#'},
      {name: 'Users', type: '#'},
      {name: '//a[normalize-space(.)=\'Admin Nanocloud\']', useXPath: true, titleSize: 'h4', text: 'Users -\nAdmin editmode\nNanocloud editmode\nverified_user', savePath: 'UserDetails'},
      {name: 'Users', type: '#'},
      {name: '//button[normalize-space(.)=\'Add user\']', text: 'Users navigate_next Create a new user', savePath: 'CreateUser', useXPath: true},
      {name: 'a[href=\'#/users/groups\']', text: 'Groups', savePath: 'Groups'},
      {name: '//button[normalize-space(.)=\'Create a group\']', text: 'Groups navigate_next Create a new group', savePath: 'CreateGroup', useXPath: true},
      {name: 'Configuration', type: '#', savePath: 'Session'},
      {name: '//a[normalize-space(.)=\'User rights\']', useXPath: true, text: 'Configuration', savePath: 'User rights'},
      {name: '//a[normalize-space(.)=\'Email configuration\']', useXPath: true, text: 'Configuration', savePath: 'Email configuration'},
      {name: '//a[normalize-space(.)=\'Signup template\']', useXPath: true, text: 'Configuration', savePath: 'Signup template', pause: 500},
      {name: '//a[normalize-space(.)=\'Reset password template\']', useXPath: true, text: 'Configuration', savePath: 'Reset password template', pause: 500},
      {name: '//a[normalize-space(.)=\'Look and feel\']', useXPath: true, text: 'Configuration', savePath: 'Look and feel'},
      {name: '//a[text()=\'LDAP\']', useXPath: true, text: 'Configuration', savePath: 'LDAP'},
      {name: '//a[normalize-space(.)=\'Other settings\']', useXPath: true, text: 'Configuration', savePath: 'Other settings'},
      {name: 'Brokerlog', text: 'Broker log', type: '#'}
    ];
    client.url(`https://127.0.0.1/`);
    client.resizeWindow(1920, 1080);
    client.waitForElementPresent(`body`, 3000);
    client.saveScreenshot('/home/cdrouet/nanocloud/nightwatch/screenshot/login_page.png');
    client.assert.title('Nanocloud');
    client.assert.visible('input[placeholder=E-mail]');
    client.setValue('input[placeholder=E-mail]', 'admin@nanocloud.com');
    client.setValue('input[placeholder=Password]', 'admin');
    client.click('button[type=submit]');
    client.waitForElementVisible('div[class=sidebar-content]', 1000);

    sidebarContent.forEach((page) => {
      if (page.useXPath) {
        client.useXpath();
      }
      client.click(((page.type) ? page.type : '') + page.name);
      if (page.useXPath) {
        client.useCss();
      }
      client.pause((page.pause) ? page.pause : 200);
      if (!page.noTitle) {
        client.assert.containsText(((page.titleSize) ? page.titleSize : 'h1'), (page.text) ? page.text : page.name);
      }
      if (!page.noScreen) {
        client.saveScreenshot('/home/cdrouet/nanocloud/nightwatch/screenshot/' + (page.savePath ? page.savePath : page.name) + '.png');
      }
    });
    client.end();
  }
};
