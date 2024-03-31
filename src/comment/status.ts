import { inline } from "@/comment/section";
import { stateIcon } from "@/comment/state-icon";

export enum State {
  Pass,
  Fail,
}

export const status = (state: State, message: string): string => {
  switch (state) {
    case State.Pass:
      return inline(stateIcon("pass"), message);
    case State.Fail:
      return inline(stateIcon("fail"), message);
  }
};

status.pass = (message: string) => status(State.Pass, message);
status.fail = (message: string) => status(State.Fail, message);
