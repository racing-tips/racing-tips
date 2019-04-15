const yaml = require('js-yaml');
const fs = require('fs');
const requirementsFileName = 'requirements.yaml'

try {
  var doc = yaml.safeLoad(fs.readFileSync(requirementsFileName, 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}

function updateAppVersion(appName, version) {
  var apps = doc.dependencies;
  const appIndex = apps.findIndex(app => app.name === appName);
  var app = apps[appIndex];
  app.version = version;
  apps.splice(appIndex, 1, app);
  doc.dependencies = apps;
}

updateAppVersion('tips', '0.1.0-62')

fs.writeFile(requirementsFileName, yaml.safeDump(doc), function (err) {
  if (err) throw err;
  console.log('New requirements created successfully.');
}); 
