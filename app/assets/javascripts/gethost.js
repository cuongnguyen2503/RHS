var http = location.protocol;
var slashes = http.concat("//");
var host = slashes.concat(window.location.hostname);
var localhost = host + ":3000"
var implementhost;

function gethost(){
  if(_rails_env == "development" || _rails_env == "test"){
    implementhost = localhost;
    return implementhost;
  }
  else{
    implementhost = host;
    return implementhost;
  }
}
