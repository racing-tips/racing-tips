#!/usr/bin/env node

const program = require('commander');
const yaml = require('js-yaml');
const fs = require('fs');

program
.version('1.0.0')
.command('update <file> <name> <appVersion>')
.action((file, name, appVersion) => {
  writeToFile(updateAppVersion(loadYaml(file), name, appVersion), file)
});

program.parse(process.argv);

function loadYaml(requirementsFileName) {
  console.log("Attempting to load file: ", requirementsFileName);
  try {
    var doc = yaml.safeLoad(fs.readFileSync(requirementsFileName, 'utf8'));
    return doc;
  } catch (e) {
    console.log(e);
    process.exit();
  }
}

function updateAppVersion(doc, name, version) {
  var apps = doc.dependencies;
  const appIndex = apps.findIndex(app => app.name === name);
  var app = apps[appIndex];
  app.version = version;
  apps.splice(appIndex, 1, app);
  doc.dependencies = apps;
  return doc;
}

function writeToFile(doc, requirementsFileName) {
    fs.writeFile(requirementsFileName, yaml.safeDump(doc), function (err) {
    if (err) throw err;
    console.log('New requirements created successfully.');
  });
}
