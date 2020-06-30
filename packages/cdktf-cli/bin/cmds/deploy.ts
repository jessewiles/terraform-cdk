import * as yargs from 'yargs';
import { render } from 'ink';
import React from 'react';
import  { Deploy } from './ui/deploy'
import { readConfigSync } from '../../lib/config';
import { TerraformProvider } from './ui/terraform-context'
const config = readConfigSync();

class Command implements yargs.CommandModule {
  public readonly command = 'deploy [OPTIONS]';
  public readonly describe = 'Deploy the given stack';

  public readonly builder = (args: yargs.Argv) => args
    .option('app', { default: config.app, required: true, desc: 'Command to use in order to execute cdktf app', alias: 'a' })
    .option('output', { default: config.output, required: true, desc: 'Output directory', alias: 'o' })
    .option('auto-approve', { type: 'boolean', default: false, required: false, desc: 'Auto approve' })
    .showHelpOnFail(true)

  public async handler(argv: any) {
    const command = argv.app;
    const outdir = argv.output;
    const autoApprove = argv.autoApprove;

    render(
      React.createElement(TerraformProvider, {}, React.createElement(Deploy, { targetDir: outdir, synthCommand: command, autoApprove }))
    );
  }
}

module.exports = new Command();

