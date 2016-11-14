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
  '@tags': ['api_tests'],
  'Tests login': function (client) {
    client.url('https://127.0.0.1/')
      .resizeWindow(1300, 900)
      .assert.title('Nanocloud')
      .assert.visible('input[placeholder=E-mail]')
      .assert.visible('input[type=password]')
      .assert.visible('button[type=submit]')
      .useXpath()
      .assert.visible('//a[normalize-space(.)=\'Reset my password\']')
      .useCss()
      .setValue('input[placeholder=E-mail]', 'admin@nanocloud.com')
      .setValue('input[type=password]', 'admin')
      .click('button[type=submit]')
      .waitForElementVisible('div[class=sidebar-content]', 1000)
      .assert.urlEquals('https://127.0.0.1/#/dashboard');
  },

  'Tests sidebar': function (client) {
    client.assert.visible('div[class=sidebar-logo]')
      .assert.containsText('#Dashboard', 'Dashboard')
      .assert.containsText('#Applications', 'Applications')
      .assert.containsText('#Files', 'Files')
      .assert.containsText('#Machines', 'Machines')
      .assert.containsText('#History', 'History')
      .assert.containsText('#Users', 'Users')
      .assert.containsText('#Configuration', 'Configuration')
      .assert.containsText('#Brokerlog', 'Broker Log');
  },

  'Tests dashboard': function (client) {
    client
      .elements('css selector', 'div[class=\'ember-view card-component\']', (elements) => {
        elements.value.forEach((element, index) => {
          client.elementIdElement(element.ELEMENT, 'css selector', 'span', (Id) => {
            client.elementIdAttribute(Id.value.ELEMENT, 'class', (cla) => {
              client.elementIdText(Id.value.ELEMENT, (text) => {
                client.assert.equal(text.value, (cla.value === '' || index === 3) ? 1 : 0);
              });
            });
          });
        });
      })
      .assert.visible('a[href=\'#/users/new\']')
      .assert.visible('a[href=\'#/users\']')
      .assert.visible('a[href=\'#/histories\']')
      .assert.visible('a[href=\'#/images\']')
      .assert.visible('a[href=\'#/machines\']')
      .assert.visible('a[href=\'#/files\']')
      .useXpath()
      .assert.visible('//footer[normalize-space(.)=\'Current online users\']')
      .assert.visible('//footer[normalize-space(.)=\'Current registered users\']')
      .assert.visible('//footer[normalize-space(.)=\'Published applications\']')
      .assert.visible('//footer[normalize-space(.)=\'Machines up\']')
      .assert.visible('//footer[normalize-space(.)=\'File uploaded ( total : 0 bytes )\']')
      .assert.visible('//footer[normalize-space(.)=\'Image count\']')
      .assert.visible('//i[normalize-space()=\'help\']')
      .assert.visible('//button[normalize-space()=\'Admin Nanocloud\']')
      .useCss();
  },

  'Tests applications tab': function (client) {
    client.click('#Applications')
      .assert.visible('div[class=\'content\']')
      .assert.containsText('h3', 'Default')
      .assert.visible('div[id=appDetails]')
      .useXpath()
      .assert.visible('//i[text()=\'pageview\']')
      .assert.visible('//div[text()=\'Desktop\']')
      .assert.visible('//p[normalize-space(.)=\'1 application(s)\']');
  },

  'Tests Image details': function (client) {
    client.click('//i[text()=\'pageview\']')
      .useCss()
      .assert.containsText('h1', 'Applications navigate_next Image navigate_next Default')
      .elements('css selector', 'tr', (elements) => {
        client.assert.equal(elements.value.length, 4);

        client.elementIdElement(elements.value[0].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'Image name');
          });
        });
        client.elementIdElements(elements.value[0].ELEMENT, 'css selector', 'span', (values) => {
          client.assert.equal(values.value.length, 2);
          client.elementIdText(values.value[0].ELEMENT, (text) => {
            client.assert.equal(text.value, 'Default');
          });
          client.elementIdText(values.value[1].ELEMENT, (text) => {
            client.assert.equal(text.value, 'editmode');
          });
        });

        client.elementIdElement(elements.value[1].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'Publication date');
          });
        });
        client.elementIdElement(elements.value[1].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdText(value.value.ELEMENT, (text) => {
            client.assert.equal(text.value.substr(0, 9), 'Today at ');
          });
        });

        client.elementIdElement(elements.value[2].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdElement(title.value.ELEMENT, 'css selector', 'a', (a) => {
            client.elementIdText(a.value.ELEMENT, (text) => {
              client.assert.equal(text.value, 'Group(s)');
            });
          });
        });
        client.elementIdElement(elements.value[2].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdText(value.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'No group');
          });
        });

        client.elementIdElement(elements.value[3].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'UUID');
          });
        });
        client.elementIdElement(elements.value[3].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdElement(value.value.ELEMENT, 'css selector', 'i', (i) => {
            client.elementIdText(i.value.ELEMENT, (text) => {
              client.assert.equal(text.value, 'content_copy');
            });
          });
        });
      });
  },

  'Tests applications details': function (client) {
    client.click('#Applications')
      .waitForElementPresent('div[id=appDetails]', 1000)
      .click('#appDetails')
      .assert.containsText('h1', 'Applications navigate_next Desktop')
      .elements('css selector', 'tr', (elements) => {
        client.assert.equal(elements.value.length, 5);

        client.elementIdElement(elements.value[0].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'Application name');
          });
        });
        client.elementIdElements(elements.value[0].ELEMENT, 'css selector', 'span', (values) => {
          client.assert.equal(values.value.length, 2);
          client.elementIdText(values.value[0].ELEMENT, (text) => {
            client.assert.equal(text.value, 'Desktop');
          });
          client.elementIdText(values.value[1].ELEMENT, (text) => {
            client.assert.equal(text.value, 'editmode');
          });
        });

        client.elementIdElement(elements.value[1].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'Publication date');
          });
        });
        client.elementIdElement(elements.value[1].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdText(value.value.ELEMENT, (text) => {
            client.assert.equal(text.value.substr(0, 9), 'Today at ');
          });
        });

        client.elementIdElement(elements.value[2].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'Belongs to the image');
          });
        });
        client.elementIdElement(elements.value[2].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdElement(value.value.ELEMENT, 'css selector', 'a', (link) => {
            client.elementIdText(link.value.ELEMENT, (text) => {
              client.assert.equal(text.value, 'Default');
            });
          });
        });

        client.elementIdElement(elements.value[3].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'UUID');
          });
        });
        client.elementIdElement(elements.value[3].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdElement(value.value.ELEMENT, 'css selector', 'i', (i) => {
            client.elementIdText(i.value.ELEMENT, (text) => {
              client.assert.equal(text.value, 'content_copy');
            });
          });
        });

        client.elementIdElement(elements.value[4].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'Delete application');
          });
        });
        client.elementIdElement(elements.value[4].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdElement(value.value.ELEMENT, 'css selector', 'button', (button) => {
            client.elementIdText(button.value.ELEMENT, (text) => {
              client.assert.equal(text.value, 'Delete this application');
            });
          });
        });
      });
  },

  'Close window': function (client) {
    client.end();
  }
};
