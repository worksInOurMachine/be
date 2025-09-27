"use strict";

module.exports = {
  register(/*{ strapi }*/) {},

  bootstrap(/*{ strapi }*/) {
    // Catch and ignore Windows EPERM unlink errors from temp file cleanup
    process.on("uncaughtException", (err) => {
      if (err.code === "EPERM" && err.syscall === "unlink") {
        console.warn("Ignored EPERM unlink error:", err.path);
        return;
      }
      throw err; // rethrow other errors
    });

    process.on("unhandledRejection", (err) => {
      if (err && err.code === "EPERM" && err.syscall === "unlink") {
        console.warn("Ignored EPERM unlink error:", err.path);
        return;
      }
      throw err;
    });
  },
};
