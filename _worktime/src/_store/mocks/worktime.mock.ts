import { IProcess } from '../types/worktime.types';
import { user } from './user.mock';

export const workChartForm_sap: IProcess = {
  wiId: '',
  initiator: user,
  user: user,
  currentActivityId: '',
  currentActivityText: '',
  comment: '',
  attachments: [],
  reason: '',
  path: [],
  event: '',
  events: [{ event: 'SEND' }],
  schedule: {
    idWorkTemplate: 'N40R0006',
    nameWorkTemplate: '09:00-18:00 обед 60 минут',
    startDate: '13.11.2020',
    endDate: '',
    timePerWeek: 0,
    break: 60,
    percentage: 100,
    startDateFlags: {
      editable: true,
      show: true,
      required: false
    },
    endDateFlags: {
      editable: true,
      show: true,
      required: false
    },
    breakFlags: {
      editable: true,
      show: true,
      required: false
    },
    workTemplateFlags: {
      editable: true,
      show: true,
      required: false
    },
    workTime: [
      {
        dayId: '1',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          editable: true,
          show: true,
          required: false
        }
      },
      {
        dayId: '2',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          editable: true,
          show: true,
          required: false
        }
      },
      {
        dayId: '3',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          editable: true,
          show: true,
          required: false
        }
      },
      {
        dayId: '4',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          editable: true,
          show: true,
          required: false
        }
      },
      {
        dayId: '5',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          editable: true,
          show: true,
          required: false
        }
      },
      {
        dayId: '6',
        start: 0,
        end: 0,
        editable: false,
        startFlags: {
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          editable: true,
          show: true,
          required: false
        }
      },
      {
        dayId: '7',
        start: 0,
        end: 0,
        editable: false,
        startFlags: {
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          editable: true,
          show: true,
          required: false
        }
      }
    ]
  }
};

