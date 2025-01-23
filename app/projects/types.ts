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
  tag?: string;
  isAvailable?: boolean;
}
