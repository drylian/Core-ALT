// logging.mjs
import { log } from "./loggings/logs.mjs";
import { controllers } from "./loggings/controllers.mjs";

const core = {
	log(message) {
		log("Info", message);
	},
	err(message) {
		log("Error", message);
	},
	warn(message) {
		log("Warn", message);
	},
	info(message) {
		log("Info", message);
	},
	debug(message) {
		log("Debug", message);
	},
	sys(message) {
		log("Core", message);
	},
	cus(level, message, color) {
		log(level, message, color);
	},
};

const controller = {
	log(controller, message, color) {
		controllers(controller, message, color, "Info");
	},
	err(controller, message, color) {
		controllers(controller, message, color, "Error");
	},
	warn(controller, message, color) {
		controllers(controller, message, color, "Warn");
	},
	info(controller, message, color) {
		controllers(controller, message, color, "Info");
	},
	debug(controller, message, color) {
		controllers(controller, message, color, "Debug");
	},
	sys(controller, message, color) {
		controllers(controller, message, color, "Core");
	},
};

export default core;
export { controller };