export const workChartForm_sap2: IProcess = {
  '@odata.context':
    '$metadata#IProcess(initiator(),user(),schedule(workTemplateFlags(),startDateFlags(),endDateFlags(),breakFlags(),workTime(startFlags(),endFlags())),attachments(),events())/$entity',
  '@odata.metadataEtag': 'W/"20201120135309"',
  wiId: '0',
  path: [],
  referenceNumber: '',
  scenarioStage: 'REQUEST',
  currActArea: '',
  currPathId: '0',
  currStepId: '0',
  reason: '',
  InitDate: '00.00.0000',
  event: '',
  comment: '',
  initiator: {
    departmentPath: '',
    wiId: '0',
    id: '147986',
    fullName: 'Кулыгин Федор',
    firstName: 'Федор',
    secondName: 'Кулыгин',
    middleName: '',
    photo:
      'http://SAPD-HCM-AP01.vtb24.ru:8000/sap/bc/contentserver/100?get&pVersion=0045&contRep=MIME&docId=D48560E1B5B391DC5E10000000A42172E48560E1C5B391DC5E10000000A42172E&compId=male.jpg&accessMode=r&authId=CN%3DHRD&expiration=20201120190724&secKey=MIH4BgkqhkiG9w0BBwKggeowgecCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBxzCBxAIBATAaMA4xDDAKBgNVBAMTA0hSRAIICiAZBCkJQwEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTIwMTEyMDE3MDcyNFowIwYJKoZIhvcNAQkEMRYEFAnbY1Lwljgx3R%2BL%2B1kLmUAkqDrlMAkGByqGSM44BAMELjAsAhQiskU75uTFSfpqLqbUCQo19uOyqwIUbgSCSpEnQvYaFdAPbggwhhFdF4Q%3D',
    position: 'Главный специалист по развитию персонала',
    department: 'Отдел развития персонала'
  },
  user: {
    departmentPath: '',
    wiId: '0',
    id: '147986',
    fullName: 'Кулыгин Федор',
    firstName: 'Федор',
    secondName: 'Кулыгин',
    middleName: '',
    photo:
      'http://SAPD-HCM-AP01.vtb24.ru:8000/sap/bc/contentserver/100?get&pVersion=0045&contRep=MIME&docId=D48560E1B5B391DC5E10000000A42172E48560E1C5B391DC5E10000000A42172E&compId=male.jpg&accessMode=r&authId=CN%3DHRD&expiration=20201120190724&secKey=MIH4BgkqhkiG9w0BBwKggeowgecCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGBxzCBxAIBATAaMA4xDDAKBgNVBAMTA0hSRAIICiAZBCkJQwEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTIwMTEyMDE3MDcyNFowIwYJKoZIhvcNAQkEMRYEFAnbY1Lwljgx3R%2BL%2B1kLmUAkqDrlMAkGByqGSM44BAMELjAsAhQiskU75uTFSfpqLqbUCQo19uOyqwIUbgSCSpEnQvYaFdAPbggwhhFdF4Q%3D',
    position: 'Главный специалист по развитию персонала',
    department: 'Отдел развития персонала'
  },
  schedule: {
    wiId: '0',
    idWorkTemplate: 'N40R0006',
    nameWorkTemplate: '',
    startDate: '20.11.2020',
    endDate: '',
    timePerWeek: 0,
    break: 45,
    percentage: 100,
    startDateFlags: {
      wiId: '0',
      field: 'I0007_BEGDA',
      editable: true,
      show: true,
      required: false
    },
    endDateFlags: {
      wiId: '0',
      field: 'I0007_ENDDA',
      editable: true,
      show: true,
      required: false
    },
    breakFlags: {
      wiId: '0',
      field: 'Z_BREAK',
      editable: true,
      show: true,
      required: false
    },
    workTemplateFlags: {
      wiId: '0',
      field: 'I0007_SCHKZ',
      editable: true,
      show: true,
      required: false
    },
    workTime: [
      {
        wiId: '0',
        idWorkTemplate: 'N40R0006',
        dayId: '1',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '0',
          field: 'Z_TIMEBEG1',
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '0',
          field: 'Z_TIMEEND1',
          editable: true,
          show: true,
          required: false
        }
      },
      {
        wiId: '0',
        idWorkTemplate: 'N40R0006',
        dayId: '2',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '0',
          field: 'Z_TIMEBEG2',
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '0',
          field: 'Z_TIMEEND2',
          editable: true,
          show: true,
          required: false
        }
      },
      {
        wiId: '0',
        idWorkTemplate: 'N40R0006',
        dayId: '3',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '0',
          field: 'Z_TIMEBEG3',
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '0',
          field: 'Z_TIMEEND3',
          editable: true,
          show: true,
          required: false
        }
      },
      {
        wiId: '0',
        idWorkTemplate: 'N40R0006',
        dayId: '4',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '0',
          field: 'Z_TIMEBEG4',
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '0',
          field: 'Z_TIMEEND4',
          editable: true,
          show: true,
          required: false
        }
      },
      {
        wiId: '0',
        idWorkTemplate: 'N40R0006',
        dayId: '5',
        start: 540,
        end: 1005,
        editable: true,
        startFlags: {
          wiId: '0',
          field: 'Z_TIMEBEG5',
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '0',
          field: 'Z_TIMEEND5',
          editable: true,
          show: true,
          required: false
        }
      },
      {
        wiId: '0',
        idWorkTemplate: 'N40R0006',
        dayId: '6',
        start: 0,
        end: 0,
        editable: false,
        startFlags: {
          wiId: '0',
          field: 'Z_TIMEBEG6',
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '0',
          field: 'Z_TIMEEND6',
          editable: true,
          show: true,
          required: false
        }
      },
      {
        wiId: '0',
        idWorkTemplate: 'N40R0006',
        dayId: '7',
        start: 0,
        end: 0,
        editable: false,
        startFlags: {
          wiId: '0',
          field: 'Z_TIMEBEG7',
          editable: true,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '0',
          field: 'Z_TIMEEND7',
          editable: true,
          show: true,
          required: false
        }
      }
    ]
  },
  attachments: [
    {
      wiId: '0',
      attGuid: '',
      attType: 'SFREEATTM',
      attTypeText: 'Общие приложения',
      attFileName: '',
      attBase64: 'data:;base64,',
      attAction: ''
    }
  ],
  events: [
    {
      wiId: '0',
      event: 'SEND'
    }
  ]
};
export const workChartForm_sap1: IProcess = {
  '@odata.context':
    '$metadata#IProcess(initiator(),user(),schedule(workTemplateFlags(),startDateFlags(),endDateFlags(),breakFlags(),workTime(startFlags(),endFlags())),attachments(wiId,attGuid,attType,attTypeText,attFileName),path(user()),events())/$entity',
  '@odata.metadataEtag': 'W/"20201121152013"',
  wiId: '438660',
  referenceNumber: '000000000141',
  scenarioStage: 'PROCESS',
  currActArea: 'ZHRXSS',
  currPathId: '10000002325',
  currStepId: '3',
  reason: '',
  InitDate: '24.11.2020',
  event: '',
  comment: '',
  initiator: {
    departmentPath: '',
    wiId: '438660',
    id: '147986',
    fullName: 'Кулыгин Федор',
    firstName: 'Федор',
    secondName: 'Кулыгин',
    middleName: '',
    photo:
      'http://SAPD-HCM-AP01.vtb24.ru:8000/sap/bc/contentserver/100?get&pVersion=0045&contRep=MIME&docId=D48560E1B5B391DC5E10000000A42172E48560E1C5B391DC5E10000000A42172E&compId=male.jpg&accessMode=r&authId=CN%3DHRD&expiration=20201124165758&secKey=MIH5BgkqhkiG9w0BBwKggeswgegCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGByDCBxQIBATAaMA4xDDAKBgNVBAMTA0hSRAIICiAZBCkJQwEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTIwMTEyNDE0NTc1OFowIwYJKoZIhvcNAQkEMRYEFHTkmIZqtwE4bqq2MrPfPO%2BXG0yRMAkGByqGSM44BAMELzAtAhUAgC8Fiq6fisAWX8%2BBckwnOmE60xgCFDtFJWKOWqSNL0mWvhm972YunvJT',
    position: 'Главный специалист по развитию персонала',
    department: 'Отдел развития персонала'
  },
  user: {
    departmentPath: '',
    wiId: '438660',
    id: '147986',
    fullName: 'Кулыгин Федор',
    firstName: 'Федор',
    secondName: 'Кулыгин',
    middleName: '',
    photo:
      'http://SAPD-HCM-AP01.vtb24.ru:8000/sap/bc/contentserver/100?get&pVersion=0045&contRep=MIME&docId=D48560E1B5B391DC5E10000000A42172E48560E1C5B391DC5E10000000A42172E&compId=male.jpg&accessMode=r&authId=CN%3DHRD&expiration=20201124165758&secKey=MIH5BgkqhkiG9w0BBwKggeswgegCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGByDCBxQIBATAaMA4xDDAKBgNVBAMTA0hSRAIICiAZBCkJQwEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTIwMTEyNDE0NTc1OFowIwYJKoZIhvcNAQkEMRYEFHTkmIZqtwE4bqq2MrPfPO%2BXG0yRMAkGByqGSM44BAMELzAtAhUAgC8Fiq6fisAWX8%2BBckwnOmE60xgCFDtFJWKOWqSNL0mWvhm972YunvJT',
    position: 'Главный специалист по развитию персонала',
    department: 'Отдел развития персонала'
  },
  schedule: {
    wiId: '438660',
    idWorkTemplate: '',
    nameWorkTemplate: '',
    startDate: '01.11.2020',
    endDate: '',
    timePerWeek: 2400,
    break: 60,
    percentage: 100,
    startDateFlags: {
      wiId: '438660',
      field: 'I0007_BEGDA',
      editable: true,
      show: true,
      required: false
    },
    endDateFlags: {
      wiId: '438660',
      field: 'I0007_ENDDA',
      editable: true,
      show: true,
      required: false
    },
    breakFlags: {
      wiId: '438660',
      field: 'Z_BREAK',
      editable: false,
      show: true,
      required: false
    },
    workTemplateFlags: {
      wiId: '438660',
      field: 'I0007_SCHKZ',
      editable: true,
      show: true,
      required: false
    },
    workTime: [
      {
        wiId: '438660',
        idWorkTemplate: '',
        dayId: '1',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '438660',
          field: 'Z_TIMEBEG1',
          editable: false,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '438660',
          field: 'Z_TIMEEND1',
          editable: false,
          show: true,
          required: false
        }
      },
      {
        wiId: '438660',
        idWorkTemplate: '',
        dayId: '2',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '438660',
          field: 'Z_TIMEBEG2',
          editable: false,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '438660',
          field: 'Z_TIMEEND2',
          editable: false,
          show: true,
          required: false
        }
      },
      {
        wiId: '438660',
        idWorkTemplate: '',
        dayId: '3',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '438660',
          field: 'Z_TIMEBEG3',
          editable: false,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '438660',
          field: 'Z_TIMEEND3',
          editable: false,
          show: true,
          required: false
        }
      },
      {
        wiId: '438660',
        idWorkTemplate: '',
        dayId: '4',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '438660',
          field: 'Z_TIMEBEG4',
          editable: false,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '438660',
          field: 'Z_TIMEEND4',
          editable: false,
          show: true,
          required: false
        }
      },
      {
        wiId: '438660',
        idWorkTemplate: '',
        dayId: '5',
        start: 540,
        end: 1080,
        editable: true,
        startFlags: {
          wiId: '438660',
          field: 'Z_TIMEBEG5',
          editable: false,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '438660',
          field: 'Z_TIMEEND5',
          editable: false,
          show: true,
          required: false
        }
      },
      {
        wiId: '438660',
        idWorkTemplate: '',
        dayId: '6',
        start: 0,
        end: 0,
        editable: false,
        startFlags: {
          wiId: '438660',
          field: 'Z_TIMEBEG6',
          editable: false,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '438660',
          field: 'Z_TIMEEND6',
          editable: false,
          show: true,
          required: false
        }
      },
      {
        wiId: '438660',
        idWorkTemplate: '',
        dayId: '7',
        start: 0,
        end: 0,
        editable: false,
        startFlags: {
          wiId: '438660',
          field: 'Z_TIMEBEG7',
          editable: false,
          show: true,
          required: false
        },
        endFlags: {
          wiId: '438660',
          field: 'Z_TIMEEND7',
          editable: false,
          show: true,
          required: false
        }
      }
    ]
  },
  attachments: [
    {
      wiId: '438660',
      attGuid: '00505683C29F1EEB8BCC6F947C037D4D',
      attType: 'SFREEATTM',
      attTypeText: 'Общие приложения',
      attFileName: 'RP.doc'
    },
    {
      wiId: '438660',
      attGuid: '00505683C29F1EEB8BCC77785F56BD4D',
      attType: 'SFREEATTM',
      attTypeText: 'Общие приложения',
      attFileName: 'С Днём Победы!.mp4'
    }
  ],
  events: [
    {
      wiId: '438660',
      event: 'SEND'
    },
    {
      wiId: '438660',
      event: 'BACKTO'
    }
  ],
  path: [
    {
      criticality: '',
      stepId: '0',
      activityId: 'ASR_INIT',
      activityText: 'Создание заявки',
      agent: '',
      agentName: '',
      statusId: 'I',
      statusText: 'Отправлено',

      // stepId: string;
      // /** Тип шаг (ид)*/
      // activityId: string;
      // /** Тип шаг (текст)*/
      // activityText: string;
      // /** Агент (ид)*/
      // agent: string;
      // /** Агент (текст)*/
      // agentName: string;
      // /** Фактический исполнитель*/
      // user: IUser | null;
      // /** Статус (ид)*/
      // statusId: string;
      // /** Статус (текст)*/
      // statusText: string;
      // /** Критичность (0 - None (no color) / 1 - Error (red) / 2 - Warning (yellow) / 3 - Success (green))*/
      // criticality: string;
      // date?: number;
      // comment?: string;
      date: 1606239839000,
      comment: '',
      user: [
        {
          wiId: '438660',
          departmentPath: '',
          id: '147986',
          fullName: 'Кулыгин Федор',
          firstName: 'Федор',
          secondName: 'Кулыгин',
          middleName: '',
          photo:
            'http://SAPD-HCM-AP01.vtb24.ru:8000/sap/bc/contentserver/100?get&pVersion=0045&contRep=MIME&docId=D48560E1B5B391DC5E10000000A42172E48560E1C5B391DC5E10000000A42172E&compId=male.jpg&accessMode=r&authId=CN%3DHRD&expiration=20201124165758&secKey=MIH5BgkqhkiG9w0BBwKggeswgegCAQExCzAJBgUrDgMCGgUAMAsGCSqGSIb3DQEHATGByDCBxQIBATAaMA4xDDAKBgNVBAMTA0hSRAIICiAZBCkJQwEwCQYFKw4DAhoFAKBdMBgGCSqGSIb3DQEJAzELBgkqhkiG9w0BBwEwHAYJKoZIhvcNAQkFMQ8XDTIwMTEyNDE0NTc1OFowIwYJKoZIhvcNAQkEMRYEFHTkmIZqtwE4bqq2MrPfPO%2BXG0yRMAkGByqGSM44BAMELzAtAhUAgC8Fiq6fisAWX8%2BBckwnOmE60xgCFDtFJWKOWqSNL0mWvhm972YunvJT',
          position: 'Главный специалист по развитию персонала',
          department: 'Отдел развития персонала'
        }
      ]
    }
  ]
};

