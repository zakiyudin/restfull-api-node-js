import web from "./app/web.js";
import { logger } from "./app/logging.js";

web.listen(3020, () => {
    logger.info("server running like 🚀")
})