import { Command } from 'commander';

export interface CommandPayload {
  name: string;
  args: string[];
  opts: Record<string, string>;
}

export interface ExecutableCommand {
  name: string;
  cmd: string;
  args: string[];
  env?: { [key: string]: string };
}

type CommandFn = (payload: CommandPayload) => Promise<unknown>;

export function command(commandName: string, commandFn: CommandFn) {
  return async function (...args: unknown[]): Promise<void> {
    const internalCmd = getInternalCommand(args);
    const opts = internalCmd.opts();

    await commandFn({
      name: commandName,
      args: internalCmd.args,
      opts,
    });
  };
}

function getInternalCommand(args: unknown[]): Command {
  return args.slice(-1).pop() as Command;
}

export function isInCiMode(job: CommandPayload): boolean {
  const isInCiEnv = !!process.env.CODEBUILD_BUILD_ID || !!process.env.CI;
  const hasCiFlagEnabled = !!job.opts.ci;
  return isInCiEnv || hasCiFlagEnabled;
}
