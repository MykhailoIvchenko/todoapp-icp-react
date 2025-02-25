import { Actor, ActorMethod, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { useInternetIdentity } from 'ic-use-internet-identity';

type UseDfinityAgent = () => ActorSubclass<
  Record<string, ActorMethod<unknown[], unknown>>
> | null;

const host = 'http://127.0.0.1:4943'; //TODO: Change it in prod

const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND;

export const useDfinityAgent: UseDfinityAgent = () => {
  const { identity } = useInternetIdentity();

  const idlFactory = ({ IDL }: { IDL: any }) =>
    IDL.Service({
      get_username: IDL.Func([IDL.Principal], [IDL.Opt(IDL.Text)], ['query']),
      get_user_tasks: IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              title: IDL.Text,
              description: IDL.Text,
              createdAt: IDL.Int,
              userPrincipalId: IDL.Principal,
              username: IDL.Text,
              taskId: IDL.Nat,
              status: IDL.Variant({ notCompleted: null, completed: null }),
            })
          ),
        ],
        ['query']
      ),
      create_task: IDL.Func(
        [IDL.Text, IDL.Text],
        [
          IDL.Record({
            title: IDL.Text,
            description: IDL.Text,
            createdAt: IDL.Int,
            userPrincipalId: IDL.Principal,
            username: IDL.Text,
            taskId: IDL.Nat,
            status: IDL.Variant({ notCompleted: null, completed: null }),
          }),
        ],
        []
      ),
    });

  if (!identity) {
    return null;
  }

  const actor = Actor.createActor(idlFactory, {
    agent: HttpAgent.createSync({ identity }),
    canisterId: Principal.fromText(canisterId),
  });

  return actor;
};
