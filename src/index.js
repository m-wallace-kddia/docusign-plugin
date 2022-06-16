// import './test.css';
(function() {
  "use strict";

  const KINTONE_API_MAP = {
    'keys': [
      {
        "id": "0",
        "kintoneDomain": "kddikintone-se",
        "space": "DocuSign Test",
        "spaceID": 85,
        "guestSpace": false,
        "appName": "SignApp",
        "appID": 1256,
        "key": "YVDszuUtVHlRkiB9GMDSVnRlur97J0wow8vuJeno"
      }
    ]
  };
  const kintoneRequests = {
    getSpace: (app) => {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const link = `/k/${url}v1/space`;
      const body = {
        'id': app.spaceID
      };
  
      return new Promise((resolve, reject) => {
        kintone.api(kintone.api.url(link, true), 'GET', body, (resp) => {
          resolve(resp);
        }, (error) => {
          reject();
          throw error;
        });
      });
    },
    getAppInfo: (app) => {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const link = `/k/${url}v1/app`;
      const body = {
        'id': app.appID
      };
  
      return new Promise((resolve, reject) => {
        kintone.api(kintone.api.url(link, true), 'GET', body, (resp) => {
          resolve(resp);
        }, (error) => {
          reject();
          throw error;
        });
      });
    },
    getAppFields: (app) => {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const link = `/k/${url}v1/app/form/fields`;
      
      return new Promise((resolve, reject) => {
        kintone.api(kintone.api.url(link, true) + `?app=${app.appID}`, 'GET', {}, (resp) => {
          resolve(resp);
        }, (error) => {
          reject();
          throw error;
        });
      });
    },
    getRecordsofApp: (app) => {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const link = `/k/${url}v1/records`;
  
      return new Promise((resolve, reject) => {
        kintone.api(kintone.api.url(link, true) + `?app=${app.appID}`, 'GET', {}, (resp) => {
          resolve(resp.records);
        }, (error) => {
          reject();
          throw error;
        });
      });
    },
    updateRecordByID: (app, inputRecord) => {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const link = `/k/${url}v1/record`;
  
      return new Promise((resolve, reject) => {
        kintone.api(kintone.api.url(link, true), 'PUT', inputRecord, (resp) => {
          resolve(resp);
        }, (error) => {
          reject();
          throw error;
        });
      });
    },
    addRecord: (app, inputRecord) => {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const link = `/k/${url}v1/records`;
  
      return new Promise((resolve, reject) => {
        kintone.api(kintone.api.url(link, true), 'POST', inputRecord, (resp) => {
          resolve(resp);
        }, (error) => {
          reject();
          console.log(error);
          throw error;
        });
      });
    },
    deleteRecord: (app, inputRecord) => {
      const url = app.guestSpace ? `guest/${app.spaceID}/` : '';
      const link = `/k/${url}v1/records`;
  
      return new Promise((resolve, reject) => {
        kintone.api(kintone.api.url(link, true), 'DELETE', inputRecord, (resp) => {
          resolve(resp);
        }, (error) => {
          reject();
          console.log(error);
          throw error;
        });
      });
    }
  };
  const DOCUSIGN_API_MAP = {
    "hostenv": "account-d.docusign.com",
    "apiVersion": "v2.1",
    "iKey": "2b4603ce-75a6-4eb3-be9c-8db256ed13c0",
    "iSec": "7037fed9-57fe-4cf9-8e32-5183a1d580d5",
    "encodedKeys": "MmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwOjcwMzdmZWQ5LTU3ZmUtNGNmOS04ZTMyLTUxODNhMWQ1ODBkNQ==",
    "accessToken": "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwCAvkNTCE7aSAgAgP5mYUtO2kgCAOvFMPbJ-nZHlIKu0lWtI3IVAAEAAAAYAAEAAAAFAAAADQAkAAAAMmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwIgAkAAAAMmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwMAAAbDceCE7aSDcACrRn_IZ_M0uFLDa0t6gx_g.TtjB4xzOPzxuAbjleZVVKt-odsMuKZzm66kM2AJjFgiMhZ4pY1RWq3w8FyEi6EisuX9rDcYLX0VJ7Tf23SVZs-4w7SwHUo4BKWQyRjyvPsnXVymA4NbdvyC4uBDhXpVbOeea2bKHamMjbgcDml3TYDORWUCMWz_rX_ZkM_bUqmN6cnq6Z8t_WRNgR_J2q-UHhWrcvTAZtw2B1EQ9tdD7YtmtYlnIbO080ZIOW9UBiiAxGbOKixDqrS7Eshhd6Q5CBiuIS5hBMmDuxqZag_XZbswyPlVRwWtqF-OS7mrxflcV2Gd277MecDySyxunpCvo-EcUvKYcnjfUi58ZbanYYw",
    "refreshToken": "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAgABwCAvkNTCE7aSAgAgD6oS5tl2kgCAOvFMPbJ-nZHlIKu0lWtI3IVAAEAAAAYAAEAAAAFAAAADQAkAAAAMmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwIgAkAAAAMmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwMAAAbDceCE7aSDcACrRn_IZ_M0uFLDa0t6gx_g.jRKYFmidKgUTikR0JzlLA-F51v4NpIURwjYJCixOdyUWw31hIRVjwdr4csZ-ZBFqgDH5b-sxTXpt2-0NQcKyN37hoDKrcgAIPweY7MweJEtPK5GEKJArxST-jzasXcFAyKcggZo0d2uzrCPtbR87JRoWfW44RiEbAIs6GglyShI5T_jdRP4IiS9sHlgtjdpxgDp09R6Owv4ttiE0WtJycqB1Oo1oXfdi8tD-uZHPwWUzpg1J0Dx59h_2PyezW1U7mXUUz1WeRegCWyQ63mIoYAD6hcWAJ7TofTED8c6iopNDTkxlJMcAQLsjmcmXoRfZ702s_g5fXsNtKiVhStAbmg",
    "userId": "f630c5eb-fac9-4776-9482-aed255ad2372",
    "accountId": "58d16427-3fd8-4571-ade3-b7fa9eedd40d",
    "baseUrl": "https://demo.docusign.net/restapi/",
    "accountName": "KDDIA",
    "envelopeId": "754f3387-0337-4064-81f0-2c4deb6dbe19",
  };

  const docuSignRequests = {
    getUserInfo: async () => {
      try {
        const resp = await fetch(
          `https://${DOCUSIGN_API_MAP.hostenv}/oauth/userinfo/`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${DOCUSIGN_API_MAP.accessToken}`,
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            }
          }
        );
        const json = await resp.json();
        return json;
      } catch (error) {
        errReturn.push(error);
      }
    },
    refreshAccessToken: async () => {
      try {
        const resp = await fetch(
          `https://${DOCUSIGN_API_MAP.hostenv}/oauth/token/`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${DOCUSIGN_API_MAP.encodedKeys}`,
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            },
            body: JSON.stringify({
              'refresh_token': DOCUSIGN_API_MAP.refreshToken,
              'grant_type': 'refresh_token'
            })
          }
        );
        const json = await resp.json();
        console.log(json);
        return json;
      } catch (error) {
        console.log(error);
      }
    },
    createEmbeddedSenderView: async () => {
      try {
        const resp = await fetch(
          `${DOCUSIGN_API_MAP.baseUrl}/${DOCUSIGN_API_MAP.apiVersion}/accounts/${DOCUSIGN_API_MAP.accountId}/envelopes/${DOCUSIGN_API_MAP.envelopeId}/views/sender`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${DOCUSIGN_API_MAP.encodedKeys}`,
              'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
              "returnUrl": "http://httpbin.org/get",
              "authenticationMethod": "none",
              "email": "m.wallace@kddia.com",
              "userName": "KDDIA"
          })
          }
        );
        const json = await resp.json();
        console.log(json);
        return json;
      } catch (error) {
        console.log(error);
      }
    },
  };

  // Kintone App Fieldcodes
  let fieldcodes = {
    Attachment:"Attachment",
    Token: "Text"
  } 

  // Run when records table is shown
  kintone.events.on('app.record.index.show', function (event) {
    //Prevent duplication of the button
    if (document.getElementById ('my_index_button') != null) return;
    // Set a button
    var myIndexButton = document.createElement('button');
    myIndexButton.id = 'my_index_button';
    myIndexButton.innerHTML = 'Refresh Auth Token';
    myIndexButton.style.height = '48px';

    // Button onclick function
    myIndexButton.onclick = docuSignRequests.refreshAccessToken;

    // Retrieve the header menu space element and set the button there
    kintone.app.getHeaderMenuSpaceElement().appendChild(myIndexButton);
  });

  // Attachment is changed
  let attachEvents = [`app.record.create.change.${fieldcodes.Attachment}`,`app.record.edit.change.${fieldcodes.Attachment}`];
  kintone.events.on(attachEvents, function(event) {
    return event;
  })

  // Refresh Token field is changed
  let tokenEvents = [`app.record.create.change.${fieldcodes.Token}`,`app.record.edit.change.${fieldcodes.Token}`];
  kintone.events.on(tokenEvents, function(event) {
    const resp = docuSignRequests.getUserInfo();
    resp.then((response) => {
      console.log(response);
    });
    return event;
  })

})();