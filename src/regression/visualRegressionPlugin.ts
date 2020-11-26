import { TestRunnerPlugin } from '@web/test-runner-core';
import { defaultOptions, VisualRegressionPluginOptions } from './config';
import { visualDiffCommand, VisualDiffCommandResult } from './visualDiffCommand';
import { VisualRegressionError } from './VisualRegressionError';
import type { WebdriverIOLauncher } from '../wdio/index';

interface Payload {
  id: string;
  name: string;
}

function validatePayload(payload: any): payload is Payload {
  if (payload == null || typeof payload !== 'object') {
    throw new Error('Command visual-diff requires a payload with an id and name');
  }

  if (typeof payload.id !== 'string') {
    throw new Error('Command visual-diff is missing an id in payload');
  }

  if (typeof payload.name !== 'string') {
    throw new Error('Command visual-diff is missing a name in payload');
  }
  return true;
}

export function visualRegressionPlugin(
  options: Partial<VisualRegressionPluginOptions> = {},
): TestRunnerPlugin {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    diffOptions: {
      ...defaultOptions.diffOptions,
      ...options.diffOptions,
    },
  };

  return {
    name: 'visual-regression',

    async executeCommand({ command, session, payload }): Promise<VisualDiffCommandResult | void> {
      if (command === 'visual-diff') {
        try {
          if (!validatePayload(payload)) {
            return;
          }

          if (session.browser.type === 'wdio') {
            const browser = session.browser as WebdriverIOLauncher;

            const screenshot = await browser.takeScreenshot(
              session.id,
              `
              return (function () {
                try {
                  var wtr = window.__WTR_VISUAL_REGRESSION__;
                  return wtr && wtr[${payload.id}];
                } catch (_) {
                  return undefined;
                }
              })();
            `,
            );

            return visualDiffCommand(mergedOptions, screenshot, session.browser.name, payload.name);
          }

          throw new Error(
            `Browser type ${session.browser.type} is not supported for visual diffing.`,
          );
        } catch (error: unknown) {
          if (error instanceof VisualRegressionError) {
            return {
              errorMessage: `Something went wrong while executing creating visual diff: ${error.message}`,
              diffPercentage: -1,
              passed: false,
            };
          }

          console.error(error);
          return {
            errorMessage: 'Something went wrong while creating visual diff.',
            diffPercentage: -1,
            passed: false,
          };
        }
      }
    },
  };
}
