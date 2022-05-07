import React, { useState } from 'react';
import NextLink from 'next/link';
import {
  Avatar,
  Button,
  Tag,
  Text,
  Link,
  useTheme,
  Modal,
  Snippet,
  Display,
  Input,
  Spacer,
  Textarea,
  useInput
} from '@geist-ui/react';
import * as Icons from 'react-feather';
interface Props {}

export type HeadingProps = Props;

const Heading: React.FC<HeadingProps> = () => {
  const theme = useTheme();
  const [add, setAdd] = useState(false);
  const addHandler = () => setAdd(true);
  const closeAddHandler = () => setAdd(false);

  const descriptionRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const clusterIdRef = React.useRef(null);

  const setAddChange = () => {
    console.log(window.localStorage.getItem('authToken'));
    fetch(process.env.NEXT_PUBLIC_HULSE_API_URL + 'cluster/create/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: nameRef.current.value, description: descriptionRef.current.value })
    }).then((res) => console.log(res.json()));
  };

  const setJoinChange = () => {
    console.log(window.localStorage.getItem('authToken'));
    fetch(process.env.NEXT_PUBLIC_HULSE_API_URL + 'cluster/join/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cluster_id: clusterIdRef.current.value })
    }).then((res) => console.log(res.json()));
  };

  return (
    <>
      <div className="heading__wrapper">
        <div className="heading">
          <Avatar
            alt={
              typeof window !== 'undefined' ? window.localStorage.getItem('username') + ' avatar' : 'username avatar'
            }
            className="heading__user-avatar"
            src={typeof window !== 'undefined' && window.localStorage.getItem('picture')}
          />
          <div className="heading__name">
            <div className="heading__title">
              <Text h2 className="headding__user-name">
                {typeof window !== 'undefined' &&
                  window.localStorage.getItem('first_name') &&
                  window.localStorage.getItem('first_name')}{' '}
                {typeof window !== 'undefined' &&
                  window.localStorage.getItem('last_name') &&
                  window.localStorage.getItem('last_name')}
              </Text>
              {/*<Tag className="headding__user-role">{user.role}</Tag>*/}
              <div className="heading__actions">
                {/*<Input label="username" placeholder="Geist UI" />*/}

                <Input label="Cluster Id" placeholder="a6039b18" width={20} height={1.1} ref={clusterIdRef} />
                <Spacer w={0.6} />
                <Button auto onClick={setJoinChange} height={1}>
                  Join Cluster
                </Button>
                <Spacer w={1} />
                <Text>/</Text>
                <Spacer w={1} />
                <Button auto onClick={addHandler} type="secondary" height={1}>
                  New Cluster
                </Button>
                <Modal visible={add} onClose={closeAddHandler}>
                  <Modal.Title>New Cluster</Modal.Title>
                  <Modal.Content>
                    <div>
                      <Text type="secondary">Cluster name:</Text>
                      <Input width="100%" initialValue="" placeholder="compute-pool-1" ref={nameRef} />
                    </div>
                    <Spacer h={0.5} />
                    <Text type="secondary">Cluster description:</Text>
                    <Textarea
                      width="100%"
                      placeholder="Pooling resources for the RL lab temporal-network project."
                      ref={descriptionRef}
                    />
                    <Spacer h={0.5} />
                    <Text small i>
                      You will get an invite link to share with your team members in the next step.
                    </Text>
                  </Modal.Content>
                  <Modal.Action passive onClick={() => setAdd(false)}>
                    Cancel
                  </Modal.Action>
                  <Modal.Action
                    passive
                    onClick={() => {
                      setAdd(false);
                      setAddChange();
                    }}
                  >
                    Create
                  </Modal.Action>
                </Modal>
              </div>
            </div>

            {/*user.github && (
              <div className="heading__integration">
                <Text className="heading__integration-title">Git Integrations</Text>
                <Link href={`https://github.com/${user.github}`} target="_blank" rel="noopener" underline>
                  <div className="heading__integration-inner">
                    <Icons.GitHub size={16} aria-label="Github" />
                    <span>{user.github}</span>
                  </div>
                </Link>
              </div>
            )*/}
          </div>
        </div>
      </div>
      <style jsx>{`
        .heading__wrapper {
          border-bottom: 1px solid ${theme.palette.border};
        }
        .heading {
          display: flex;
          flex-direction: row;
          width: ${theme.layout.pageWidthWithMargin};
          max-width: 100%;
          margin: 0 auto;
          padding: calc(${theme.layout.gap} * 2) ${theme.layout.pageMargin} calc(${theme.layout.gap} * 4);
          box-sizing: border-box;
        }
        .heading :global(.heading__user-avatar) {
          height: 100px;
          width: 100px;
          margin-right: ${theme.layout.gap};
        }
        .heading__title {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex: 1;
        }
        .heading__name {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
        }
        .heading__name :global(.headding__user-name) {
          line-height: 1;
        }
        .heading__name :global(.headding__user-role) {
          background: ${theme.palette.accents_1};
          border-color: ${theme.palette.accents_2};
          border-radius: 1rem;
          padding: 0.175rem 0.5rem;
          height: unset;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          margin-left: ${theme.layout.gapQuarter};
        }
        .heading__actions {
          margin-left: auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .heading__integration :global(.heading__integration-title) {
          color: ${theme.palette.accents_5} !important;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          margin: 0;
        }
        .heading__integration-inner {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        .heading__integration-inner :global(svg) {
          margin-right: ${theme.layout.gapQuarter};
        }

        @media (max-width: ${theme.breakpoints.xs.max}) {
          .heading :global(.heading__user-avatar) {
            width: 80px !important;
            height: 80px !important;
          }
          .heading__name :global(.headding__user-name) {
            font-size: 1.5rem;
          }
          .heading__actions {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Heading;
