// external deps
import React from 'react';
// internal deps
import { UserReposType } from "src/types/octokit";

type Props = {
  repo: UserReposType;
}

const RepositoryDetails = ({ repo }: Props) => {
  return (
    <div>
      Url: {repo.url} <br />
      Forks: {repo.forks} <br />
    </div>
  )
}

export default RepositoryDetails;