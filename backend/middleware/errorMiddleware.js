export function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || "An unexpected disturbance occurred within the Alchemist's Chamber.";
  
  console.error(`⚔️ Guild Error [${status}]: ${message}`, err);
  
  res.status(status).json({
    success: false,
    error: message,
    status
  });
}
