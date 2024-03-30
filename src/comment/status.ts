export enum State {
  Pass,
  Warn,
  Fail,
  Indeterminate,
}

export const status = (state: State, message: string): string => {
  switch (state) {
    case State.Pass:
      return `✅ ${message}\n`;
    case State.Warn:
      return `⚠️ ${message}\n`;
    case State.Fail:
      return `⛔ ${message}\n`;
    case State.Indeterminate:
      return `❓ ${message}\n`;
  }
};

status.pass = (message: string) => status(State.Pass, message);
status.warn = (message: string) => status(State.Warn, message);
status.fail = (message: string) => status(State.Fail, message);
status.indeterminate = (message: string) =>
  status(State.Indeterminate, message);
