// external deps
import axios from "axios";
import Cookies from "js-cookie";
import { isEmpty } from "lodash";
import { PageHeader } from "antd";
import React, { useEffect, useState } from "react";
// internal deps
import Repository from "src/components/Repository";
import { UserReposType } from "src/types/octokit";
import RepositoryDetails from "src/components/Repository/RepositoryDetails";

export const ReposView = () => {
  const [userRepos, setUserRepos] = useState<UserReposType[] | null>(null);
  const [username, setUsername] = useState('');
  const [selectedRepo, setSelectedRepo] = useState<UserReposType | null>(null);

  useEffect(() => {
    const ghToken = Cookies.get('gh_token') || '';
    const currentUsername = localStorage.getItem('currentUsername') || '';

    async function getUserRepos() {
      const { data } = await axios.get(`${process.env.REACT_APP_AUTH_API}/repos/user?ghToken=${ghToken}&username=${currentUsername}`);
      setUserRepos(data.data.data);
      setUsername(currentUsername);
    }

    if (!isEmpty(ghToken) && !isEmpty(currentUsername)) {
      getUserRepos();
    }
  }, [])

  const onClickRepo = ({ repo }: { repo: UserReposType }  ) => {
    setSelectedRepo(repo);
  }

  return (
    <>
      <PageHeader title="Repositories" subTitle="Select a Repo" />
      <div style={{display: "flex"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          {
            userRepos && username && userRepos.map((repo, i) =>
              <div key={i} style={{marginBottom: "1rem"}}>
                <Repository repo={repo} currentUser={username} onClickRepo={onClickRepo} />
              </div>
            )
          }
        </div>
        {
          selectedRepo && 
          <RepositoryDetails repo={selectedRepo} />
        }
      </div>
    </>
  );
};
