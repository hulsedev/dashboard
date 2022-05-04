import React, { useState } from 'react';
import {
  Avatar,
  Button,
  Text,
  Link,
  Card,
  Dot,
  Tag,
  useTheme,
  Snippet,
  Spacer,
  Modal,
  Input,
  Textarea
} from '@geist-ui/react';
import GitHubIcon from '@/components/icons/github';
import Users from '@geist-ui/icons/users';
import Edit from '@geist-ui/icons/edit';
import Delete from '@geist-ui/icons/delete';
import LogOut from '@geist-ui/icons/logOut';
interface Props {
  cluster;
}

export type ProjectCardProps = Props;

const ProjectCard: React.FC<ProjectCardProps> = ({ cluster }) => {
  const theme = useTheme();

  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const editHandler = () => setEdit(true);
  const deleteHandler = () => setRemove(true);

  const closeEditHandler = () => setEdit(false);
  const closeDeleteHandler = () => setRemove(false);
  const descriptionRef = React.useRef(null);
  const nameRef = React.useRef(null);

  const [leave, setLeave] = useState(false);
  const leaveHandler = () => setLeave(true);

  const closeLeaveHandler = () => setLeave(false);

  const setDeleteChange = () => {
    console.log(window.localStorage.getItem('authToken'));
    fetch(process.env.NEXT_PUBLIC_HULSE_API_URL + 'cluster/delete/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cluster_id: cluster.id })
    }).then((res) => console.log(res.json()));
  };

  const setEditChange = () => {
    console.log(window.localStorage.getItem('authToken'));
    fetch(process.env.NEXT_PUBLIC_HULSE_API_URL + 'cluster/edit/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cluster_id: cluster.id,
        name: nameRef.current.value,
        description: descriptionRef.current.value
      })
    }).then((res) => console.log(res.json()));
  };

  const setLeaveChange = () => {
    fetch(process.env.NEXT_PUBLIC_HULSE_API_URL + 'cluster/leave/', {
      method: 'POST',
      headers: {
        Authorization: 'Token ' + window.localStorage.getItem('authToken'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cluster_id: cluster.id })
    }).then((res) => console.log(res.json()));
  };

  return (
    <>
      <div className="project__wrapper">
        <Card className="project__card" shadow>
          <div className="project-title__wrapper">
            <div className="project-title__wrapper-sub-text">
              <Avatar text={cluster.name[0]} height={1.25} width={1.25} marginRight={0.75} className="project-icon" />
              <div className="project-title__content">
                <Text
                  margin={0}
                  style={{ fontWeight: 500, lineHeight: '1.5rem', overflow: 'hidden', whiteSpace: 'nowrap' }}
                >
                  {cluster.name}
                </Text>
                <Text
                  margin={0}
                  font="0.875rem"
                  style={{
                    color: theme.palette.accents_6,
                    lineHeight: '1.25rem',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {cluster.description}
                </Text>
              </div>
            </div>
            {cluster.is_admin && (
              <div className="project-title__wrapper-sub">
                <Button iconRight={<Edit />} marginLeft={1} px={0} width="48px" onClick={editHandler} />
                <Modal visible={edit} onClose={closeEditHandler}>
                  <Modal.Title>Update Cluster</Modal.Title>
                  <Modal.Content>
                    <div>
                      <Text type="secondary">Cluster name:</Text>
                      <Input width="100%" initialValue={cluster.name} ref={nameRef} />
                    </div>
                    <Spacer h={0.5} />
                    <Text type="secondary">Cluster description:</Text>
                    <Textarea width="100%" initialValue={cluster.description} ref={descriptionRef} />
                    <Spacer h={0.5} />
                  </Modal.Content>
                  <Modal.Action passive onClick={() => setEdit(false)}>
                    Cancel
                  </Modal.Action>
                  <Modal.Action
                    passive
                    onClick={() => {
                      setEdit(false);
                      setEditChange();
                    }}
                  >
                    Update
                  </Modal.Action>
                </Modal>
                <Button
                  iconRight={<Delete />}
                  marginLeft={1}
                  px={0}
                  type="error"
                  ghost
                  width="48px"
                  onClick={deleteHandler}
                />
                <Modal visible={remove} onClose={closeDeleteHandler}>
                  <Modal.Title>Delete Cluster</Modal.Title>
                  <Modal.Content>
                    <Text type="secondary">Are you sure you want to delete the cluster {cluster.name}?</Text>
                  </Modal.Content>
                  <Modal.Action passive onClick={() => setRemove(false)}>
                    Cancel
                  </Modal.Action>
                  <Modal.Action
                    passive
                    onClick={() => {
                      setRemove(false);
                      setDeleteChange();
                    }}
                  >
                    Delete
                  </Modal.Action>
                </Modal>
              </div>
            )}
            {!cluster.is_admin && (
              <div>
                <Button
                  iconRight={<LogOut />}
                  marginLeft={1}
                  px={0}
                  width="48px"
                  type="error"
                  ghost
                  onClick={leaveHandler}
                />
                <Modal visible={leave} onClose={closeLeaveHandler}>
                  <Modal.Title>Leave Cluster</Modal.Title>
                  <Modal.Content>
                    <Text type="secondary">Are you sure you want to leave the cluster {cluster.name}?</Text>
                  </Modal.Content>
                  <Modal.Action passive onClick={() => setLeave(false)}>
                    Cancel
                  </Modal.Action>
                  <Modal.Action
                    passive
                    onClick={() => {
                      setLeave(false);
                      setLeaveChange();
                    }}
                  >
                    Leave
                  </Modal.Action>
                </Modal>
              </div>
            )}
          </div>
          <Spacer h={0.5} />
          <Text className="project__repo" type="secondary" small>
            Member count: {cluster.member_count}
          </Text>
          <Text font="0.875rem" style={{ color: theme.palette.accents_5 }}>
            Last updated: {cluster.updated_at} <br />
            Created on: {cluster.created_at}
          </Text>

          <Snippet
            symbol="Cluster Id:"
            text={cluster.id}
            type="secondary"
            toastText="Cluster id copied to clipboard!"
            width="100%"
          />
        </Card>
      </div>
      <style jsx>{`
        .project__wrapper {
          width: 100%;
        }
        .project__wrapper :global(.project__card) {
          box-shadow: ${theme.type === 'dark' ? theme.expressiveness.shadowSmall : '0px 2px 4px rgba(0,0,0,0.1)'};
        }
        .project__wrapper :global(.project__card):hover {
          box-shadow: ${theme.type === 'dark'
            ? `0 0 0 1px ${theme.palette.foreground}`
            : '0px 4px 8px rgba(0,0,0,0.12)'};
        }
        .project-title__wrapper-sub-text {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .project-title__content {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .project-title__wrapper-sub {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .project-title__wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        }
        .project-title__wrapper :global(.project-icon) {
          background: #fff;
          border-radius: 50%;
          border: ${theme.type === 'dark' ? `1px solid ${theme.palette.foreground}` : 'none'};
        }
        .project-git-commit,
        .project-git-commit-error {
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 3rem;
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        .project-git-commit-error {
          padding: 0 ${theme.layout.unit};
          border-radius: ${theme.layout.radius};
          background: ${theme.palette.accents_1};
          border: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_5};
        }
      `}</style>
    </>
  );
};

export default ProjectCard;
