export interface GithubData {
  data: {
    viewer: Viewer;
  };
}

interface Viewer {
  avatarUrl: string;
  email: string;
  name: string;
  url: string;
  websiteUrl: string;
  pinnableItems: Node;
  pinnedItems: Node;
}

interface Node {
  nodes: Repository[];
  pageInfo?: PageInfo;
}

export interface Repository {
  description: string;
  homepageUrl: string;
  id: string;
  name: string;
  openGraphImageUrl: string;
  url: string;
  repositoryTopics: any;
}

interface PageInfo {
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
}
