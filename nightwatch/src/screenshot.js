module.exports = {
  'Screenshot' : function (client) {
    var sidebarContent = [
      {name: 'Dashboard', text: '0', type: '#'},
      {name: 'Applications', type: '#'},
      {name: 'imageDetails', text: 'Applications navigate_next Image navigate_next Default', type: '#'},
      {name: 'Applications', type: '#'},
      {name: 'appDetails', text: 'Applications navigate_next Desktop', type: '#'},
      {name: 'Files', type: '#'},
      {name: 'Machines', type: '#'},
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
      client.pause(200);
      client.assert.containsText(((page.titleSize) ? page.titleSize : 'h1'), (page.text) ? page.text : page.name);
      client.saveScreenshot('/home/cdrouet/nanocloud/nightwatch/screenshot/' + (page.savePath ? page.savePath : page.name) + '.png');
    });
    client.end();
  }
};
