import { Actor, ActorMethod, ActorSubclass, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import { useInternetIdentity } from 'ic-use-internet-identity';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type UseDfinityAgent = () => ActorSubclass<
  Record<string, ActorMethod<unknown[], unknown>>
> | null;

const host = 'http://127.0.0.1:4943';
// //TODO: Change it in prod
// const host = 'localhost:4943';

const canisterId = import.meta.env.VITE_CANISTER_ID_BACKEND;

export const useDfinityAgent: UseDfinityAgent = () => {
  const { identity } = useInternetIdentity();

  const [actor, setActor] = useState<ActorSubclass<
    Record<string, ActorMethod<unknown[], unknown>>
  > | null>(null);

  const idlFactory = ({ IDL }: { IDL: any }) =>
    IDL.Service({
      get_username: IDL.Func([], [IDL.Opt(IDL.Text)], ['query']),
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

  const getActorAndSet = async () => {
    try {
      const agent = await HttpAgent.create({
        host: 'http://127.0.0.1:4943',
        identity,
      });

      await agent.fetchRootKey();

      const generatedActor = Actor.createActor(idlFactory, {
        agent,
        canisterId: Principal.fromText(canisterId),
      });

      setActor(generatedActor);
    } catch (error) {
      toast.error('An error occured during the agent initialization');
    }
  };

  useEffect(() => {
    getActorAndSet();
  }, []);

  return actor;
};
