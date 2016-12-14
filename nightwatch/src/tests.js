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

const assert = require('chai').assert;
const _util = require('util');

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
    client.pause(1000)
      .elements('css selector', 'div[class=\'ember-view card-component\']', (elements) => {
        elements.value.forEach((element) => {
          client.elementIdElement(element.ELEMENT, 'css selector', 'h1', (Id) => {
            client.elementIdElement(Id.value.ELEMENT, 'css selector', 'span', (spanId) => {
              client.elementIdText(spanId.value.ELEMENT, (text) => {
                assert.isAtLeast(text.value, 0, _util.format('Testing if number is present'));
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
        client.assert.equal(elements.value.length, 6);

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

        client.elementIdElement(elements.value[4].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'Pool size');
          });
        });
        client.elementIdElement(elements.value[4].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdElement(value.value.ELEMENT, 'css selector', 'span[class=content]', (span) => {
            client.elementIdText(span.value.ELEMENT, (text) => {
              client.assert.equal(text.value, '1');
            });
          });
          client.elementIdElement(value.value.ELEMENT, 'css selector', 'i', (i) => {
            client.elementIdText(i.value.ELEMENT, (text) => {
              client.assert.equal(text.value, 'editmode');
            });
          });
        });

        client.elementIdElement(elements.value[5].ELEMENT, 'css selector', 'th', (title) => {
          client.elementIdText(title.value.ELEMENT, (text) => {
            client.assert.equal(text.value, 'Instances size');
          });
        });
        client.elementIdElement(elements.value[5].ELEMENT, 'css selector', 'td', (value) => {
          client.elementIdElements(value.value.ELEMENT, 'css selector', 'md-checkbox', (checkboxs) => {
            client.elementIdText(checkboxs.value[0].ELEMENT, (text) => {
              client.assert.equal(text.value, 'Small');
            });
            client.elementIdText(checkboxs.value[1].ELEMENT, (text) => {
              client.assert.equal(text.value, 'Medium');
            });
            client.elementIdText(checkboxs.value[2].ELEMENT, (text) => {
              client.assert.equal(text.value, 'Large');
            });
            client.elementIdText(checkboxs.value[3].ELEMENT, (text) => {
              client.assert.equal(text.value, 'Very large');
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

  'Tests machines tab': function (client) {
    client.click('#Machines')
      .pause(1500)
      .useXpath()
      .assert.visible('//i[normalize-space(.)=\'autorenew\']')
      .useCss()
      .elements('css selector', 'tbody', (tbody) => {
        client.assert.equal(tbody.value.length, 1);
        client.elementIdElements(tbody.value[0].ELEMENT, 'css selector', 'tr', (trs) => {
          assert.isAtLeast(trs.value.length, 1, 'More than one machine is present');
          trs.value.forEach((tr) => {
            client.elementIdElements(tr.ELEMENT, 'css selector', 'td', (td) => {
              client.assert.equal(td.value.length, 7);
              client.elementIdText(td.value[1].ELEMENT, (text) => {
                client.assert.equal(text.value, 'Default');
              });
              client.elementIdText(td.value[4].ELEMENT, (text) => {
                client.assert.equal(text.value, '-');
              });
              client.elementIdText(td.value[5].ELEMENT, (text) => {
                client.assert.equal(text.value, '-');
              });
            });
          });
        });
      });
  },

  'Tests machines details': function (client) {
    let machineTab = [
      { th: 'IP', td: '127.0.0.1' },
      { th: 'Image', td: 'Default' },
      { th: 'Driver', td: 'dummy' },
      { th: 'Machine size', td: 'medium' },
      { th: 'Assigned user', td: 'None' },
      { th: 'Reboot machine', td: 'Reboot' }
    ];
    client.useXpath()
      .click('//div[normalize-space(.)=\'Nanocloud Exec Server\']')
      .useCss()
      .elements('css selector', 'tbody', (tbody) => {
        client.assert.equal(tbody.value.length, 1);
        client.elementIdElements(tbody.value[0].ELEMENT, 'css selector', 'tr', (trs) => {
          client.assert.equal(trs.value.length, 6);
          trs.value.forEach((tr, index) => {
            client.elementIdElement(tr.ELEMENT, 'css selector', 'th', (th) => {
              client.elementIdText(th.value.ELEMENT, (text) => {
                client.assert.equal(text.value, machineTab[index].th);
              });
            });
            client.elementIdElement(tr.ELEMENT, 'css selector', 'td', (td) => {
              client.elementIdText(td.value.ELEMENT, (text) => {
                client.assert.equal(text.value, machineTab[index].td);
              });
            });
          });
        });
      });
  },

  'Tests history tab': function (client) {
    client.click('#History')
      .useXpath()
      .assert.visible('//i[normalize-space(.)=\'autorenew\']')
      .useCss();
  },

  'Tests users tab': function (client) {
    client.click('#Users')
      .useXpath()
      .waitForElementVisible('//button[normalize-space(.)=\'Add user\']', 1000)
      .useCss()
      .element('css selector', 'tbody', (table) => {
        client.elementIdElement(table.value.ELEMENT, 'css selector', 'tr', (tr) => {
          client.elementIdElements(tr.value.ELEMENT, 'css selector', 'td', (tds) => {
            client.assert.equal(tds.value.length, 5);
            client.elementIdText(tds.value[0].ELEMENT, (text) => {
              client.assert.equal(text.value, 'Admin Nanocloud');
            });
            client.elementIdText(tds.value[1].ELEMENT, (text) => {
              client.assert.equal(text.value, 'admin@nanocloud.com');
            });
            client.elementIdText(tds.value[2].ELEMENT, (text) => {
              client.assert.equal(text.value, 'Administrator');
            });
            client.elementIdElement(tds.value[3].ELEMENT, 'css selector', 'div[class=\'circle down\']', (circle) => {
              client.elementIdCssProperty(circle.value.ELEMENT, 'background-color', (BackgroundColor) => {
                client.assert.equal(BackgroundColor.value, 'rgba(222, 222, 222, 1)');
              });
            });
            client.elementIdText(tds.value[4].ELEMENT, (text) => {
              client.assert.equal(text.value, '-');
            });
          });
        });
      });
  },

  'Tests user details': function (client) {
    let userTab = [
      { th: 'Email address', td: 'admin@nanocloud.com editmode' },
      { th: 'Password', td: '****** editmode' },
      { th: 'Group(s)', td: 'No group' },
      { th: 'Expiration date', td: 'No expiration date set editmode' },
      { th: 'Creation date', td: 'Today at ' },
      { th: 'UUID', td: 'aff17b8b-bf91-40bf-ace6-6dfc985680bb content_copy' },
      { th: 'Delete Account', td: 'Delete this account' },
      { th: 'Is admin', td: '' },
    ];
    client.useXpath().click('//a[normalize-space(.)=\'Admin Nanocloud\']')
      .useCss()
      .element('css selector', 'tbody', (table) => {
        client.elementIdElements(table.value.ELEMENT, 'css selector', 'tr', (trs) => {
          client.assert.equal(trs.value.length, 8);
          trs.value.forEach((tr, index) => {
            client.elementIdElement(tr.ELEMENT, 'css selector', 'th', (th) => {
              client.elementIdText(th.value.ELEMENT, (text) => {
                client.assert.equal(text.value, userTab[index].th);
              });
            });
            client.elementIdElement(tr.ELEMENT, 'css selector', 'td', (td) => {
              client.elementIdText(td.value.ELEMENT, (text) => {
                client.assert.equal((index !== 4) ? text.value : text.value.substr(0, 9), userTab[index].td);
              });
            });
          });
        });
      });
  },

  'Tests groups page': function (client) {
    client.useXpath().click('//a[normalize-space(.)=\'Groups\']')
      .waitForElementVisible('//button[normalize-space(.)=\'Create a group\']', 1000)
      .click('//button[normalize-space(.)=\'Create a group\']')
      .useCss()
      .setValue('#new-group-name', 'essai')
      .click('button[type=submit]')
      .waitForElementVisible('tbody', 1000)
      .element('css selector', 'tbody', (table) => {
        client.elementIdElement(table.value.ELEMENT, 'css selector', 'tr', (tr) => {
          client.elementIdElements(tr.value.ELEMENT, 'css selector', 'td', (tds) => {
            tds.value.forEach((td, index) => {
              client.elementIdText(td.ELEMENT, (text) => {
                client.assert.equal(text.value, (index === 0) ? 'essai' : 0);
              });
            });
          });
        });
      });
  },

  'Tests group details': function (client) {
    client.useXpath().click('//a[normalize-space(.)=\'essai\']')
      .useCss()
      .waitForElementVisible('ul', 1000)
      .waitForElementVisible('tbody', 1000)
      .element('css selector', 'ul[class="nav navbar-nav"]', (lists) => {
        client.elementIdElements(lists.value.ELEMENT, 'css selector', 'li', (lis) => {
          client.elementIdText(lis.value[0].ELEMENT, (text) => {
            client.assert.equal(text.value, 'General');
          });
          client.elementIdText(lis.value[1].ELEMENT, (text) => {
            client.assert.equal(text.value, 'Members');
          });
          client.elementIdText(lis.value[2].ELEMENT, (text) => {
            client.assert.equal(text.value, 'Images');
          });
        });
      });
  },

  'Close window': function (client) {
    client.end();
  }
};
