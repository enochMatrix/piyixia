import Bottle from "bottlejs";

import { DatabaseManager } from "./Service/DatabaseService";


/*
  we use bottle for dependency injection
*/

const bottle = new Bottle();

bottle.service('DBService',DatabaseManager);