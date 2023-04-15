import { JobDescription } from './job';

export const jobs = [
  {
    name: 'start',
    timeout: 20,
    options: [
      {
        name: 'soft',
      },
      {
        name: 'hard',
      },
      {
        name: 'forced',
      },
    ],
  },
  {
    name: 'init',
    timeout: 20,
    options: [
      {
        name: 'soft',
      },
      {
        name: 'hard',
      },
      {
        name: 'forced',
      },
    ],
  },
  {
    name: 'shutdown',
    timeout: 15,
    options: [
      {
        name: 'soft',
      },
      {
        name: 'hard',
      },
      {
        name: 'forced',
      },
    ],
  },
  {
    name: 'pause',
    timeout: 15,
    serverstates: ['Okay'],
    options: [
      {
        name: 'soft',
      },
      {
        name: 'hard',
      },
    ],
  },
  {
    name: 'unpause',
    timeout: 3,
    serverstates: ['Paused'],
  },
  {
    name: 'block-orders',
    timeout: 15,
    serverstates: ['Okay', 'Paused'],
  },
  {
    name: 'unblock-orders',
    timeout: 3,
    serverstates: ['Okay', 'Paused'],
  },
  {
    name: 'test-beverage',
    timeout: 3,
    serverstates: ['Okay'],
    parameters: [
      {
        type: 'number',
        name: 'amount',
      },
    ],
  },
  {
    name: 'recover-robot',
    timeout: 3,
    serverstates: ['closed', 'NeverInitialized', 'FatalError'],
    isAdminOnly: true,
  },
  {
    name: 'update',
    isAdminOnly: true,
    timeout: 10080,
    options: [
      {
        name: 'soft',
      },
      {
        name: 'hard',
      },
      {
        name: 'forced',
      },
    ],
  },
  {
    name: 'trash',
    timeout: 30,
    serverstates: ['Paused'],
    parameters: [
      {
        type: 'device:ITrashableDevice',
        name: 'device',
      },
    ],
  },
  {
    name: 'check-device',
    timeout: 15,
    serverstates: ['Okay', 'Paused'],
    parameters: [
      {
        type: 'device:IDevice',
        name: 'device',
      },
    ],
  },
  {
    name: 'restart-device',
    timeout: 60,
    serverstates: ['Okay', 'Paused', 'FatalError'],
    parameters: [
      {
        type: 'device:IRestartableDevice',
        name: 'device',
      },
    ],
  },
  {
    name: 'deactivate-device',
    timeout: 15,
    parameters: [
      {
        type: 'device:IDevice',
        name: 'device',
      },
    ],
    options: [
      {
        name: 'deviceshutdown',
      },
      {
        name: 'devicedisabled',
      },
    ],
  },
  {
    name: 'reload-config',
    timeout: 1440,
    options: [
      {
        name: 'soft',
      },
      {
        name: 'hard',
      },
      {
        name: 'forced',
      },
    ],
  },
  {
    name: 'robot-test',
    timeout: 240,
    serverstates: ['closed', 'NeverInitialized'],
    isAdminOnly: true,
    parameters: [
      {
        type: 'includeForTest',
        name: 'includeForTest',
      },
    ],
  },
  {
    name: 'reboot',
    timeout: 1440,
    isAdminOnly: true,
    options: [
      {
        name: 'soft',
      },
      {
        name: 'hard',
      },
      {
        name: 'forced',
      },
    ],
  },
  {
    name: 'set-start',
    timeout: 5,
    serverstates: ['NeverInitialized'],
    parameters: [
      {
        type: 'date',
        name: 'rebootTime',
      },
    ],
  },
  {
    name: 'remove-start',
    timeout: 5,
    serverstates: ['NeverInitialized'],
  },
  {
    name: 'remove-orders',
    timeout: 5,
  },
  {
    name: 'shell',
    timeout: 120,
    isAdminOnly: true,
    parameters: [
      {
        type: 'string',
        name: 'command',
      },
    ],
  },
  {
    name: 'message',
    timeout: 30,
    parameters: [
      {
        type: 'string',
        name: 'message',
      },
    ],
  },
  {
    name: 'robot-command',
    timeout: 15,
    isAdminOnly: true,
    serverstates: ['Paused'],
    parameters: [
      {
        type: 'string',
        name: 'command',
      },
    ],
  },
  {
    name: 'set-server-state',
    timeout: 15,
    isAdminOnly: true,
    parameters: [
      {
        type: 'serverstate',
        name: 'newstate',
      },
    ],
  },
  {
    name: 'disable-notifications',
    timeout: 3,
  },
  {
    name: 'enable-notifications',
    timeout: 3,
  },
  {
    name: 'reset-redis',
    timeout: 3,
  },
  {
    name: 'upload-logs',
    timeout: 3,
    isAdminOnly: true,
  },
  {
    name: 'start-maintenance',
    timeout: 30,
    serverstates: ['Okay', 'Paused', 'FatalError'],
    options: [
      {
        name: 'soft',
      },
      {
        name: 'hard',
      },
    ],
  },
  {
    name: 'end-maintenance',
    timeout: 30,
    serverstates: ['Maintenance'],
    options: [
      {
        name: 'no-autostart',
      },
      {
        name: 'autostart',
      },
      {
        name: 'immediate-restart',
      },
    ],
    parameters: [
      {
        type: 'date',
        name: 'rebootTime',
        onOption: ['autostart'],
      },
      {
        type: 'boolean',
        name: 'leftPrinterCartridge',
      },
      {
        type: 'boolean',
        name: 'rightPrinterCartridge',
      },
    ],
  },
  {
    name: 'lights',
    timeout: 3,
    options: [
      {
        name: 'on',
      },
      {
        name: 'off',
      },
    ],
  },
] as JobDescription[];
