import { JobDescription } from './job';

const planeDeparture =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M14.639 10.258l4.83 -1.294a2 2 0 1 1 1.035 3.863l-14.489 3.883l-4.45 -5.02l2.897 -.776l2.45 1.414l2.897 -.776l-3.743 -6.244l2.898 -.777l5.675 5.727z"></path><path d="M3 21h18"></path></svg>';
const planeArrival =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M15.157 11.81l4.83 1.295a2 2 0 1 1 -1.036 3.863l-14.489 -3.882l-1.345 -6.572l2.898 .776l1.414 2.45l2.898 .776l-.12 -7.279l2.898 .777l2.052 7.797z"></path><path d="M3 21h18"></path></svg>';
const rocket =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3"></path><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3"></path><path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path></svg>';
const rocketOff =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M9.29 9.275a9.03 9.03 0 0 0 -.29 .725a6 6 0 0 0 -5 3a8 8 0 0 1 7 7a6 6 0 0 0 3 -5c.241 -.085 .478 -.18 .708 -.283m2.428 -1.61a9 9 0 0 0 2.864 -6.107a3 3 0 0 0 -3 -3a9 9 0 0 0 -6.107 2.864"></path><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3"></path><path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path><path d="M3 3l18 18"></path></svg>';
const playerPause =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"  fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path><path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path></svg>';
const playerPlay = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M7 4v16l13 -8z"></path>
</svg>`;
const barrierBlock = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 7m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v7a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z"></path>
   <path d="M7 16v4"></path>
   <path d="M7.5 16l9 -9"></path>
   <path d="M13.5 16l6.5 -6.5"></path>
   <path d="M4 13.5l6.5 -6.5"></path>
   <path d="M17 16v4"></path>
   <path d="M5 20h4"></path>
   <path d="M15 20h4"></path>
   <path d="M17 7v-2"></path>
   <path d="M7 7v-2"></path>
</svg>`;
const barrierBlockOff = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M11 7h8a1 1 0 0 1 1 1v7c0 .27 -.107 .516 -.282 .696"></path>
   <path d="M16 16h-11a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h2"></path>
   <path d="M7 16v4"></path>
   <path d="M7.5 16l4.244 -4.244"></path>
   <path d="M13.745 9.755l2.755 -2.755"></path>
   <path d="M13.5 16l1.249 -1.249"></path>
   <path d="M16.741 12.759l3.259 -3.259"></path>
   <path d="M4 13.5l4.752 -4.752"></path>
   <path d="M17 17v3"></path>
   <path d="M5 20h4"></path>
   <path d="M15 20h4"></path>
   <path d="M17 7v-2"></path>
   <path d="M3 3l18 18"></path>
</svg>`;
const cup = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 11h14v-3h-14z"></path>
   <path d="M17.5 11l-1.5 10h-8l-1.5 -10"></path>
   <path d="M6 8v-1a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v1"></path>
   <path d="M15 5v-2"></path>
</svg>`;
const crane = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M6 21h6"></path>
   <path d="M9 21v-18l-6 6h18"></path>
   <path d="M9 3l10 6"></path>
   <path d="M17 9v4a2 2 0 1 1 -2 2"></path>
</svg>`;
const refreshAlert = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
   <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
   <path d="M12 9l0 3"></path>
   <path d="M12 15l.01 0"></path>
</svg>`;
const trash = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 7l16 0"></path>
   <path d="M10 11l0 6"></path>
   <path d="M14 11l0 6"></path>
   <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
   <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
</svg>`;
const testPipe = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M20 8.04l-12.122 12.124a2.857 2.857 0 1 1 -4.041 -4.04l12.122 -12.124"></path>
   <path d="M7 13h8"></path>
   <path d="M19 15l1.5 1.6a2 2 0 1 1 -3 0l1.5 -1.6z"></path>
   <path d="M15 3l6 6"></path>
</svg>`;
const rotate2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M15 4.55a8 8 0 0 0 -6 14.9m0 -4.45v5h-5"></path>
   <path d="M18.37 7.16l0 .01"></path>
   <path d="M13 19.94l0 .01"></path>
   <path d="M16.84 18.37l0 .01"></path>
   <path d="M19.37 15.1l0 .01"></path>
   <path d="M19.94 11l0 .01"></path>
