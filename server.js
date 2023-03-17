const app = require('./index');
const PORT  = 4005;

const server  = app.listen(PORT,function(){
    const port = server.address().port;
  const msg = "App listening at port %s at process id %s";
  console.info(msg, port, process.pid);
})


process.on("SIGINT", function () {
    server.close(function () {
      const msg = "Server is closing gracefully through SIGINT at process id %s";
      console.info(msg, process.pid);
      process.exit();
    });
  });