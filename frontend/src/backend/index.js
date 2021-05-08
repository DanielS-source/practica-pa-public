import {init} from './appFetch';
import * as userService from './userService';
import * as searchService from './searchService';
import * as registrationService from './registrationService';

export {default as NetworkError} from "./NetworkError";

export default {init, userService, searchService, registrationService};
