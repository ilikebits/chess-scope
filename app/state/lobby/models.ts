import { Paged } from '../util/models';
import { WrappedSocket } from '../util/sockets';
import { Async } from '../util/types';

// API response models.
export type Player = {
  readonly lag?: number;
  readonly name: string;
  readonly online?: boolean;
  readonly provisional: boolean;
  readonly rating: number;
  readonly ratingDiff?: number | null;
  readonly title?: string | null;
};

export type GamePlayer = Player & {
  readonly userId: string;
};

export type Game = {
  readonly clock: {
    readonly initial: number;
    readonly increment: number;
    readonly totalTime: number;
  };
  readonly color: 'black' | 'white';
  readonly createdAt: number;
  readonly id: string;
  readonly lastMoveAt: number;
  readonly perf: string;
  readonly players: {
    readonly white: GamePlayer;
    readonly black: GamePlayer;
  };
  readonly rated: boolean;
  readonly speed: string;
  readonly status: string;
  readonly turns: number;
  readonly url: string;
  readonly variant: string;
  readonly winner: 'black' | 'white';
};

// WebSocket response models.
export type ChallengePlayer = Player & {
  readonly id: string;
};

export type Challenge = {
  readonly challenger: ChallengePlayer;
  readonly color: 'black' | 'white' | 'random';
  readonly destUser: ChallengePlayer;
  readonly direction: 'in' | 'out';
  readonly id: string;
  readonly initialFen: string | null;
  readonly perf: {
    readonly icon: string;
    readonly name: string;
  };
  readonly rated: boolean;
  readonly status: string;
  readonly timeControl: {
    readonly type: string;
  };
  readonly variant: {
    readonly key: string;
    readonly short: string;
    readonly name: string;
  };
};

export type Challenges = {
  readonly t: 'challenges';
  readonly d: {
    readonly i18n: { readonly [phrase: string]: string };
    readonly in: ReadonlyArray<Challenge>;
    readonly out: ReadonlyArray<Challenge>;
  };
};

export type Pong = {
  readonly t: 'n';
  readonly r: number;
  readonly d: number;
};

export type ReloadForum = {
  readonly t: 'reload_forum';
};

export type ReloadSeeks = {
  readonly t: 'reload_seeks';
};

export type Tournaments = {
  readonly t: 'tournaments';
  readonly d: string;
};

export type Featured = {
  readonly t: 'featured';
  readonly d: {
    readonly color: 'black' | 'white';
    readonly html: string;
    readonly id: string;
  };
};

export type Simuls = {
  readonly t: 'simuls';
  readonly d: string;
};

export type FollowingOnlines = {
  readonly t: 'following_onlines';
  readonly d: ReadonlyArray<{}>;
  readonly patrons: ReadonlyArray<{}>;
  readonly playing: ReadonlyArray<{}>;
  readonly studying: ReadonlyArray<{}>;
};

export type Streams = {
  readonly t: 'streams';
  readonly d: string;
};

export type LobbyServerMessage =
  | Challenges
  | Pong
  | ReloadSeeks
  | ReloadForum
  | Tournaments
  | Featured
  | Simuls
  | FollowingOnlines
  | Streams;

// WebSocket request models.
export type Ping = {
  readonly t: 'p';
  readonly v: number;
};

export type LobbyClientMessage = Ping;

// State model.
export type LobbyState = Readonly<{
  readonly socket: Async<WrappedSocket<LobbyServerMessage, LobbyClientMessage> | null>;
  readonly challenges: ReadonlyArray<Challenge>;
  readonly games: Async<Paged<Game> | null>;
  readonly players: number | null;
}>;
