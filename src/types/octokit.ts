export type UserInfoType = {
  avatar_url: string;
  bio: string;
  blog: string;
  company: string;
  created_at: string;
  email: string;
  events_url: string;
  followers: number;
  followers_url: string;
  following: number;
  following_url: string;
  gists_url: string;
  gravatar_id?: string;
  hireable?: any;
  html_url: string;
  id: number;
  location?: any;
  login: string;
  name: string;
  node_id: string;
  organizations_url: string;
  public_gists: number;
  public_repos: number;
  received_events_url: string;
  repos_url: string;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  twitter_username: string;
  type: string;
  updated_at: string;
  url: string;
}

export type UserReposType = {
  allow_forking: boolean;
  archive_url: string; //"https://api.github.com/repos/idiglove/amplify-js/{archive_format}{/ref}"
  archived: boolean;
  assignees_url: string; //"https://api.github.com/repos/idiglove/amplify-js/assignees{/user}"
  blobs_url: string; //"https://api.github.com/repos/idiglove/amplify-js/git/blobs{/sha}"
  branches_url: string; //"https://api.github.com/repos/idiglove/amplify-js/branches{/branch}"
  clone_url: string; //"https://github.com/idiglove/amplify-js.git"
  collaborators_url: string; //"https://api.github.com/repos/idiglove/amplify-js/collaborators{/collaborator}"
  comments_url: string; //"https://api.github.com/repos/idiglove/amplify-js/comments{/number}"
  commits_url: string; //"https://api.github.com/repos/idiglove/amplify-js/commits{/sha}"
  compare_url: string; //"https://api.github.com/repos/idiglove/amplify-js/compare/{base}...{head}"
  contents_url: string; //"https://api.github.com/repos/idiglove/amplify-js/contents/{+path}"
  contributors_url: string; //"https://api.github.com/repos/idiglove/amplify-js/contributors"
  created_at: string; //"2019-02-07T00:06:12Z"
  default_branch: string; //"master"
  deployments_url: string; //"https://api.github.com/repos/idiglove/amplify-js/deployments"
  description: string; //"A declarative JavaScript library for application development using cloud services."
  disabled: boolean;
  downloads_url: string; //"https://api.github.com/repos/idiglove/amplify-js/downloads"
  events_url: string; //"https://api.github.com/repos/idiglove/amplify-js/events"
  fork: boolean;
  forks: number;
  forks_count: number;
  forks_url: string; //"https://api.github.com/repos/idiglove/amplify-js/forks"
  full_name: string; //"idiglove/amplify-js"
  git_commits_url: string; //"https://api.github.com/repos/idiglove/amplify-js/git/commits{/sha}"
  git_refs_url: string; //"https://api.github.com/repos/idiglove/amplify-js/git/refs{/sha}"
  git_tags_url: string; //"https://api.github.com/repos/idiglove/amplify-js/git/tags{/sha}"
  git_url: string; //"git://github.com/idiglove/amplify-js.git"
  has_downloads: boolean;
  has_issues: boolean;
  has_pages: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  homepage: string; //"https://aws-amplify.github.io/"
  hooks_url: string; //"https://api.github.com/repos/idiglove/amplify-js/hooks"
  html_url: string; //"https://github.com/idiglove/amplify-js"
  id: number; //169496264
  issue_comment_url: string; //"https://api.github.com/repos/idiglove/amplify-js/issues/comments{/number}"
  issue_events_url: string; //"https://api.github.com/repos/idiglove/amplify-js/issues/events{/number}"
  issues_url: string; //"https://api.github.com/repos/idiglove/amplify-js/issues{/number}"
  keys_url: string; //"https://api.github.com/repos/idiglove/amplify-js/keys{/key_id}"
  labels_url: string; //"https://api.github.com/repos/idiglove/amplify-js/labels{/name}"
  language: string; //"JavaScript"
  languages_url: string; //"https://api.github.com/repos/idiglove/amplify-js/languages"
  license: object; //{key: "apache-2.0", name: "Apache License 2.0", spdx_id: "Apache-2.0",…}
  merges_url: string; //"https://api.github.com/repos/idiglove/amplify-js/merges"
  milestones_url: string; //"https://api.github.com/repos/idiglove/amplify-js/milestones{/number}"
  mirror_url?: string;
  name: string; //"amplify-js"
  node_id: string; //"MDEwOlJlcG9zaXRvcnkxNjk0OTYyNjQ="
  notifications_url: string; //"https://api.github.com/repos/idiglove/amplify-js/notifications{?since,all,participating}"
  open_issues: number;
  open_issues_count: number;
  owner: object; //{login: "idiglove", id: 29911508, node_id: "MDQ6VXNlcjI5OTExNTA4",…}
  permissions: object; //{admin: true, maintain: true, push: true, triage: true, pull: true}
  private: boolean;
  pulls_url: string; //"https://api.github.com/repos/idiglove/amplify-js/pulls{/number}"
  pushed_at: string; //"2019-02-07T00:02:54Z"
  releases_url: string; //"https://api.github.com/repos/idiglove/amplify-js/releases{/id}"
  size: number; //114017
  ssh_url: string; //"git@github.com:idiglove/amplify-js.git"
  stargazers_count: number;
  stargazers_url: string; //"https://api.github.com/repos/idiglove/amplify-js/stargazers"
  statuses_url: string; //"https://api.github.com/repos/idiglove/amplify-js/statuses/{sha}"
  subscribers_url: string; //"https://api.github.com/repos/idiglove/amplify-js/subscribers"
  subscription_url: string; //"https://api.github.com/repos/idiglove/amplify-js/subscription"
  svn_url: string; //"https://github.com/idiglove/amplify-js"
  tags_url: string; //"https://api.github.com/repos/idiglove/amplify-js/tags"
  teams_url: string; //"https://api.github.com/repos/idiglove/amplify-js/teams"
  trees_url: string; //"https://api.github.com/repos/idiglove/amplify-js/git/trees{/sha}"
  updated_at: string; //"2019-02-07T00:06:31Z"
  url: string; //"https://api.github.com/repos/idiglove/amplify-js"
  watchers: number;
  watchers_count: number;
}

export type RepoLangsType = {
  key: string;
  value: number;
}