</svg>`;
const handStop = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M8 13v-7.5a1.5 1.5 0 0 1 3 0v6.5"></path>
   <path d="M11 5.5v-2a1.5 1.5 0 1 1 3 0v8.5"></path>
   <path d="M14 5.5a1.5 1.5 0 0 1 3 0v6.5"></path>
   <path d="M17 7.5a1.5 1.5 0 0 1 3 0v8.5a6 6 0 0 1 -6 6h-2h.208a6 6 0 0 1 -5.012 -2.7a69.74 69.74 0 0 1 -.196 -.3c-.312 -.479 -1.407 -2.388 -3.286 -5.728a1.5 1.5 0 0 1 .536 -2.022a1.867 1.867 0 0 1 2.28 .28l1.47 1.47"></path>
</svg>`;
const homeCog = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M9 21v-6a2 2 0 0 1 2 -2h1.6"></path>
   <path d="M20 11l-8 -8l-9 9h2v7a2 2 0 0 0 2 2h4.159"></path>
   <path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
   <path d="M18 14.5v1.5"></path>
   <path d="M18 20v1.5"></path>
   <path d="M21.032 16.25l-1.299 .75"></path>
   <path d="M16.27 19l-1.3 .75"></path>
   <path d="M14.97 16.25l1.3 .75"></path>
   <path d="M19.733 19l1.3 .75"></path>
</svg>`;
const timelineEventExclamation = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12 20m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
   <path d="M10 20h-6"></path>
   <path d="M14 20h6"></path>
   <path d="M12 15l-2 -2h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-3l-2 2z"></path>
   <path d="M12 6v2"></path>
   <path d="M12 11v.01"></path>
</svg>`;
const icon360 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M17 15.328c2.414 -.718 4 -1.94 4 -3.328c0 -2.21 -4.03 -4 -9 -4s-9 1.79 -9 4s4.03 4 9 4"></path>
   <path d="M9 13l3 3l-3 3"></path>
</svg>`;
const calendarUp = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
   <path d="M16 3v4"></path>
   <path d="M8 3v4"></path>
   <path d="M4 11h16"></path>
   <path d="M19 22v-6"></path>
   <path d="M22 19l-3 -3l-3 3"></path>
</svg>`;
const calendarCancel = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5"></path>
   <path d="M16 3v4"></path>
   <path d="M8 3v4"></path>
   <path d="M4 11h16"></path>
   <path d="M19 19m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
   <path d="M17 21l4 -4"></path>
</svg>`;
const x = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M18 6l-12 12"></path>
   <path d="M6 6l12 12"></path>
</svg>`;
const terminal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 7l5 5l-5 5"></path>
   <path d="M12 19l7 0"></path>
</svg>`;
const message2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M8 9h8"></path>
   <path d="M8 13h6"></path>
   <path d="M9 18h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-3l-3 3l-3 -3z"></path>
</svg>`;
const command = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M7 9a2 2 0 1 1 2 -2v10a2 2 0 1 1 -2 -2h10a2 2 0 1 1 -2 2v-10a2 2 0 1 1 2 2h-10"></path>
</svg>`;
const stackPush = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M6 10l-2 1l8 4l8 -4l-2 -1"></path>
   <path d="M4 15l8 4l8 -4"></path>
   <path d="M12 4v7"></path>
   <path d="M15 8l-3 3l-3 -3"></path>
</svg>`;
const message2Off = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M6 10l-2 1l8 4l8 -4l-2 -1"></path>
   <path d="M4 15l8 4l8 -4"></path>
   <path d="M12 4v7"></path>
   <path d="M15 8l-3 3l-3 -3"></path>
</svg>`;
const message2Bolt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M8 9h8"></path>
   <path d="M8 13h6"></path>
   <path d="M13 20l-1 1l-3 -3h-3a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5"></path>
   <path d="M19 16l-2 3h4l-2 3"></path>
</svg>`;
const databaseX = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3"></path>
   <path d="M4 6v6c0 1.657 3.582 3 8 3c.537 0 1.062 -.02 1.57 -.058"></path>
   <path d="M20 13.5v-7.5"></path>
   <path d="M4 12v6c0 1.657 3.582 3 8 3c.384 0 .762 -.01 1.132 -.03"></path>
   <path d="M22 22l-5 -5"></path>
   <path d="M17 22l5 -5"></path>