const approvalSchadule = {
  idWorkTemplate: 'N40R0006',
  nameWorkTemplate: '09:00-18:00 обед 60 минут',
  startDate: '13.11.2020',
  endDate: '',
  timePerWeek: 0,
  break: 60,
  percentage: 100,
  startDateFlags: {
    editable: true,
    show: false,
    required: false
  },
  endDateFlags: {
    editable: true,
    show: false,
    required: false
  },
  breakFlags: {
    editable: true,
    show: false,
    required: false
  },
  workTemplateFlags: {
    editable: true,
    show: false,
    required: false
  },
  workTime: [
    {
      dayId: '1',
      start: 540,
      end: 1080,
      editable: true,
      startFlags: {
        editable: true,
        show: false,
        required: false
      },
      endFlags: {
        editable: true,
        show: false,
        required: false
      }
    },
    {
      dayId: '2',
      start: 540,
      end: 1080,
      editable: true,
      startFlags: {
        editable: true,
        show: true,
        required: false
      },
      endFlags: {
        editable: true,
        show: true,
        required: false
      }
    },
    {
      dayId: '3',
      start: 540,
      end: 1080,
      editable: true,
      startFlags: {
        editable: true,
        show: true,
        required: false
      },
      endFlags: {
        editable: true,
        show: true,
        required: false
      }
    },
    {
      dayId: '4',
      start: 540,
      end: 1080,
      editable: true,
      startFlags: {
        editable: true,
        show: true,
        required: false
      },
      endFlags: {
        editable: true,
        show: true,
        required: false
      }
    },
    {
      dayId: '5',
      start: 540,
      end: 1080,
      editable: true,
      startFlags: {
        editable: true,
        show: true,
        required: false
      },
      endFlags: {
        editable: true,
        show: true,
        required: false
      }
    },
    {
      dayId: '6',
      start: 0,
      end: 0,
      editable: false,
      startFlags: {
        editable: true,
        show: true,
        required: false
      },
      endFlags: {
        editable: true,
        show: true,
        required: false
      }
    },
    {
      dayId: '7',
      start: 0,
      end: 0,
      editable: false,
      startFlags: {
        editable: true,
        show: true,
        required: false
      },
      endFlags: {
        editable: true,
        show: true,
        required: false
      }
    }
  ]
};
export const approvalMock: IProcess = {
  wiId: '1',
  initiator: { ...user, id: '1231' },
  user: { ...user, id: '123' },
  schedule: approvalSchadule,
  currentActivityId: 'ASR_APP',
  reason: '',
  currentActivityText: 'Согласование',
  event: '',
  events: [{ event: 'SEND' }, { event: 'APPROVE' }],
  comment: '',
  attachments: [
    {
      attGuid: '1',
      attType: 'SPRGNYCRTF',
      attTypeText: 'Справка по беременности',
      attFileName: 'Photo_of_puppets.png'
    }
  ],
  path: [
    {
      stepId: '00001',
      activityId: 'INIT',
      activityText: 'Создание заявки',
      agent: '',
      agentName: '',
      user: [user],
      statusId: 'I',
      statusText: 'Отправлено',
      criticality: '3',
      comment: 'Прошу согласовать мой новый график рабочего времени.',
      date: 1605534668629
    },
    {
      stepId: '00002',
      activityId: 'ASR_APP',
      activityText: 'Согласование',
      agent: 'AC90000072',
      agentName: 'Руководитель ССП',
      user: [{ ...user, id: '2' }],
      statusId: 'A',
      statusText: 'Согласовано',
      criticality: '3',
      comment: 'Чудесный график. Однозначно нужно согласовать!',
      date: 1605534669629
    },
    {
      stepId: '00003',
      activityId: 'ASR_APP',
      activityText: 'Согласование',
      agent: 'AC90000022',
      agentName: 'РДП ГО',
      user: [{ ...user, id: '3' }],
      statusId: 'I',
      statusText: 'В работе',
      criticality: '0'
    },
    {
      stepId: '00004',
      activityId: 'ASR_APP',
      activityText: 'Согласование',
      agent: 'AC90000076',
      agentName: 'ССП-1',
      user: null,
      statusId: '',
      statusText: '',
      criticality: '0'
    }
  ]
};
