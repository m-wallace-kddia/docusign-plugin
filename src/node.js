
import fetch from 'node-fetch';

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
    "accessToken": "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAUABwAAvJdK-U3aSAgAAPy6WDxO2kgCAOvFMPbJ-nZHlIKu0lWtI3IVAAEAAAAYAAEAAAAFAAAADQAkAAAAMmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwIgAkAAAAMmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwMACAwG9A7U3aSDcACrRn_IZ_M0uFLDa0t6gx_g.B4cEBpbnWuL40VPW0CmmTtT66dZPUz1R_LLitBEeFtruLJcIo9pwb_WHnIkIynHcqDtaXG-WQmGKP-Fc3DPVOeYnA296aW961e24-5yl5zDVtlStfJdlMRC8tpbWE5ixpUHpDWaTl2EJ66l9DC6xnM9urekN3WZx3s_emaDnd96TDFwiorYE_uazRBC-OR9RtZOlSpk4k7VZEvbjQ41qqEHQQVpSV9mmAGSeEqnsWN_shXsPmOuANuRSwbvlbYzrXkt5vPdDkXOj4bEJc8hJEF2puXvS7w34LuRmFlgSD_njgHwYfkaf48TDx3AfwBICcfTG70Ek5qeNnelLxDulqA",
    "refreshToken": "eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQoAAAABAAgABwAAU8fB7U3aSAgAANMruoBl2kgCAOvFMPbJ-nZHlIKu0lWtI3IVAAEAAAAYAAEAAAAFAAAADQAkAAAAMmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwIgAkAAAAMmI0NjAzY2UtNzVhNi00ZWIzLWJlOWMtOGRiMjU2ZWQxM2MwMACAwG9A7U3aSDcACrRn_IZ_M0uFLDa0t6gx_g.VIU6Qy8gT2lt4gO3wLzvHgtwYtux9t5MZL15nPpmtWmvl8cISzb5GkzskMZMuDqrcgiw6OsdIYfCSxe4rUw6Igd-qUr4plPpJNmRl-gvOZFHFJ66_T5kv---gsC46ouakGELbuNOKFDlJ-oI_WZ0G6S5KPUislnAzZlwCwFguelHVk93l3x8NEpsDYjsZVAFFq7s3b-aGmKVLMhhAHp9mqSREZ8S5vxbpdpUHAbHsy4FF9pccda7oENs6x6uca6BxEV2udKNEGY6AR3OsvpmLBT-voyiNZ4d7-FqEXFKoKlp--UYyzzGrVtpWZ06KHppqtE4_xY3ekHBKiUU9nMh0w",
    "userId": "f630c5eb-fac9-4776-9482-aed255ad2372",
    "accountId": "58d16427-3fd8-4571-ade3-b7fa9eedd40d",
    "baseUrl": "https://demo.docusign.net/restapi/",
    "accountName": "KDDIA",
    "envelopeId": "2c3ff72f-2223-4411-b8f5-989c14cfe90a",
  };

  const docuSignRequests = {
    getUserInfo: async () => {
      try {
        const resp = await fetch(
          `https://${DOCUSIGN_API_MAP.hostenv}/oauth/userinfo`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${DOCUSIGN_API_MAP.accessToken}`,
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origapp.keyin': '*',
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
      console.log('hit')
      try {
        const resp = await fetch(
          `https://${DOCUSIGN_API_MAP.hostenv}/oauth/token`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Basic ${DOCUSIGN_API_MAP.encodedKeys}`,
              'X-Requested-With': 'XMLHttpRequest',
              'Access-Control-Allow-Origapp.keyin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
              'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
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
  };

  // Kintone App Fieldcodes
  let fieldcodes = {
    Attachment:"Attachment",
    Token: "Text"
  } 

  // Run when records table is shown
  docuSignRequests.refreshAccessToken();

})();