</svg>`;
const notes = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M5 3m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
   <path d="M9 7l6 0"></path>
   <path d="M9 11l6 0"></path>
   <path d="M9 15l4 0"></path>
</svg>`;
const firstAidKit = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M8 8v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2"></path>
   <path d="M4 8m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
   <path d="M10 14h4"></path>
   <path d="M12 12v4"></path>
</svg>`;
const firstAidKitOff = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M8.595 4.577a2 2 0 0 1 1.405 -.577h4a2 2 0 0 1 2 2v2"></path>
   <path d="M12 8h6a2 2 0 0 1 2 2v6m-.576 3.405a2 2 0 0 1 -1.424 .595h-12a2 2 0 0 1 -2 -2v-8a2 2 0 0 1 2 -2h2"></path>
   <path d="M10 14h4"></path>
   <path d="M12 12v4"></path>
   <path d="M3 3l18 18"></path>
</svg>`;
const bulb = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7"></path>
   <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3"></path>
   <path d="M9.7 17l4.6 0"></path>
</svg>`;
export const jobs = [
  {
    name: 'start',
    timeout: 20,
    category: 'system',
    icon: planeDeparture,
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
    category: 'control',
    icon: rocket,
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
    icon: planeArrival,
    category: 'system',
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
    category: 'control',
    icon: playerPause,
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
    category: 'control',
    icon: playerPlay,
    serverstates: ['Paused'],
  },
  {
    name: 'block-orders',
    timeout: 15,
    category: 'control',
    icon: barrierBlock,
    serverstates: ['Okay', 'Paused'],
  },
  {
    name: 'unblock-orders',
    timeout: 3,
    category: 'control',
    icon: barrierBlockOff,
    serverstates: ['Okay', 'Paused'],
  },
  {
    name: 'test-beverage',
    timeout: 3,
    icon: cup,
    category: 'test',
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
    icon: crane,
    category: 'troubleshooting',
    serverstates: ['closed', 'NeverInitialized', 'FatalError'],
    isAdminOnly: true,
  },
  {
    name: 'update',
    isAdminOnly: true,
    icon: refreshAlert,
    category: 'system',
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
    category: 'troubleshooting',
    icon: trash,
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
    icon: testPipe,
    category: 'troubleshooting',
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
    icon: rotate2,
    category: 'troubleshooting',
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
    icon: handStop,
    category: 'troubleshooting',
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
    icon: homeCog,
    category: 'system',
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
    icon: timelineEventExclamation,
    timeout: 240,
    category: 'test',
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
    category: 'system',
    icon: icon360,
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
    icon: calendarUp,
    category: 'schedule',
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
    category: 'schedule',
    icon: calendarCancel,
    serverstates: ['NeverInitialized'],
  },
  {
    name: 'remove-orders',
    icon: x,
    category: 'troubleshooting',
    timeout: 5,
  },
  {
    name: 'shell',
    timeout: 120,
    icon: terminal,
    category: 'system',
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
    icon: message2,
    category: 'other',
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
    icon: command,
    category: 'other',
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
    category: 'system',
    icon: stackPush,
    parameters: [
      {
        type: 'serverstate',
        name: 'newstate',
      },
    ],
  },
  {
    name: 'disable-notifications',
    icon: message2Off,
    category: 'other',
    timeout: 3,
  },
  {
    name: 'enable-notifications',
    icon: message2Bolt,
    category: 'other',
    timeout: 3,
  },
  {
    name: 'reset-redis',
    icon: databaseX,
    category: 'system',
    timeout: 3,
  },
  {
    name: 'upload-logs',
    timeout: 3,
    icon: notes,
    category: 'system',
    isAdminOnly: true,
  },
  {
    name: 'start-maintenance',
    timeout: 30,
    icon: firstAidKit,
    category: 'schedule',
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
    category: 'schedule',
    icon: firstAidKitOff,
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
    category: 'other',
    icon: bulb,
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
