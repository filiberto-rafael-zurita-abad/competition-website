export interface Project {
  title: string;
  description: string;
  links: Link[];
  walletInfo: {
    text: string;
  };
}

export interface Link {
  type: string;
  icon: string;
  text: string;
  isAvailableGit?: boolean;
  isAvailableWeb?: boolean;
}
