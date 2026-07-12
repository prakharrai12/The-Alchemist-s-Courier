module.exports = {
  apps: [
    {
      name: "alchemist-courier-backend",
      script: "./server.js",
      instances: "max",
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
        STARTING_GOLD_LIMIT: 1599,
        PAYMENT_UPI_ID: "7982421223@fam"
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      merge_logs: true,
      time: true
    }
  ]
};
