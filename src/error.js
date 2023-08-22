function setupHandleErrors(app) {
  app.use((err, req, res, next) => {
    console.log(err);

    // for rare cases when something broke while streaming data to client
    // fallback to default express handler
    if (res.headersSent) {
      next(err);
      return;
    }

    res.send(err.message ?? 'Internal error');
  });
}

module.exports = { setupHandleErrors };
