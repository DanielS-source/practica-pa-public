import {init} from './appFetch';
import * as userService from './userService';
import * as searchService from './searchService';

export {default as NetworkError} from "./NetworkError";

export default {init, userService, searchService};
